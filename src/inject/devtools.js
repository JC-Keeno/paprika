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
// `loads` records the fetches three's FileLoader makes: models, textures and sounds by extension, and every failure, so
// a model that silently fails to load (no onError) is still reported by game_open.
(() => {
  const h = window.__harness = { revision: null, scenes: [], renderers: [], views: new Map(), raw: new Map(), frame: [], depth: 0, audio: 0, loads: [] };
  const ASSET = /\.(glb|gltf|bin|hdr|exr|ktx2|png|jpe?g|webp|mp3|ogg|wav)$/i, fetch0 = window.fetch;
  window.fetch = function (input, init) {
    const url = String(input?.url ?? input), path = url.split(/[?#]/)[0], name = path.split("/").pop();
    return fetch0.call(this, input, init).then(res => {
      if (!res.ok || ASSET.test(path)) h.loads.push({ name, status: res.status, bytes: +res.headers.get("content-length") || null });
      return res;
    }, err => { h.loads.push({ name, status: 0, error: String(err?.message ?? err) }); throw err; });
  };
  for (const [C, m] of [[window.AudioBufferSourceNode, "start"], [window.OscillatorNode, "start"], [window.HTMLMediaElement, "play"]]) {
    const f = C?.prototype?.[m];
    if (f) C.prototype[m] = function () { h.audio++; return f.apply(this, arguments); };
  }
  // A new frame starts at the first top-level call after a microtask boundary (a new task) or once the clock has
  // moved (__clock.step(n) runs n frames in one task, each at its own virtual time).
  let open = false, at;
  const record = (e) => {
    const t = performance.now();
    if (!open || t !== at) { open = true; at = t; h.frame = []; h.frameInfo = { calls: 0, triangles: 0 }; h.frameNo = (h.frameNo ?? 0) + 1; queueMicrotask(() => { open = false; }); }
    h.frame.push(e);
  };
  // Real time (performance.now is the harness's clock) and a GPU sync: a 1-pixel read in the bound framebuffer's own
  // read format waits for the work queued before it (a float target refuses an 8-bit read, which would not wait).
  const realNow = () => Performance.prototype.now.call(performance);
  const sync = (r) => {
    const gl = r.getContext?.();
    if (typeof gl?.readPixels !== "function") return;
    const type = gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE), float = type === gl.FLOAT || type === gl.HALF_FLOAT || type === 0x8d61;
    gl.readPixels(0, 0, 1, 1, gl.RGBA, float ? gl.FLOAT : gl.UNSIGNED_BYTE, float ? new Float32Array(4) : new Uint8Array(4));
  };
  h.sync = () => { for (const r of h.renderers) sync(r); };
  // What a pass drew, for game_perf: the scene's name, "main scene", or the first object of a small scene (a
  // full-screen quad) or the object drawn alone (EffectComposer's quad) by its material's name or type.
  const what = (o) => {
    if (o?.name) return o.name;
    if (o?.isScene && h.main()?.[0] === o) return "main scene";
    const one = o?.isScene ? (o.children.length <= 2 ? o.children[0] : null) : o;
    if (!one) return o?.isScene ? `scene of ${o.children.length} objects` : "object";
    const m = [one.material].flat()[0];
    return `${o?.isScene ? "scene: " : ""}${one.name || one.type}${m ? ` (${m.name || m.type})` : ""}`;
  };
  const watch = (r) => {
    const render = r.render, clear = r.clear;
    h.raw.set(r, render);
    r.render = function (scene, camera) {
      const target = r.getRenderTarget(), screen = target === null;
      if (scene?.isScene && (screen || !h.views.get(scene)?.screen)) h.views.set(scene, { renderer: r, camera, screen });
      if (h.skip && !h.depth) { // a game_act { wait, draw: false } frame: what render does besides drawing, without the drawing
        if (scene?.matrixWorldAutoUpdate) scene.updateMatrixWorld();
        if (camera?.parent === null && camera.matrixWorldAutoUpdate) camera.updateMatrixWorld();
        if (r.info?.autoReset) r.info.reset();
        if (r.info) r.info.render.frame++;
        return;
      }
      if (h.depth) return render.apply(this, arguments); // a render inside a render (Reflector, CubeCamera) is part of the outer one
      record({ r, target, scene, camera, auto: [r.autoClear, r.autoClearColor, r.autoClearDepth, r.autoClearStencil] });
      const t = h.timing ? realNow() : null;
      // three's info counts one render call at a time (autoReset), so a frame drawn in passes (bloom into render
      // targets, then a full-screen quad) would read as its last pass alone: frameInfo adds up the frame's top-level calls
      const i = r.info?.render, c0 = i?.calls ?? 0, t0 = i?.triangles ?? 0;
      h.depth++;
      try { return render.apply(this, arguments); } finally {
        h.depth--;
        if (i && h.frameInfo) { // autoReset: info holds this call alone; otherwise it holds a running total
          const reset = r.info.autoReset !== false;
          h.frameInfo.calls += reset ? i.calls : i.calls - c0;
          h.frameInfo.triangles += reset ? i.triangles : i.triangles - t0;
        }
        if (t !== null) { // game_perf's passes: each top-level call timed to the end of its GPU work
          sync(r);
          const reset = r.info?.autoReset !== false;
          h.timing.push({ frame: h.frameNo, pass: `${what(scene)} → ${target ? `${target.width}×${target.height}` : "screen"}`, ms: realNow() - t,
            calls: i ? (reset ? i.calls : i.calls - c0) : 0, triangles: i ? (reset ? i.triangles : i.triangles - t0) : 0 });
        }
      }
    };
    r.clear = function (color = true, depth = true, stencil = true) {
      if (!h.depth) record({ r, target: r.getRenderTarget(), clear: [color, depth, stencil] });
      return clear.apply(this, arguments);
    };
  };
  // The game's main scene and the view that last drew it: a scene drawn to the screen beats one drawn only into a render
  // target (a RoomEnvironment baked by PMREMGenerator), then the scene with the most objects in its whole tree (a game
  // that groups everything under one root has few top-level children; an environment scene has many).
  const size = (s) => { let n = 0; s.traverse(() => { n++; }); return n; };
  h.main = () => {
    const views = [...h.views], drawn = views.filter(([, v]) => v.screen);
    return (drawn.length ? drawn : views).sort(([a], [b]) => size(b) - size(a))[0] ?? null;
  };
  h.mainScene = () => h.main()?.[0] ?? [...h.scenes].sort((a, b) => size(b) - size(a))[0];
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
