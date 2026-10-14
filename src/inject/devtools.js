// three.js's own devtools hook, injected before any page script runs.
// Every three build announces itself (register: revision) and each Scene and renderer it creates (observe)
// to window.__THREE_DEVTOOLS__ when that exists. Collecting them into window.__harness lets the harness
// find and inspect a game's scene without the game exporting anything.
// Each WebGL renderer's render is wrapped to remember, per scene, the renderer and camera that last drew it
// (`views`; a render to the screen wins over one to a render target), and render and clear are wrapped to keep the
// last frame's top-level calls in order (`frame`: scene, camera, target and autoClear flags, or a clear), so look()
// can draw that frame again, HUD and overlay scenes included. `raw` keeps the unwrapped render, so that redraw skips
// the runtime layer's switches; anything the harness draws itself runs with `depth` raised so it is not recorded.
// `audio` counts sounds started (Web Audio sources and media play()), for feel().
(() => {
  const h = window.__harness = { revision: null, scenes: [], renderers: [], views: new Map(), raw: new Map(), frame: [], depth: 0, audio: 0 };
  for (const [C, m] of [[window.AudioBufferSourceNode, "start"], [window.OscillatorNode, "start"], [window.HTMLMediaElement, "play"]]) {
    const f = C?.prototype?.[m];
    if (f) C.prototype[m] = function () { h.audio++; return f.apply(this, arguments); };
  }
  // A new frame starts at the first top-level call after a microtask boundary (a new task) or once the clock has
  // moved (__clock.step(n) runs n frames in one task, each at its own virtual time).
  let open = false, at;
  const record = (e) => {
    const t = performance.now();
    if (!open || t !== at) { open = true; at = t; h.frame = []; queueMicrotask(() => { open = false; }); }
    h.frame.push(e);
  };
  const watch = (r) => {
    const render = r.render, clear = r.clear;
    h.raw.set(r, render);
    r.render = function (scene, camera) {
      const target = r.getRenderTarget(), screen = target === null;
      if (scene?.isScene && (screen || !h.views.get(scene)?.screen)) h.views.set(scene, { renderer: r, camera, screen });
      if (h.depth) return render.apply(this, arguments); // a render inside a render (Reflector, CubeCamera) is part of the outer one
      record({ r, target, scene, camera, auto: [r.autoClear, r.autoClearColor, r.autoClearDepth, r.autoClearStencil] });
      h.depth++;
      try { return render.apply(this, arguments); } finally { h.depth--; }
    };
    r.clear = function (color = true, depth = true, stencil = true) {
      if (!h.depth) record({ r, target: r.getRenderTarget(), clear: [color, depth, stencil] });
      return clear.apply(this, arguments);
    };
  };
  const hook = new EventTarget();
  hook.addEventListener("register", (e) => { h.revision = e.detail.revision; });
  hook.addEventListener("observe", (e) => {
    const o = e.detail;
    if (o.isScene) h.scenes.push(o);
    else if (o.isWebGLRenderer || o.isWebGPURenderer) {
      h.renderers.push(o);
      if (o.isWebGLRenderer) watch(o);
    }
  });
  window.__THREE_DEVTOOLS__ = hook;
})();
