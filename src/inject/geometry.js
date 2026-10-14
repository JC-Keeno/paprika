// A mesh report for agents, injected after devtools.js: window.__harness.stats(target, opts).
// The target is an Object3D, the name of an object in the main scene (the scene with the most children, the same pick
// as observe()), a BufferGeometry, or nothing for the whole main scene. Every mesh under it gets one entry: counts,
// world-space bounds, attribute and material names, and whether the surface is closed. A closed surface also gets its
// volume and genus, so an agent building procedural geometry can check each step with numbers instead of a picture.
// Topology welds vertices by position quantised to 1e-5, so the split seams three's primitives have (normals, uvs) do
// not count as holes. It reads attribute arrays through getX/getY/getZ (which also covers interleaved attributes) and
// imports nothing from three, so it works on bundled pages too. The result is tagged kind: "stats" for game_eval.
(() => {
  const h = window.__harness;
  const r = (v) => Math.round(v * 1000) / 1000;
  const tf = (e, x, y, z) => [e[0] * x + e[4] * y + e[8] * z + e[12], e[1] * x + e[5] * y + e[9] * z + e[13], e[2] * x + e[6] * y + e[10] * z + e[14]];
  const ID = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const tris = (g) => Math.floor((g.index ? g.index.count : g.attributes.position?.count ?? 0) / 3);

  // shortcut: groups and drawRange are ignored (the whole index is one surface), and skinned or morphed meshes are
  // measured in their rest pose; upgrade when an agent needs a sub-range or a posed mesh measured.
  const measure = (g, e, name, type) => {
    const p = g.attributes.position, n = p.count, ix = g.index, F0 = tris(g);
    if (!g.boundingBox) g.computeBoundingBox();
    const { min: b0, max: b1 } = g.boundingBox, lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < 8; i++) {
      const c = tf(e, i & 1 ? b1.x : b0.x, i & 2 ? b1.y : b0.y, i & 4 ? b1.z : b0.z);
      for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], c[k]); hi[k] = Math.max(hi[k], c[k]); }
    }
    // Weld: each vertex maps to the first vertex at its quantised position.
    const world = new Float64Array(n * 3), weld = new Int32Array(n), seen = new Map();
    for (let i = 0; i < n; i++) {
      const w = tf(e, p.getX(i), p.getY(i), p.getZ(i));
      world.set(w, i * 3);
      const key = `${Math.round(w[0] * 1e5)},${Math.round(w[1] * 1e5)},${Math.round(w[2] * 1e5)}`;
      let id = seen.get(key);
      if (id === undefined) seen.set(key, id = i);
      weld[i] = id;
    }
    const root = new Int32Array(n).map((_, i) => i);
    const find = (a) => { while (root[a] !== a) a = root[a] = root[root[a]]; return a; };
    const edges = new Map(), used = new Set();
    let F = 0, vol = 0;
    for (let t = 0; t < F0; t++) {
      const i0 = ix ? ix.getX(t * 3) : t * 3, i1 = ix ? ix.getX(t * 3 + 1) : t * 3 + 1, i2 = ix ? ix.getX(t * 3 + 2) : t * 3 + 2;
      const a = weld[i0], b = weld[i1], c = weld[i2];
      if (a === b || b === c || a === c) continue; // a degenerate triangle adds no surface
      F++;
      for (const [u, v] of [[a, b], [b, c], [c, a]]) {
        const k = u < v ? u * n + v : v * n + u;
        edges.set(k, (edges.get(k) ?? 0) + 1);
        root[find(u)] = find(v);
      }
      used.add(a).add(b).add(c);
      const A = i0 * 3, B = i1 * 3, C = i2 * 3, w = world;
      vol += (w[A] * (w[B + 1] * w[C + 2] - w[B + 2] * w[C + 1]) - w[A + 1] * (w[B] * w[C + 2] - w[B + 2] * w[C]) + w[A + 2] * (w[B] * w[C + 1] - w[B + 1] * w[C])) / 6;
    }
    let openEdges = 0;
    for (const c of edges.values()) if (c !== 2) openEdges++;
    const roots = new Set();
    for (const v of used) roots.add(find(v));
    const closed = F > 0 && openEdges === 0, parts = roots.size;
    const out = { name, type, vertices: n, triangles: F0,
      bounds: { min: lo.map(r), max: hi.map(r), size: hi.map((v, k) => r(v - lo[k])) },
      attributes: Object.entries(g.attributes).map(([k, a]) => `${k}:${a.itemSize}`),
      closed, openEdges, parts };
    if (closed) { out.volume = r(vol); out.genus = parts - (used.size - edges.size + F) / 2; }
    return out;
  };

  h.stats = (target, opts = {}) => {
    const max = opts.max ?? 40; // the same list cap as the server's other tools
    if (target?.isBufferGeometry) {
      const m = measure(target, ID, target.name, target.type);
      return { kind: "stats", meshes: [m], total: { meshes: 1, vertices: m.vertices, triangles: m.triangles } };
    }
    const scene = [...h.scenes].sort((a, b) => b.children.length - a.children.length)[0];
    let root = target ?? scene;
    if (typeof target === "string") {
      root = scene?.getObjectByName(target);
      if (!root) throw new Error(`no object named "${target}" in the main scene`);
    }
    if (!root?.traverse) throw new Error("stats takes an Object3D, an object's name, a BufferGeometry or nothing");
    const found = [];
    root.traverse((o) => { if (o.isMesh && o.geometry?.attributes?.position) found.push(o); });
    const meshes = found.slice(0, max).map((o) => {
      o.updateWorldMatrix(true, false);
      const m = measure(o.geometry, o.matrixWorld.elements, o.name, o.type);
      if (o.isInstancedMesh) m.instances = o.count;
      m.material = [o.material].flat().filter(Boolean).map((x) => x.name || x.type);
      return m;
    });
    const out = { kind: "stats", meshes, total: { meshes: found.length,
      vertices: found.reduce((s, o) => s + o.geometry.attributes.position.count, 0),
      triangles: found.reduce((s, o) => s + tris(o.geometry), 0) } };
    if (found.length > max) out.cut = `${found.length - max} more`;
    return out;
  };
})();
