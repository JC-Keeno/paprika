// Fake clock and seeded Math.random, injected before any page script runs.
// The harness owns time so a check can step a game frame by frame and get the same result every run:
// requestAnimationFrame, performance.now, Date, timers, idle callbacks and event timestamps all run on one virtual time that only moves
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
  RealDate.prototype.constructor = FakeDate; // or new Date().constructor.now() is the real time
  FakeDate.now = () => Math.floor(EPOCH + now); // whole milliseconds, like the real one
  FakeDate.parse = RealDate.parse;
  FakeDate.UTC = RealDate.UTC;
  window.Date = FakeDate;

  // Animation frames: callbacks queued until the next virtual frame.
  let frames = new Map(), nextFrame = 1;
  window.requestAnimationFrame = (cb) => { frames.set(nextFrame, cb); return nextFrame++; };
  window.cancelAnimationFrame = (id) => { frames.delete(id); };

  // Timers: a binary heap on (due, id), fired in order as virtual time passes them. A cleared timer stays in the heap
  // until it reaches the top (`live` maps each id to its current entry): a sorted array with shift, splice and
  // findIndex took 16 ms a frame for 10,000 timers that re-arm, and 1.3 ms for 100 debounces among 10,000 pending.
  const timers = [], live = new Map(); let nextTimer = 1;
  const before = (a, b) => a.due < b.due || (a.due === b.due && a.id < b.id);
  const swap = (i, j) => { const x = timers[i]; timers[i] = timers[j]; timers[j] = x; };
  const insert = (t) => {
    live.set(t.id, t);
    let i = timers.push(t) - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (!before(timers[i], timers[p])) break; swap(i, p); i = p; }
    return t.id;
  };
  const drop = () => { // removes the top
    const last = timers.pop();
    if (!timers.length) return;
    timers[0] = last;
    for (let i = 0; ;) {
      const l = 2 * i + 1, r = l + 1;
      let m = i;
      if (l < timers.length && before(timers[l], timers[m])) m = l;
      if (r < timers.length && before(timers[r], timers[m])) m = r;
      if (m === i) break;
      swap(i, m); i = m;
    }
  };
  /** The next timer to fire, or undefined; cleared ones at the top are dropped on the way. */
  const next = () => { while (timers.length && live.get(timers[0].id) !== timers[0]) drop(); return timers[0]; };
  let booting = true, pumping = false;
  const add = (cb, delay, args, repeat) => {
    const ms = Math.max(1, +delay || 0); // at least 1 ms, so a timer that re-arms itself cannot stall a step
    const t = { id: nextTimer++, due: now + ms, cb, args, every: repeat ? ms : 0 };
    insert(t);
    pump0();
    return t.id;
  };
  /** True while boot still has a timer due inside BOOT_MS to fire. */
  const bootPending = () => booting && !running && !window.__game && next()?.due <= BOOT_MS;
  // A MessageChannel macrotask, not setTimeout(0), which Chrome clamps to 4 ms once nested.
  const boot = new MessageChannel();
  boot.port1.onmessage = () => {
    pumping = false;
    if (!bootPending()) return;
    runTimers(next().due, 1);
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
  const clear = (id) => {
    live.delete(id);
    // a far timer set and cleared every frame never reaches the top: rebuild once cleared ones outnumber live ones
    if (timers.length > 2 * live.size + 64) {
      const kept = timers.filter(t => live.get(t.id) === t).sort((a, b) => before(a, b) ? -1 : 1); // sorted is a heap
      timers.length = 0; timers.push(...kept);
    }
  };
  window.setTimeout = (cb, delay, ...args) => add(cb, delay, args, false);
  window.setInterval = (cb, delay, ...args) => add(cb, delay, args, true);
  window.clearTimeout = clear;
  window.clearInterval = clear;
  // Idle callbacks fired on real time, even while paused; here they are timers. The time they report left is real,
  // so a loop that works while time remains still ends. realNow is game_eval's too: agents found in-page timing read 0
  // here and left for their own browser to profile.
  const realNow = () => Performance.prototype.now.call(performance);
  window.requestIdleCallback = (cb, opts) => add(() => { const end = realNow() + 10; cb({ didTimeout: false, timeRemaining: () => Math.max(0, end - realNow()) }); }, 1, [], false);
  window.cancelIdleCallback = clear;
  // An event's timeStamp is real time: a key held over stepped frames measured 52 ms one run and 402 ms the next.
  // It reads the virtual time the event was first looked at, which a handler does when it runs.
  const stamps = new WeakMap();
  Object.defineProperty(Event.prototype, "timeStamp", { configurable: true, get() {
    let t = stamps.get(this);
    if (t === undefined) stamps.set(this, t = now);
    return t;
  } });

  /** Fires timers due by `end` in order (at most `max`), moving virtual time to each. */
  function runTimers(end, max = Infinity) {
    while (max-- > 0 && next()?.due <= end) {
      const t = timers[0];
      drop(); live.delete(t.id);
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

  // One pump chain per resume: resume, pause and resume again within one real frame left the first chain's start
  // pending, and both ran (half the frames with dt 0).
  let chain = 0;
  const pump = (c) => (t) => {
    if (!running || c !== chain) return;
    frame((t - last) * scale);
    last = t;
    realRaf(pump(c));
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
        frame(dt);
        // a browser runs every microtask before the next frame; a callback that awaits an async function needs a few
        // turns, and with one it ran every other frame. 16 turns, still no task, so nothing from outside slips in.
        for (let k = 0; k < 16; k++) await null;
        const h = held; held = [];
        if (h.length) await Promise.all(h.map(settle));
      }
      return now;
    },
    hold(p) { if (!running) held.push(p); },
    compiling(delta) { compiling += delta; },
    now: () => now,
    realNow,
    pause() { running = false; },
    resume() { booting = false; if (running) return; running = true; const c = ++chain; realRaf(t => { if (c === chain) { last = t; realRaf(pump(c)); } }); },
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
