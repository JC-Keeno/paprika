// Fake clock and seeded Math.random, injected before any page script runs.
// The harness owns time so a check can step a game frame by frame and get the same result every run:
// requestAnimationFrame, performance.now, Date and timers all run on one virtual time that only moves
// on (await) __clock.step(), or with real time (times a scale) after __clock.resume(). Paused unless
// window.__harnessConfig.paused is false. While a paused game boots, timers (one-shot and intervals) fire in due
// order on virtual time, one per real macrotask so the game's loads can interleave, but never past BOOT_MS of
// virtual time; later timers wait for a step. So react-three-fiber's debounced canvas measure and React's Suspense
// retries can finish, and a timer loop runs the same number of times on every load. No animation frame runs during boot.
// The harness polls endBoot(): boot ends once window.__game exists, or once a renderer exists and the page has stayed
// idle (no boot timer, WebAssembly compile or request pending) across two polls; frame 0 then starts at FRAME0.
// Code that compiles WebAssembly in a worker reports it with __clock.compiling(+1) and (-1), since the wrapper here
// sees only the main thread. __clock.hold(p) makes a paused step wait for p (a worker's reply, a macrotask) before the
// next frame; a rejected hold, or one still pending after HOLD_MS of real time, is reported, not fatal. With resume()
// hold does nothing.
// Math.random is mulberry32 seeded from __harnessConfig.seed.
(() => {
  const cfg = window.__harnessConfig || {};
  const realRaf = window.requestAnimationFrame.bind(window);
  const realSetTimeout = window.setTimeout.bind(window);
  const realClearTimeout = window.clearTimeout.bind(window);
  const RealDate = Date;
  const EPOCH = 1_800_000_000_000; // fixed wall-clock start, so Date.now() is the same on every run
  const FRAME0 = 60_000; // virtual time of frame 0, past any boot
  const BOOT_MS = 2_000; // virtual time boot may use; covers a debounced measure and Suspense retries

  let now = 0, scale = 1, running = false, last = 0, held = [];

  // mulberry32
  let seed = 0;
  const reseed = (n) => { seed = n >>> 0; };
  Math.random = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  reseed(cfg.seed ?? 1);

  performance.now = () => now;
  function FakeDate(...a) {
    if (!new.target) return new RealDate(EPOCH + now).toString();
    return new RealDate(...(a.length ? a : [EPOCH + now]));
  }
  FakeDate.prototype = RealDate.prototype;
  FakeDate.now = () => Math.floor(EPOCH + now); // whole milliseconds, like the real one
  FakeDate.parse = RealDate.parse;
  FakeDate.UTC = RealDate.UTC;
  window.Date = FakeDate;

  // Animation frames: callbacks queued until the next virtual frame.
  let frames = new Map(), nextFrame = 1;
  window.requestAnimationFrame = (cb) => { frames.set(nextFrame, cb); return nextFrame++; };
  window.cancelAnimationFrame = (id) => { frames.delete(id); };

  // Timers: kept sorted by (due, id), fired in order as virtual time passes them.
  const timers = []; let nextTimer = 1;
  const insert = (t) => {
    let i = timers.length;
    while (i > 0 && (timers[i - 1].due > t.due || (timers[i - 1].due === t.due && timers[i - 1].id > t.id))) i--;
    timers.splice(i, 0, t);
    return t.id;
  };
  let booting = true, pumping = false;
  const add = (cb, delay, args, repeat) => {
    const ms = Math.max(1, +delay || 0); // at least 1 ms, so a timer that re-arms itself cannot stall a step
    const t = { id: nextTimer++, due: now + ms, cb, args, every: repeat ? ms : 0 };
    insert(t);
    pump0();
    return t.id;
  };
  /** True while boot still has a timer due inside BOOT_MS to fire. */
  const bootPending = () => booting && !running && !window.__game && timers.length > 0 && timers[0].due <= BOOT_MS;
  // A MessageChannel macrotask, not setTimeout(0), which Chrome clamps to 4 ms once nested.
  const boot = new MessageChannel();
  boot.port1.onmessage = () => {
    pumping = false;
    if (!bootPending()) return;
    runTimers(timers[0].due, 1);
    pump0();
  };
  const pump0 = () => { if (!pumping && bootPending()) { pumping = true; boot.port2.postMessage(0); } };
  // A WebAssembly compile (Rapier's init) finishes off-thread with no timer or request to show it is pending.
  let compiling = 0;
  for (const k of ["compile", "compileStreaming", "instantiate", "instantiateStreaming"]) {
    const real = WebAssembly[k];
    if (!real) continue;
    WebAssembly[k] = function (...a) {
      const p = real.apply(WebAssembly, a);
      compiling++;
      const done = () => { compiling--; };
      p.then(done, done); // runs before the caller's own then, so a continuation never sees a stale count
      return p;
    };
  }
  const clear = (id) => { const i = timers.findIndex(t => t.id === id); if (i >= 0) timers.splice(i, 1); };
  window.setTimeout = (cb, delay, ...args) => add(cb, delay, args, false);
  window.setInterval = (cb, delay, ...args) => add(cb, delay, args, true);
  window.clearTimeout = clear;
  window.clearInterval = clear;

  /** Fires timers due by `end` in order (at most `max`), moving virtual time to each. */
  function runTimers(end, max = Infinity) {
    while (max-- > 0 && timers.length && timers[0].due <= end) {
      const t = timers.shift();
      now = t.due;
      if (t.every) insert({ ...t, due: t.due + t.every });
      try { typeof t.cb === "function" ? t.cb(...t.args) : (0, eval)(String(t.cb)); } catch (e) { reportError(e); }
    }
  }

  /** Moves virtual time by dt: fires due timers in order, then one animation frame. */
  function frame(dt) {
    const end = now + dt;
    runTimers(end);
    now = end;
    const cbs = frames; frames = new Map();
    for (const cb of cbs.values()) try { cb(now); } catch (e) { reportError(e); } // one throw must not skip the rest, as in a browser
  }

  const pump = (t) => {
    if (!running) return;
    frame((t - last) * scale);
    last = t;
    realRaf(pump);
  };

  // real time, so a dead worker's reply cannot stall a step (and the harness's tool queue) until puppeteer gives up;
  // long enough for a worker's start-up, which compiles its WebAssembly inside a held promise
  const HOLD_MS = 30_000;
  const settle = p => new Promise(ok => {
    const t = realSetTimeout(() => { reportError(new Error(`__clock.hold: a held promise is still pending after ${HOLD_MS / 1000} s`)); ok(); }, HOLD_MS);
    Promise.resolve(p).catch(reportError).finally(() => { realClearTimeout(t); ok(); });
  });

  window.__clock = {
    /** Runs n frames of dt ms and resolves to the new time. Each frame is its own turn, as in a browser: microtasks
        the frame queued (promise callbacks, the runtime layer's end of frame) run before the next frame starts,
        and so do the promises held so far. */
    async step(n = 1, dt = 1000 / 60) {
      booting = false;
      for (let i = 0; i < n; i++) {
        frame(dt); await null;
        const h = held; held = [];
        if (h.length) await Promise.all(h.map(settle));
      }
      return now;
    },
    hold(p) { if (!running) held.push(p); },
    compiling(delta) { compiling += delta; },
    now: () => now,
    pause() { running = false; },
    resume() { booting = false; if (running) return; running = true; realRaf(t => { last = t; realRaf(pump); }); },
    timescale(x) { scale = x; },
    reseed,
    /** Ends boot when the game is ready and returns "booted"; otherwise returns "idle" or "busy". Ready means
        window.__game exists, or `quiet` (the harness saw "idle" on its last poll and has no request in flight)
        and a renderer exists with no boot timer left inside BOOT_MS and no WebAssembly compiling. One call, so
        nothing the page schedules can slip between the check and the end of boot. */
    endBoot(quiet) {
      const idle = !!window.__harness?.renderers.length && compiling === 0 && !bootPending();
      if (window.__game || (quiet && idle)) { booted(); return "booted"; }
      return idle ? "idle" : "busy";
    },
    booted,
  };
  /** Ends boot and moves to virtual time FRAME0, pending timers keeping their remaining delays (like a suspended tab),
      so frame 0 has the same now() on every load even when the game's own boot took a different path. */
  function booted() {
    booting = false;
    const gap = running ? 0 : FRAME0 - now; // boot stays inside BOOT_MS; a running clock already moves on real time
    for (const t of timers) t.due += gap;
    now += gap;
  }
  if (cfg.paused === false) window.__clock.resume();
})();
