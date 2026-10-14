var __defProp = Object.defineProperty;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/.bun/bvh.js@0.0.13/node_modules/bvh.js/build/index.js
function E(e, t, i) {
  i[0] = e[0] > t[0] ? t[0] : e[0], i[1] = e[1] < t[1] ? t[1] : e[1], i[2] = e[2] > t[2] ? t[2] : e[2], i[3] = e[3] < t[3] ? t[3] : e[3], i[4] = e[4] > t[4] ? t[4] : e[4], i[5] = e[5] < t[5] ? t[5] : e[5];
}
function Z(e, t, i) {
  let n = false;
  const r = e[0] > t[0] ? t[0] : e[0], f = e[1] < t[1] ? t[1] : e[1], s = e[2] > t[2] ? t[2] : e[2], o = e[3] < t[3] ? t[3] : e[3], l = e[4] > t[4] ? t[4] : e[4], c = e[5] < t[5] ? t[5] : e[5];
  return i[0] > r && (i[0] = r, n = true), i[1] < f && (i[1] = f, n = true), i[2] > s && (i[2] = s, n = true), i[3] < o && (i[3] = o, n = true), i[4] > l && (i[4] = l, n = true), i[5] < c && (i[5] = c, n = true), n;
}
function g(e, t) {
  return !(t[0] > e[0] || t[1] < e[1] || t[2] > e[2] || t[3] < e[3] || t[4] > e[4] || t[5] < e[5]);
}
function v(e, t) {
  let i = false;
  return t[0] > e[0] && (t[0] = e[0], i = true), t[1] < e[1] && (t[1] = e[1], i = true), t[2] > e[2] && (t[2] = e[2], i = true), t[3] < e[3] && (t[3] = e[3], i = true), t[4] > e[4] && (t[4] = e[4], i = true), t[5] < e[5] && (t[5] = e[5], i = true), i;
}
function w(e, t) {
  e[0] -= t, e[1] += t, e[2] -= t, e[3] += t, e[4] -= t, e[5] += t;
}
function S(e) {
  const t = e[1] - e[0], i = e[3] - e[2], n = e[5] - e[4];
  return 2 * (t * i + i * n + n * t);
}
function _(e, t) {
  const i = e[0] > t[0] ? t[0] : e[0], n = e[1] < t[1] ? t[1] : e[1], r = e[2] > t[2] ? t[2] : e[2], f = e[3] < t[3] ? t[3] : e[3], s = e[4] > t[4] ? t[4] : e[4], o = e[5] < t[5] ? t[5] : e[5], l = n - i, c = f - r, u = o - s;
  return 2 * (l * c + c * u + u * l);
}
function H(e) {
  const t = e[1] - e[0], i = e[3] - e[2], n = e[5] - e[4];
  return t > i ? t > n ? 0 : 2 : i > n ? 1 : 2;
}
function D(e, t) {
  const i = e[0] - t[0], n = t[0] - e[1];
  let r = i > n ? i : n;
  r < 0 && (r = 0);
  const f = e[2] - t[1], s = t[1] - e[3];
  let o = f > s ? f : s;
  o < 0 && (o = 0);
  const l = e[4] - t[2], c = t[2] - e[5];
  let u = l > c ? l : c;
  return u < 0 && (u = 0), r * r + o * o + u * u;
}
function Y(e, t) {
  let i, n, r, f, s, o;
  const l = e[0] - t[0], c = t[0] - e[1];
  l > c ? (i = l, n = c) : (i = c, n = l), i < 0 && (i = 0);
  const u = e[2] - t[1], a = t[1] - e[3];
  u > a ? (r = u, f = a) : (r = a, f = u), r < 0 && (r = 0);
  const y = e[4] - t[2], x = t[2] - e[5];
  return y > x ? (s = y, o = x) : (s = x, o = y), s < 0 && (s = 0), {
    min: i * i + r * r + s * s,
    max: n * n + f * f + o * o
  };
}

class G {
  constructor() {
    this.array = [];
  }
  clear() {
    this.array = [];
  }
  push(t) {
    const i = this.array, n = t.inheritedCost, r = i.length > 6 ? i.length - 6 : 0;
    let f;
    for (f = i.length - 1;f >= r && !(n <= i[f].inheritedCost); f--)
      ;
    f > i.length - 7 && i.splice(f + 1, 0, t);
  }
  pop() {
    return this.array.pop();
  }
}

class $ {
  constructor(t = false) {
    this.root = null, this._sortedList = new G, this.count = 0, this.highPrecision = t, this._typeArray = t ? Float64Array : Float32Array;
  }
  createFromArray(t, i, n, r = 0) {
    const f = i.length, s = this._typeArray;
    s !== (i[0].BYTES_PER_ELEMENT === 4 ? Float32Array : Float64Array) && console.warn("Different precision.");
    const o = new s(6);
    let l, c;
    this.root = u(0, f, null);
    function u(d, M, h) {
      if (M === 1) {
        const C = i[d];
        r > 0 && w(C, r);
        const L = { box: C, object: t[d], parent: h };
        return n && n(L), L;
      }
      const p = a(d, M);
      y();
      let I = x(d, M);
      (I === d || I === d + M) && (I = d + (M >> 1));
      const b = { box: p, parent: h };
      return b.left = u(d, I - d, b), b.right = u(I, M - I + d, b), b;
    }
    function a(d, M) {
      const h = new s(6), p = d + M;
      h[0] = 1 / 0, h[1] = -1 / 0, h[2] = 1 / 0, h[3] = -1 / 0, h[4] = 1 / 0, h[5] = -1 / 0, o[0] = 1 / 0, o[1] = -1 / 0, o[2] = 1 / 0, o[3] = -1 / 0, o[4] = 1 / 0, o[5] = -1 / 0;
      for (let I = d;I < p; I++) {
        const b = i[I], C = b[0], L = b[1], P = b[2], j = b[3], F = b[4], T = b[5];
        h[0] > C && (h[0] = C), h[1] < L && (h[1] = L), h[2] > P && (h[2] = P), h[3] < j && (h[3] = j), h[4] > F && (h[4] = F), h[5] < T && (h[5] = T);
        const N = (L + C) * 0.5, R = (j + P) * 0.5, z = (T + F) * 0.5;
        o[0] > N && (o[0] = N), o[1] < N && (o[1] = N), o[2] > R && (o[2] = R), o[3] < R && (o[3] = R), o[4] > z && (o[4] = z), o[5] < z && (o[5] = z);
      }
      return h[0] -= r, h[1] += r, h[2] -= r, h[3] += r, h[4] -= r, h[5] += r, h;
    }
    function y() {
      l = H(o) * 2, c = (o[l] + o[l + 1]) * 0.5;
    }
    function x(d, M) {
      let h = d, p = d + M - 1;
      for (;h <= p; ) {
        const I = i[h];
        if ((I[l + 1] + I[l]) * 0.5 >= c)
          for (;; ) {
            const b = i[p];
            if ((b[l + 1] + b[l]) * 0.5 < c) {
              const C = t[h];
              t[h] = t[p], t[p] = C;
              const L = i[h];
              i[h] = i[p], i[p] = L, p--;
              break;
            }
            if (p--, p <= h)
              return h;
          }
        h++;
      }
      return h;
    }
  }
  insert(t, i, n) {
    n > 0 && w(i, n);
    const r = this.createLeafNode(t, i);
    return this.root === null ? this.root = r : this.insertLeaf(r), this.count++, r;
  }
  insertRange(t, i, n, r) {
    console.warn("Method not optimized yet. It just calls 'insert' N times.");
    const f = t.length, s = n > 0 ? n : n ? null : 0;
    for (let o = 0;o < f; o++) {
      const l = this.insert(t[o], i[o], s ?? n[o]);
      r && r(l);
    }
  }
  move(t, i) {
    if (!t.parent || g(t.box, t.parent.box)) {
      i > 0 && w(t.box, i);
      return;
    }
    i > 0 && w(t.box, i);
    const n = this.delete(t);
    this.insertLeaf(t, n), this.count++;
  }
  delete(t) {
    const i = t.parent;
    if (i === null)
      return this.root = null, null;
    const n = i.parent, r = i.left === t ? i.right : i.left;
    return r.parent = n, t.parent = null, n === null ? (this.root = r, i) : (n.left === i ? n.left = r : n.right = r, this.refit(n), this.count--, i);
  }
  clear() {
    this.root = null;
  }
  insertLeaf(t, i) {
    const n = this.findBestSibling(t.box), r = n.parent;
    i === undefined ? i = this.createInternalNode(r, n, t) : (i.parent = r, i.left = n, i.right = t), n.parent = i, t.parent = i, r === null ? this.root = i : r.left === n ? r.left = i : r.right = i, this.refitAndRotate(t, n);
  }
  createLeafNode(t, i) {
    return { box: i, object: t, parent: null };
  }
  createInternalNode(t, i, n) {
    return { parent: t, left: i, right: n, box: new this._typeArray(6) };
  }
  findBestSibling(t) {
    const i = this.root;
    let n = i, r = _(t, i.box);
    const f = S(t);
    if (i.object !== undefined)
      return i;
    const s = this._sortedList;
    s.clear();
    let o = { node: i, inheritedCost: r - S(i.box) };
    do {
      const { node: l, inheritedCost: c } = o;
      if (f + c >= r)
        break;
      const { left: u, right: a } = l, x = _(t, u.box) + c, d = x - S(u.box), h = _(t, a.box) + c, p = h - S(a.box);
      if (x > h ? r > h && (n = a, r = h) : r > x && (n = u, r = x), p > d) {
        if (f + d >= r || (u.object === undefined && s.push({ node: u, inheritedCost: d }), f + p >= r))
          continue;
        a.object === undefined && s.push({ node: a, inheritedCost: p });
      } else {
        if (f + p >= r || (a.object === undefined && s.push({ node: a, inheritedCost: p }), f + d >= r))
          continue;
        u.object === undefined && s.push({ node: u, inheritedCost: d });
      }
    } while (o = s.pop());
    return n;
  }
  refit(t) {
    for (E(t.left.box, t.right.box, t.box);t = t.parent; )
      if (!Z(t.left.box, t.right.box, t.box))
        return;
  }
  refitAndRotate(t, i) {
    const n = t.box;
    t = t.parent;
    const r = t.box;
    for (E(n, i.box, r);t = t.parent; ) {
      const f = t.box;
      if (!v(n, f))
        return;
      const { left: s, right: o } = t, l = s.box, c = o.box;
      let u = null, a = null, y = 0;
      if (o.object === undefined) {
        const { left: x, right: d } = o, M = S(o.box), h = M - _(l, x.box), p = M - _(l, d.box);
        h > p ? h > 0 && (u = s, a = d, y = h) : p > 0 && (u = s, a = x, y = p);
      }
      if (s.object === undefined) {
        const { left: x, right: d } = s, M = S(s.box), h = M - _(c, x.box), p = M - _(c, d.box);
        h > p ? h > y && (u = o, a = d) : p > y && (u = o, a = x);
      }
      u !== null && this.swap(u, a);
    }
  }
  swap(t, i) {
    const n = t.parent, r = i.parent, f = r.box;
    n.left === t ? n.left = i : n.right = i, r.left === i ? r.left = t : r.right = t, t.parent = r, i.parent = n, E(r.left.box, r.right.box, f);
  }
}

class V {
  constructor(t, i) {
    this.coordinateSystem = i, this.array = t ? new Float64Array(24) : new Float32Array(24);
  }
  setFromProjectionMatrix(t) {
    if (this.updatePlane(0, t[3] + t[0], t[7] + t[4], t[11] + t[8], t[15] + t[12]), this.updatePlane(1, t[3] - t[0], t[7] - t[4], t[11] - t[8], t[15] - t[12]), this.updatePlane(2, t[3] - t[1], t[7] - t[5], t[11] - t[9], t[15] - t[13]), this.updatePlane(3, t[3] + t[1], t[7] + t[5], t[11] + t[9], t[15] + t[13]), this.updatePlane(4, t[3] - t[2], t[7] - t[6], t[11] - t[10], t[15] - t[14]), this.coordinateSystem === X)
      this.updatePlane(5, t[3] + t[2], t[7] + t[6], t[11] + t[10], t[15] + t[14]);
    else if (this.coordinateSystem === U)
      this.updatePlane(5, t[2], t[6], t[10], t[14]);
    else
      throw new Error("Invalid coordinate system: " + this.coordinateSystem);
    return this;
  }
  updatePlane(t, i, n, r, f) {
    const s = this.array, o = t * 4, l = Math.sqrt(i * i + n * n + r * r);
    s[o + 0] = i / l, s[o + 1] = n / l, s[o + 2] = r / l, s[o + 3] = f / l;
  }
  intersectsBoxMask(t, i) {
    const n = this.array;
    let r, f, s, o, l, c;
    for (let u = 0;u < 6; u++) {
      if (!(i & 32 >> u))
        continue;
      const a = u * 4, y = n[a + 0], x = n[a + 1], d = n[a + 2], M = n[a + 3];
      if (y > 0 ? (r = t[1], o = t[0]) : (r = t[0], o = t[1]), x > 0 ? (f = t[3], l = t[2]) : (f = t[2], l = t[3]), d > 0 ? (s = t[5], c = t[4]) : (s = t[4], c = t[5]), y * r + x * f + d * s < -M)
        return -1;
      y * o + x * l + d * c > -M && (i ^= 32 >> u);
    }
    return i;
  }
  isIntersected(t, i) {
    const n = this.array;
    for (let r = 0;r < 6; r++) {
      if (!(i & 32 >> r))
        continue;
      const f = r * 4, s = n[f + 0], o = n[f + 1], l = n[f + 2], c = n[f + 3], u = s > 0 ? t[1] : t[0], a = o > 0 ? t[3] : t[2], y = l > 0 ? t[5] : t[4];
      if (s * u + o * a + l * y < -c)
        return false;
    }
    return true;
  }
  isIntersectedMargin(t, i, n) {
    if (i === 0)
      return true;
    const r = this.array;
    for (let f = 0;f < 6; f++) {
      if (!(i & 32 >> f))
        continue;
      const s = f * 4, o = r[s + 0], l = r[s + 1], c = r[s + 2], u = r[s + 3], a = o > 0 ? t[1] - n : t[0] + n, y = l > 0 ? t[3] - n : t[2] + n, x = c > 0 ? t[5] - n : t[4] + n;
      if (o * a + l * y + c * x < -u)
        return false;
    }
    return true;
  }
}
function q(e, t, i, n, r, f) {
  let s = n[0], o = t[0], l = i[0], c = (e[s] - o) * l, u = (e[s ^ 1] - o) * l, a = c > 0 ? c : 0, y = u < 1 / 0 ? u : 1 / 0;
  return s = n[1], o = t[1], l = i[1], c = (e[s + 2] - o) * l, c > y || (u = (e[s ^ 3] - o) * l, a > u) || (a = c > a ? c : a, y = u < y ? u : y, s = n[2], o = t[2], l = i[2], c = (e[s + 4] - o) * l, c > y) || (u = (e[s ^ 5] - o) * l, a > u) ? false : (a = c > a ? c : a, y = u < y ? u : y, a <= f && y >= r);
}
function O(e, t) {
  return e[1] >= t[0] && t[1] >= e[0] && e[3] >= t[2] && t[3] >= e[2] && e[5] >= t[4] && t[5] >= e[4];
}
function W(e, t, i) {
  return D(i, e) <= t * t;
}

class k {
  constructor(t, i = X) {
    this._sign = new Uint8Array(3), this.builder = t;
    const n = t.highPrecision;
    this.frustum = new V(n, i), this._dirInv = n ? new Float64Array(3) : new Float32Array(3);
  }
  get root() {
    return this.builder.root;
  }
  createFromArray(t, i, n, r) {
    (t == null ? undefined : t.length) > 0 && this.builder.createFromArray(t, i, n, r);
  }
  insert(t, i, n) {
    return this.builder.insert(t, i, n);
  }
  insertRange(t, i, n, r) {
    (t == null ? undefined : t.length) > 0 && this.builder.insertRange(t, i, n, r);
  }
  move(t, i) {
    this.builder.move(t, i);
  }
  delete(t) {
    return this.builder.delete(t);
  }
  clear() {
    this.builder.clear();
  }
  traverse(t) {
    if (this.root === null)
      return;
    i(this.root, 0);
    function i(n, r) {
      if (n.object !== undefined) {
        t(n, r);
        return;
      }
      t(n, r) || (i(n.left, r + 1), i(n.right, r + 1));
    }
  }
  intersectsRay(t, i, n, r = 0, f = 1 / 0) {
    if (this.root === null)
      return false;
    const s = this._dirInv, o = this._sign;
    return s[0] = 1 / t[0], s[1] = 1 / t[1], s[2] = 1 / t[2], o[0] = s[0] < 0 ? 1 : 0, o[1] = s[1] < 0 ? 1 : 0, o[2] = s[2] < 0 ? 1 : 0, l(this.root);
    function l(c) {
      return q(c.box, i, s, o, r, f) ? c.object !== undefined ? n(c.object) : l(c.left) || l(c.right) : false;
    }
  }
  intersectsBox(t, i) {
    if (this.root === null)
      return false;
    return n(this.root);
    function n(r) {
      return O(t, r.box) ? r.object !== undefined ? i(r.object) : n(r.left) || n(r.right) : false;
    }
  }
  intersectsSphere(t, i, n) {
    if (this.root === null)
      return false;
    return r(this.root);
    function r(f) {
      return W(t, i, f.box) ? f.object !== undefined ? n(f.object) : r(f.left) || r(f.right) : false;
    }
  }
  isNodeIntersected(t, i) {
    const n = t.box;
    let r;
    for (;r = t.parent; ) {
      const s = r.left === t ? r.right : r.left;
      if (f(s))
        return true;
      t = r;
    }
    return false;
    function f(s) {
      return O(n, s.box) ? s.object !== undefined ? i(s.object) : f(s.left) || f(s.right) : false;
    }
  }
  rayIntersections(t, i, n, r = 0, f = 1 / 0) {
    if (this.root === null)
      return;
    const s = this._dirInv, o = this._sign;
    s[0] = 1 / t[0], s[1] = 1 / t[1], s[2] = 1 / t[2], o[0] = s[0] < 0 ? 1 : 0, o[1] = s[1] < 0 ? 1 : 0, o[2] = s[2] < 0 ? 1 : 0, l(this.root);
    function l(c) {
      if (q(c.box, i, s, o, r, f)) {
        if (c.object !== undefined) {
          n(c.object);
          return;
        }
        l(c.left), l(c.right);
      }
    }
  }
  frustumCulling(t, i) {
    if (this.root === null)
      return;
    const n = this.frustum.setFromProjectionMatrix(t);
    r(this.root, 63);
    function r(s, o) {
      if (s.object !== undefined) {
        n.isIntersected(s.box, o) && i(s, n, o);
        return;
      }
      if (o = n.intersectsBoxMask(s.box, o), !(o < 0)) {
        if (o === 0) {
          f(s.left), f(s.right);
          return;
        }
        r(s.left, o), r(s.right, o);
      }
    }
    function f(s) {
      if (s.object !== undefined) {
        i(s, n, 0);
        return;
      }
      f(s.left), f(s.right);
    }
  }
  frustumCullingLOD(t, i, n, r) {
    if (this.root === null)
      return;
    const f = this.frustum.setFromProjectionMatrix(t);
    s(this.root, 63, null);
    function s(c, u, a) {
      const y = c.box;
      if (a === null && (a = l(y)), c.object !== undefined) {
        f.isIntersected(y, u) && r(c, a, f, u);
        return;
      }
      if (u = f.intersectsBoxMask(y, u), !(u < 0)) {
        if (u === 0) {
          o(c.left, a), o(c.right, a);
          return;
        }
        s(c.left, u, a), s(c.right, u, a);
      }
    }
    function o(c, u) {
      if (u === null && (u = l(c.box)), c.object !== undefined) {
        r(c, u, f, 0);
        return;
      }
      o(c.left, u), o(c.right, u);
    }
    function l(c) {
      const { min: u, max: a } = Y(c, i);
      for (let y = n.length - 1;y > 0; y--)
        if (a >= n[y])
          return u >= n[y] ? y : null;
      return 0;
    }
  }
  closestPointToPoint(t, i) {
    if (this.root === null)
      return;
    let n = 1 / 0;
    return r(this.root), Math.sqrt(n);
    function r(f) {
      if (f.object !== undefined) {
        if (i) {
          const l = i(f.object) ?? D(f.box, t);
          l < n && (n = l);
        } else
          n = D(f.box, t);
        return;
      }
      const s = D(f.left.box, t), o = D(f.right.box, t);
      s < o ? s < n && (r(f.left), o < n && r(f.right)) : o < n && (r(f.right), s < n && r(f.left));
    }
  }
}
function m(e, t) {
  return t[0] = e.x, t[1] = e.y, t[2] = e.z, t;
}
function B(e, t) {
  const { min: i, max: n } = e;
  return t[0] = i.x, t[1] = n.x, t[2] = i.y, t[3] = n.y, t[4] = i.z, t[5] = n.z, t;
}
var X = 0, U = 1;
var init_build = () => {};

// node_modules/.bun/three@0.186.1/node_modules/three/examples/jsm/utils/SortUtils.js
var POWER = 3, BIT_MAX = 32, BIN_BITS, BIN_SIZE, BIN_MAX, ITERATIONS, bins, bins_buffer, c = 0, defaultGet = (el) => el, radixSort = (arr, opt) => {
  const len = arr.length;
  const options = opt || {};
  const aux = options.aux || new arr.constructor(len);
  const get = options.get || defaultGet;
  const data = [arr, aux];
  let compare, accumulate, recurse;
  if (options.reversed) {
    compare = (a, b) => a < b;
    accumulate = (bin) => {
      for (let j = BIN_SIZE - 2;j >= 0; j--)
        bin[j] += bin[j + 1];
    };
    recurse = (cache, depth, start2) => {
      let prev = 0;
      for (let j = BIN_MAX;j >= 0; j--) {
        const cur = cache[j], diff = cur - prev;
        if (diff != 0) {
          if (diff > 32)
            radixSortBlock(depth + 1, start2 + prev, diff);
          else
            insertionSortBlock(depth + 1, start2 + prev, diff);
          prev = cur;
        }
      }
    };
  } else {
    compare = (a, b) => a > b;
    accumulate = (bin) => {
      for (let j = 1;j < BIN_SIZE; j++)
        bin[j] += bin[j - 1];
    };
    recurse = (cache, depth, start2) => {
      let prev = 0;
      for (let j = 0;j < BIN_SIZE; j++) {
        const cur = cache[j], diff = cur - prev;
        if (diff != 0) {
          if (diff > 32)
            radixSortBlock(depth + 1, start2 + prev, diff);
          else
            insertionSortBlock(depth + 1, start2 + prev, diff);
          prev = cur;
        }
      }
    };
  }
  const insertionSortBlock = (depth, start2, len2) => {
    const a = data[depth & 1];
    const b = data[depth + 1 & 1];
    for (let j = start2 + 1;j < start2 + len2; j++) {
      const p = a[j], t = get(p) >>> 0;
      let i = j;
      while (i > start2) {
        if (compare(get(a[i - 1]) >>> 0, t))
          a[i] = a[--i];
        else
          break;
      }
      a[i] = p;
    }
    if ((depth & 1) == 1) {
      for (let i = start2;i < start2 + len2; i++)
        b[i] = a[i];
    }
  };
  const radixSortBlock = (depth, start2, len2) => {
    const a = data[depth & 1];
    const b = data[depth + 1 & 1];
    const shift = 3 - depth << POWER;
    const end = start2 + len2;
    const cache = bins[depth];
    const bin = bins[depth + 1];
    bin.fill(0);
    for (let j = start2;j < end; j++)
      bin[get(a[j]) >>> shift & BIN_MAX]++;
    accumulate(bin);
    cache.set(bin);
    for (let j = end - 1;j >= start2; j--)
      b[start2 + --bin[get(a[j]) >>> shift & BIN_MAX]] = a[j];
    if (depth == ITERATIONS - 1)
      return;
    recurse(cache, depth, start2);
  };
  radixSortBlock(0, 0, len);
};
var init_SortUtils = __esm(() => {
  BIN_BITS = 1 << POWER;
  BIN_SIZE = 1 << BIN_BITS;
  BIN_MAX = BIN_SIZE - 1;
  ITERATIONS = BIT_MAX / BIN_BITS;
  bins = new Array(ITERATIONS);
  bins_buffer = new ArrayBuffer((ITERATIONS + 1) * BIN_SIZE * 4);
  for (let i = 0;i < ITERATIONS + 1; i++) {
    bins[i] = new Uint32Array(bins_buffer, c, BIN_SIZE);
    c += BIN_SIZE * 4;
  }
});

// node_modules/.bun/@three.ez+instanced-mesh@0.3.16+a39cd20facce8359/node_modules/@three.ez/instanced-mesh/build/index.js
var exports_build = {};
__export(exports_build, {
  unpatchProperties: () => re,
  sortTransparent: () => Dt,
  sortOpaque: () => Bt,
  patchShader: () => lt,
  patchProperties: () => se,
  getSquareTextureSize: () => Ut,
  getSquareTextureInfo: () => oe,
  createRadixSort: () => Te,
  createInstancedMesh2From: () => Ie,
  SquareDataTexture: () => J,
  InstancedRenderList: () => le,
  InstancedMeshBVH: () => te,
  InstancedMesh2: () => f,
  InstancedEntity: () => Lt,
  GLInstancedBufferAttribute: () => ee
});
import { Quaternion as Ot, Vector3 as T, Euler as Ft, Box3 as ot, GLBufferAttribute as Et, DataTexture as at, WebGLUtils as Pt, ColorManagement as Z2, NoColorSpace as ft, FloatType as ct, UnsignedIntType as Rt, IntType as Nt, RGBAFormat as zt, RGBAIntegerFormat as jt, RGFormat as $t, RGIntegerFormat as Gt, RedFormat as ht, RedIntegerFormat as qt, Sphere as nt, Matrix4 as z, Color as Vt, Mesh as ut, AttachedBindMode as dt, InstancedBufferAttribute as Wt, DetachedBindMode as kt, Frustum as Kt, ShaderMaterial as Yt, Ray as Ht, ShaderChunk as _2 } from "three";

class Lt {
  constructor(t, e, n) {
    if (this.isInstanceEntity = true, this.position = new T, this.scale = new T(1, 1, 1), this.quaternion = new Ot, this.id = e, this.owner = t, n) {
      const i = this.quaternion, s = this.rotation = new Ft;
      s._onChange(() => i.setFromEuler(s, false)), i._onChange(() => s.setFromQuaternion(i, undefined, false));
    }
  }
  get visible() {
    return this.owner.getVisibilityAt(this.id);
  }
  set visible(t) {
    this.owner.setVisibilityAt(this.id, t);
  }
  get active() {
    return this.owner.getActiveAt(this.id);
  }
  set active(t) {
    this.owner.setActiveAt(this.id, t);
  }
  get color() {
    return this.owner.getColorAt(this.id);
  }
  set color(t) {
    this.owner.setColorAt(this.id, t);
  }
  get opacity() {
    return this.owner.getOpacityAt(this.id);
  }
  set opacity(t) {
    this.owner.setOpacityAt(this.id, t);
  }
  get morph() {
    return this.owner.getMorphAt(this.id);
  }
  set morph(t) {
    this.owner.setMorphAt(this.id, t);
  }
  get matrix() {
    return this.owner.getMatrixAt(this.id);
  }
  get matrixWorld() {
    return this.matrix.premultiply(this.owner.matrixWorld);
  }
  setMatrixIdentity() {
    const t = this.owner, e = t.matricesTexture._data, n = this.id, i = n * 16;
    e[i + 0] = 1, e[i + 1] = 0, e[i + 2] = 0, e[i + 3] = 0, e[i + 4] = 0, e[i + 5] = 1, e[i + 6] = 0, e[i + 7] = 0, e[i + 8] = 0, e[i + 9] = 0, e[i + 10] = 1, e[i + 11] = 0, e[i + 12] = 0, e[i + 13] = 0, e[i + 14] = 0, e[i + 15] = 1, t.matricesTexture.enqueueUpdate(n);
  }
  updateMatrix() {
    const t = this.owner, e = this.position, n = this.quaternion, i = this.scale, s = t.matricesTexture._data, o = this.id, a = o * 16, c2 = n._x, h = n._y, u = n._z, l = n._w, d = c2 + c2, p = h + h, m2 = u + u, x = c2 * d, g2 = c2 * p, y = c2 * m2, w2 = h * p, I = h * m2, O2 = u * m2, L = l * d, U2 = l * p, C = l * m2, A = i.x, b = i.y, v2 = i.z;
    s[a + 0] = (1 - (w2 + O2)) * A, s[a + 1] = (g2 + C) * A, s[a + 2] = (y - U2) * A, s[a + 3] = 0, s[a + 4] = (g2 - C) * b, s[a + 5] = (1 - (x + O2)) * b, s[a + 6] = (I + L) * b, s[a + 7] = 0, s[a + 8] = (y + U2) * v2, s[a + 9] = (I - L) * v2, s[a + 10] = (1 - (x + w2)) * v2, s[a + 11] = 0, s[a + 12] = e.x, s[a + 13] = e.y, s[a + 14] = e.z, s[a + 15] = 1, t.matricesTexture.enqueueUpdate(o), t.bvh && t.autoUpdateBVH && t.bvh.move(o);
  }
  updateMatrixPosition() {
    const t = this.owner, e = this.position, n = t.matricesTexture._data, i = this.id, s = i * 16;
    n[s + 12] = e.x, n[s + 13] = e.y, n[s + 14] = e.z, t.matricesTexture.enqueueUpdate(i), t.bvh && t.autoUpdateBVH && t.bvh.move(i);
  }
  getUniform(t, e) {
    return this.owner.getUniformAt(this.id, t, e);
  }
  updateBones(t = true, e) {
    this.owner.setBonesAt(this.id, t, e);
  }
  setUniform(t, e) {
    this.owner.setUniformAt(this.id, t, e);
  }
  copyTo(t) {
    t.position.copy(this.position), t.scale.copy(this.scale), t.quaternion.copy(this.quaternion), this.rotation && t.rotation.copy(this.rotation);
  }
  applyMatrix4(t) {
    return this.matrix.premultiply(t).decompose(this.position, this.quaternion, this.scale), this;
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  rotateOnAxis(t, e) {
    return X2.setFromAxisAngle(t, e), this.quaternion.multiply(X2), this;
  }
  rotateOnWorldAxis(t, e) {
    return X2.setFromAxisAngle(t, e), this.quaternion.premultiply(X2), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(_t, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(gt, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(yt, t);
  }
  translateOnAxis(t, e) {
    return xt.copy(t).applyQuaternion(this.quaternion), this.position.add(xt.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(_t, t);
  }
  translateY(t) {
    return this.translateOnAxis(gt, t);
  }
  translateZ(t) {
    return this.translateOnAxis(yt, t);
  }
  remove() {
    return this.owner.removeInstances(this.id), this;
  }
}

class te {
  constructor(t, e = 0, n = false, i = true) {
    this.nodesMap = /* @__PURE__ */ new Map, this.LODsMap = /* @__PURE__ */ new Map, this._geoBoundingSphere = null, this._sphereTarget = null, this.target = t, this.accurateCulling = i, this._margin = e;
    const s = t._geometry;
    if (s.boundingBox || s.computeBoundingBox(), this.geoBoundingBox = s.boundingBox, n) {
      s.boundingSphere || s.computeBoundingSphere();
      const o = s.boundingSphere.center;
      o.x === 0 && o.y === 0 && o.z === 0 ? (this._geoBoundingSphere = s.boundingSphere, this._sphereTarget = { centerX: 0, centerY: 0, centerZ: 0, maxScale: 0 }) : (console.warn('"getBoxFromSphere" is ignored because geometry is not centered.'), n = false);
    }
    this.bvh = new k(new $, X), this._origin = new Float32Array(3), this._dir = new Float32Array(3), this._cameraPos = new Float32Array(3), this._getBoxFromSphere = n;
  }
  create() {
    const t = this.target._instancesCount, e = this.target._instancesArrayCount, n = new Array(t), i = new Uint32Array(t);
    let s = 0;
    this.clear();
    for (let o = 0;o < e; o++)
      this.target.getActiveAt(o) && (n[s] = this.getBox(o, new Float32Array(6)), i[s] = o, s++);
    this.bvh.createFromArray(i, n, (o) => {
      this.nodesMap.set(o.object, o);
    }, this._margin);
  }
  insert(t) {
    const e = this.bvh.insert(t, this.getBox(t, new Float32Array(6)), this._margin);
    this.nodesMap.set(t, e);
  }
  insertRange(t) {
    const e = t.length, n = new Array(e);
    for (let i = 0;i < e; i++)
      n[i] = this.getBox(t[i], new Float32Array(6));
    this.bvh.insertRange(t, n, this._margin, (i) => {
      this.nodesMap.set(i.object, i);
    });
  }
  move(t) {
    const e = this.nodesMap.get(t);
    e && (this.getBox(t, e.box), this.bvh.move(e, this._margin));
  }
  delete(t) {
    const e = this.nodesMap.get(t);
    e && (this.bvh.delete(e), this.nodesMap.delete(t));
  }
  clear() {
    this.bvh.clear(), this.nodesMap.clear();
  }
  frustumCulling(t, e) {
    this._margin > 0 && this.accurateCulling ? this.bvh.frustumCulling(t.elements, (n, i, s) => {
      i.isIntersectedMargin(n.box, s, this._margin) && e(n);
    }) : this.bvh.frustumCulling(t.elements, e);
  }
  frustumCullingLOD(t, e, n, i) {
    this.LODsMap.has(n) || this.LODsMap.set(n, new Float32Array(n.length));
    const s = this.LODsMap.get(n);
    for (let a = 0;a < n.length; a++)
      s[a] = n[a].distance;
    const o = this._cameraPos;
    o[0] = e.x, o[1] = e.y, o[2] = e.z, this._margin > 0 && this.accurateCulling ? this.bvh.frustumCullingLOD(t.elements, o, s, (a, c2, h, u) => {
      h.isIntersectedMargin(a.box, u, this._margin) && i(a, c2);
    }) : this.bvh.frustumCullingLOD(t.elements, o, s, i);
  }
  raycast(t, e) {
    const n = t.ray, i = this._origin, s = this._dir;
    m(n.origin, i), m(n.direction, s), this.bvh.rayIntersections(s, i, e, t.near, t.far);
  }
  intersectBox(t, e) {
    this._boxArray || (this._boxArray = new Float32Array(6));
    const n = this._boxArray;
    return B(t, n), this.bvh.intersectsBox(n, e);
  }
  getBox(t, e) {
    if (this._getBoxFromSphere) {
      const n = this.target.matricesTexture._data, { centerX: i, centerY: s, centerZ: o, maxScale: a } = this.getSphereFromMatrix_centeredGeometry(t, n, this._sphereTarget), c2 = this._geoBoundingSphere.radius * a;
      e[0] = i - c2, e[1] = i + c2, e[2] = s - c2, e[3] = s + c2, e[4] = o - c2, e[5] = o + c2;
    } else
      At.copy(this.geoBoundingBox).applyMatrix4(this.target.getMatrixAt(t)), B(At, e);
    return e;
  }
  getSphereFromMatrix_centeredGeometry(t, e, n) {
    const i = t * 16, s = e[i + 0], o = e[i + 1], a = e[i + 2], c2 = e[i + 4], h = e[i + 5], u = e[i + 6], l = e[i + 8], d = e[i + 9], p = e[i + 10], m2 = s * s + o * o + a * a, x = c2 * c2 + h * h + u * u, g2 = l * l + d * d + p * p;
    return n.maxScale = Math.sqrt(Math.max(m2, x, g2)), n.centerX = e[i + 12], n.centerY = e[i + 13], n.centerZ = e[i + 14], n;
  }
}
function ne(r) {
  return Q.get(r)?.() ?? it(r);
}
function ie(r) {
  if (Q.has(r))
    return;
  const t = {};
  Q.set(r, () => {
    if (r.isMeshDistanceMaterial) {
      const e = it(r);
      t.light = e.light;
    }
    return t;
  });
}
function se(r, t, e) {
  const n = t.properties;
  it = n.get;
  const i = `${!!r.colorsTexture}_${r._useOpacity}_${!!r.boneTexture}_${!!r.uniformsTexture}`;
  bt[i] ??= /* @__PURE__ */ new WeakMap, Q = bt[i], n.get = ne, ie(e);
}
function re(r) {
  r.properties.get = it;
}
function Ut(r, t) {
  return Math.max(t, Math.ceil(Math.sqrt(r / t)) * t);
}
function oe(r, t, e, n) {
  t === 3 && (console.warn('"channels" cannot be 3. Set to 4. More info: https://github.com/mrdoob/three.js/pull/23228'), t = 4);
  const i = Ut(n, e), s = new r(i * i * t), o = r.name.includes("Float"), a = r.name.includes("Uint"), c2 = o ? ct : a ? Rt : Nt;
  let h;
  switch (t) {
    case 1:
      h = o ? ht : qt;
      break;
    case 2:
      h = o ? $t : Gt;
      break;
    case 4:
      h = o ? zt : jt;
      break;
  }
  return { array: s, size: i, type: c2, format: h };
}
function Te(r) {
  const t = {
    get: (e) => e.depthSort,
    aux: new Array(r._capacity),
    reversed: false
  };
  return function(n) {
    t.reversed = !!r.material?.transparent, r._capacity > t.aux.length && (t.aux.length = r._capacity);
    let i = 1 / 0, s = -1 / 0;
    for (const { depth: c2 } of n)
      c2 > s && (s = c2), c2 < i && (i = c2);
    const o = s - i, a = (2 ** 32 - 1) / o;
    for (const c2 of n)
      c2.depthSort = (c2.depth - i) * a;
    radixSort(n, t);
  };
}
function Bt(r, t) {
  return r.depth - t.depth;
}
function Dt(r, t) {
  return t.depth - r.depth;
}

class le {
  constructor() {
    this.array = [], this.pool = [];
  }
  push(t, e) {
    const n = this.pool, i = this.array, s = i.length;
    s >= n.length && n.push({ depth: null, index: null, depthSort: null });
    const o = n[s];
    o.depth = t, o.index = e, i.push(o);
  }
  reset() {
    this.array.length = 0;
  }
}
function lt(r) {
  return r.replace("#ifdef USE_INSTANCING", "#if defined USE_INSTANCING || defined USE_INSTANCING_INDIRECT");
}
function Ie(r, t = {}) {
  if (r.isSkinnedMesh)
    return e(r);
  if (r.isInstancedMesh)
    return n(r);
  return new f(r.geometry, r.material, t);
  function e(i) {
    const s = new f(i.geometry.clone(), i.material, t);
    return s.initSkeleton(i.skeleton), s;
  }
  function n(i) {
    t.capacity = Math.max(i.count, t.capacity);
    const s = i.geometry.clone();
    s.deleteAttribute("instanceIndex"), u();
    const o = new f(s, i.material, t);
    return o.position.copy(i.position), o.quaternion.copy(i.quaternion), o.scale.copy(i.scale), a(), c2(), h(), o;
    function a() {
      o.setInstancesArrayCount(i.count), o._instancesCount = i.count, o.availabilityArray.fill(true, 0, i.count * 2);
    }
    function c2() {
      o.matricesTexture.image.data.set(i.instanceMatrix.array);
    }
    function h() {
      if (i.instanceColor) {
        o.initColorsTexture();
        const l = i.instanceColor.array, d = o.colorsTexture.image.data;
        for (let p = 0, m2 = 0;p < l.length; p += 3, m2 += 4)
          d[m2] = l[p], d[m2 + 1] = l[p + 1], d[m2 + 2] = l[p + 2], d[m2 + 3] = 1;
      }
    }
    function u() {
      const l = s.attributes;
      for (const d in l)
        l[d].isInstancedBufferAttribute && console.warn(`InstancedBufferAttribute "${d}" is not supported. It will be ignored.`);
    }
  }
}
var X2, xt, _t, gt, yt, At, ee, it = null, Q = null, bt, J, ae, f, ce = 1000, vt, Tt, he, It, ue, tt, M, D2, R, st, j, N, fe, S2, de, rt, et, pe, wt, Ct, St, Mt, me = `#ifdef USE_INSTANCING_INDIRECT\r
  attribute uint instanceIndex;\r
  uniform highp sampler2D matricesTexture;  

  mat4 getInstancedMatrix() {\r
    int size = textureSize( matricesTexture, 0 ).x;\r
    int j = int( instanceIndex ) * 4;\r
    int x = j % size;\r
    int y = j / size;\r
    vec4 v1 = texelFetch( matricesTexture, ivec2( x, y ), 0 );\r
    vec4 v2 = texelFetch( matricesTexture, ivec2( x + 1, y ), 0 );\r
    vec4 v3 = texelFetch( matricesTexture, ivec2( x + 2, y ), 0 );\r
    vec4 v4 = texelFetch( matricesTexture, ivec2( x + 3, y ), 0 );\r
    return mat4( v1, v2, v3, v4 );\r
  }\r
#endif`, xe = `#ifdef USE_INSTANCING_COLOR_INDIRECT\r
  uniform highp sampler2D colorsTexture;

  vec4 getColorTexture() {\r
    int size = textureSize( colorsTexture, 0 ).x;\r
    int j = int( instanceIndex );\r
    int x = j % size;\r
    int y = j / size;\r
    return texelFetch( colorsTexture, ivec2( x, y ), 0 );\r
  }\r
#endif`, _e = `#ifdef USE_INSTANCING_INDIRECT\r
  mat4 instanceMatrix = getInstancedMatrix();

  #ifdef USE_INSTANCING_COLOR_INDIRECT\r
    vColor *= getColorTexture();\r
  #endif\r
#endif`, ge = `#ifdef USE_INSTANCING_COLOR_INDIRECT\r
  #ifdef USE_VERTEX_COLOR\r
    vColor = vec4( color );\r
  #else\r
    vColor = vec4( 1.0 );\r
  #endif\r
#endif`, ye = `#ifdef USE_SKINNING\r
  uniform mat4 bindMatrix;\r
  uniform mat4 bindMatrixInverse;\r
  uniform highp sampler2D boneTexture;

  #ifdef USE_INSTANCING_SKINNING\r
    uniform int bonesPerInstance;\r
  #endif

  mat4 getBoneMatrix( const in float i ) {\r
    int size = textureSize( boneTexture, 0 ).x;

    #ifdef USE_INSTANCING_SKINNING\r
      int j = ( bonesPerInstance * int( instanceIndex ) + int( i ) ) * 4;\r
    #else\r
      int j = int( i ) * 4;\r
    #endif

    int x = j % size;\r
    int y = j / size;\r
    vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\r
    vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\r
    vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\r
    vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\r
    return mat4( v1, v2, v3, v4 );\r
  }\r
#endif`;
var init_build2 = __esm(() => {
  init_build();
  init_SortUtils();
  X2 = new Ot;
  xt = new T;
  _t = new T(1, 0, 0);
  gt = new T(0, 1, 0);
  yt = new T(0, 0, 1);
  At = new ot;
  ee = class ee extends Et {
    constructor(t, e, n, i, s, o = 1) {
      const a = t.createBuffer();
      super(a, e, n, i, s.length / n), this.isGLInstancedBufferAttribute = true, this._needsUpdate = false, this.isInstancedBufferAttribute = true, this.meshPerAttribute = o, this.array = s, this._cacheArray = s, t.bindBuffer(t.ARRAY_BUFFER, a), t.bufferData(t.ARRAY_BUFFER, s, t.DYNAMIC_DRAW);
    }
    update(t, e) {
      if (!this._needsUpdate || e === 0)
        return;
      const n = t.getContext();
      n.bindBuffer(n.ARRAY_BUFFER, this.buffer), this.array === this._cacheArray ? n.bufferSubData(n.ARRAY_BUFFER, 0, this.array, 0, e) : (n.bufferData(n.ARRAY_BUFFER, this.array, n.DYNAMIC_DRAW), this._cacheArray = this.array), this._needsUpdate = false;
    }
    clone() {
      return this;
    }
  };
  bt = {};
  J = class J extends at {
    constructor(t, e, n, i, s, o) {
      e === 3 && (e = 4);
      const { array: a, format: c2, size: h, type: u } = oe(t, e, n, i);
      super(a, h, h, c2, u), this.partialUpdate = true, this.maxUpdateCalls = 1 / 0, this._utils = null, this._needsUpdate = true, this._lastWidth = -1, this._data = a, this._channels = e, this._pixelsPerInstance = n, this._stride = n * e, this._rowToUpdate = new Array(h), this._uniformMap = s, this._fetchUniformsInFragmentShader = o, this.needsUpdate = true;
    }
    resize(t) {
      const e = Ut(t, this._pixelsPerInstance);
      if (e === this.image.width)
        return;
      const n = this._data, i = this._channels;
      this._rowToUpdate.length = e;
      const s = n.constructor, o = new s(e * e * i), a = Math.min(n.length, o.length);
      o.set(new s(n.buffer, 0, a)), this.dispose(), this.image = { data: o, height: e, width: e }, this._data = o;
    }
    enqueueUpdate(t) {
      if (this._needsUpdate = true, !this.partialUpdate)
        return;
      const e = this.image.width / this._pixelsPerInstance, n = Math.floor(t / e);
      this._rowToUpdate[n] = true;
    }
    bindToProgram(t, e, n, i, s) {
      if (!i[s])
        return;
      i[s].value = this;
      const o = this.getSlot(n, s);
      if (o === undefined)
        return;
      const a = t.properties.get(this);
      t.state.bindTexture(e.TEXTURE_2D, a.__webglTexture, e.TEXTURE0 + o);
    }
    update(t, e, n) {
      const i = t.properties.get(this), s = i.__version !== this.version;
      if (!this._needsUpdate && !s)
        return;
      const o = this._lastWidth !== this.image.width;
      if (!i.__webglTexture || o)
        t.initTexture(this);
      else {
        const a = this.getSlot(e, n) ?? t.capabilities.maxTextures - 1;
        this.partialUpdate ? this.updatePartial(i, t, a) : this.updateFull(i, t, a), i.__version = this.version;
      }
      this._lastWidth = this.image.width, this._needsUpdate = false;
    }
    getSlot(t, e) {
      return t[e]?.cache[0];
    }
    updateFull(t, e, n) {
      this.updateRows(t, e, [{ row: 0, count: this.image.height }], n);
    }
    updatePartial(t, e, n) {
      const i = this.getUpdateRowsInfo();
      i.length !== 0 && (i.length > this.maxUpdateCalls ? this.updateFull(t, e, n) : this.updateRows(t, e, i, n), this._rowToUpdate.fill(false));
    }
    getUpdateRowsInfo() {
      const t = this._rowToUpdate, e = [];
      for (let n = 0, i = t.length;n < i; n++)
        if (t[n]) {
          const s = n;
          for (;n < i && t[n]; n++)
            ;
          e.push({ row: s, count: n - s });
        }
      return e;
    }
    updateRows(t, e, n, i) {
      const s = e.getContext();
      this._utils ??= new Pt(s, e.extensions, e.capabilities);
      const o = this._utils.convert(this.format), a = this._utils.convert(this.type), { data: c2, width: h } = this.image, u = this._channels;
      e.state.activeTexture(s.TEXTURE0 + i), e.state.bindTexture(s.TEXTURE_2D, t.__webglTexture, s.TEXTURE0 + i);
      const l = Z2.getPrimaries(Z2.workingColorSpace), d = this.colorSpace === ft ? null : Z2.getPrimaries(this.colorSpace), p = this.colorSpace === ft || l === d ? s.NONE : s.BROWSER_DEFAULT_WEBGL, m2 = s.getParameter(s.UNPACK_FLIP_Y_WEBGL), x = s.getParameter(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL), g2 = s.getParameter(s.UNPACK_ALIGNMENT), y = s.getParameter(s.UNPACK_COLORSPACE_CONVERSION_WEBGL);
      s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, this.flipY), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), s.pixelStorei(s.UNPACK_ALIGNMENT, this.unpackAlignment), s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, p);
      for (const { count: w2, row: I } of n)
        s.texSubImage2D(s.TEXTURE_2D, 0, 0, I, h, w2, o, a, c2, I * h * u);
      s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, m2), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x), s.pixelStorei(s.UNPACK_ALIGNMENT, g2), s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, y), this.onUpdate?.(this);
    }
    setUniformAt(t, e, n) {
      const { offset: i, size: s } = this._uniformMap.get(e), o = this._stride;
      s === 1 ? this._data[t * o + i] = n : n.toArray(this._data, t * o + i);
    }
    getUniformAt(t, e, n) {
      const { offset: i, size: s } = this._uniformMap.get(e), o = this._stride;
      return s === 1 ? this._data[t * o + i] : n.fromArray(this._data, t * o + i);
    }
    getUniformsGLSL(t, e, n) {
      const i = this.getUniformsVertexGLSL(t, e, n), s = this.getUniformsFragmentGLSL(t, e, n);
      return { vertex: i, fragment: s };
    }
    getUniformsVertexGLSL(t, e, n) {
      if (this._fetchUniformsInFragmentShader)
        return `
        flat varying ${n} ez_v${e}; 
        void main() {
          ez_v${e} = ${e};`;
      const i = this.texelsFetchGLSL(t, e), s = this.getFromTexelsGLSL(), { assignVarying: o, declareVarying: a } = this.getVarying();
      return `
      uniform highp sampler2D ${t};  
      ${a}
      void main() {
        ${i}
        ${s}
        ${o}`;
    }
    getUniformsFragmentGLSL(t, e, n) {
      if (!this._fetchUniformsInFragmentShader) {
        const { declareVarying: o, getVarying: a } = this.getVarying();
        return `
      ${o}
      void main() {
        ${a}`;
      }
      const i = this.texelsFetchGLSL(t, `ez_v${e}`), s = this.getFromTexelsGLSL();
      return `
      uniform highp sampler2D ${t};  
      flat varying ${n} ez_v${e};
      void main() {
        ${i}
        ${s}`;
    }
    texelsFetchGLSL(t, e) {
      const n = this._pixelsPerInstance;
      let i = `
      int size = textureSize(${t}, 0).x;
      int j = int(${e}) * ${n};
      int x = j % size;
      int y = j / size;
    `;
      for (let s = 0;s < n; s++)
        i += `vec4 ez_texel${s} = texelFetch(${t}, ivec2(x + ${s}, y), 0);
`;
      return i;
    }
    getFromTexelsGLSL() {
      const t = this._uniformMap;
      let e = "";
      for (const [n, { type: i, offset: s, size: o }] of t) {
        const a = Math.floor(s / this._channels);
        if (i === "mat3")
          e += `mat3 ${n} = mat3(ez_texel${a}.rgb, vec3(ez_texel${a}.a, ez_texel${a + 1}.rg), vec3(ez_texel${a + 1}.ba, ez_texel${a + 2}.r));
`;
        else if (i === "mat4")
          e += `mat4 ${n} = mat4(ez_texel${a}, ez_texel${a + 1}, ez_texel${a + 2}, ez_texel${a + 3});
`;
        else {
          const c2 = this.getUniformComponents(s, o);
          e += `${i} ${n} = ez_texel${a}.${c2};
`;
        }
      }
      return e;
    }
    getVarying() {
      const t = this._uniformMap;
      let e = "", n = "", i = "";
      for (const [s, { type: o }] of t)
        e += `flat varying ${o} ez_v${s};
`, n += `ez_v${s} = ${s};
`, i += `${o} ${s} = ez_v${s};
`;
      return { declareVarying: e, assignVarying: n, getVarying: i };
    }
    getUniformComponents(t, e) {
      const n = t % this._channels;
      let i = "";
      for (let s = 0;s < e; s++)
        i += ae[n + s];
      return i;
    }
    copy(t) {
      return super.copy(t), this.partialUpdate = t.partialUpdate, this.maxUpdateCalls = t.maxUpdateCalls, this._channels = t._channels, this._pixelsPerInstance = t._pixelsPerInstance, this._stride = t._stride, this._rowToUpdate = t._rowToUpdate, this._uniformMap = t._uniformMap, this._fetchUniformsInFragmentShader = t._fetchUniformsInFragmentShader, this;
    }
  };
  ae = ["r", "g", "b", "a"];
  f = class f extends ut {
    constructor(t, e, n = {}, i) {
      if (!t)
        throw new Error('"geometry" is mandatory.');
      if (!e)
        throw new Error('"material" is mandatory.');
      const { allowsEuler: s, renderer: o, createEntities: a } = n;
      super(t, null), this.type = "InstancedMesh2", this.isInstancedMesh2 = true, this.instances = null, this.instanceIndex = null, this.colorsTexture = null, this.morphTexture = null, this.boneTexture = null, this.uniformsTexture = null, this.boundingBox = null, this.boundingSphere = null, this.bvh = null, this.customSort = null, this.raycastOnlyFrustum = false, this.LODinfo = null, this.autoUpdate = true, this.bindMode = dt, this.bindMatrix = null, this.bindMatrixInverse = null, this.skeleton = null, this.autoUpdateBVH = true, this.onFrustumEnter = null, this._renderer = null, this._instancesCount = 0, this._instancesArrayCount = 0, this._perObjectFrustumCulled = true, this._sortObjects = false, this._indexArrayNeedsUpdate = false, this._useOpacity = false, this._currentMaterial = null, this._customProgramCacheKeyBase = null, this._onBeforeCompileBase = null, this._definesBase = null, this._freeIds = [], this.isInstancedMesh = true, this.instanceMatrix = new Wt(new Float32Array(0), 16), this.instanceColor = null, this._customProgramCacheKey = () => `ez_${!!this.colorsTexture}_${this._useOpacity}_${!!this.boneTexture}_${!!this.uniformsTexture}_${this._customProgramCacheKeyBase.call(this._currentMaterial)}`, this._onBeforeCompile = (h, u) => {
        if (this._onBeforeCompileBase && this._onBeforeCompileBase.call(this._currentMaterial, h, u), h.defines = { ...h.defines }, h.defines.USE_INSTANCING_INDIRECT = "", h.uniforms.matricesTexture = { value: this.matricesTexture }, this.uniformsTexture) {
          h.uniforms.uniformsTexture = { value: this.uniformsTexture };
          const { vertex: l, fragment: d } = this.uniformsTexture.getUniformsGLSL("uniformsTexture", "instanceIndex", "uint");
          h.vertexShader = h.vertexShader.replace("void main() {", l), h.fragmentShader = h.fragmentShader.replace("void main() {", d);
        }
        this.colorsTexture && h.fragmentShader.includes("#include <color_pars_fragment>") && (h.defines.USE_INSTANCING_COLOR_INDIRECT = "", h.uniforms.colorsTexture = { value: this.colorsTexture }, h.vertexShader = h.vertexShader.replace("<color_vertex>", "<instanced_color_vertex>"), h.vertexColors && (h.defines.USE_VERTEX_COLOR = ""), h.defines.USE_COLOR_ALPHA = ""), this.boneTexture && (h.defines.USE_SKINNING = "", h.defines.USE_INSTANCING_SKINNING = "", h.uniforms.bindMatrix = { value: this.bindMatrix }, h.uniforms.bindMatrixInverse = { value: this.bindMatrixInverse }, h.uniforms.bonesPerInstance = { value: this.skeleton.bones.length }, h.uniforms.boneTexture = { value: this.boneTexture });
      };
      const c2 = n.capacity > 0 ? n.capacity : ce;
      this._renderer = o, this._capacity = c2, this._parentLOD = i, this._geometry = t, this.material = e, this._allowsEuler = s ?? false, this._tempInstance = new Lt(this, -1, s), this.availabilityArray = i?.availabilityArray ?? new Array(c2 * 2), this._createEntities = a, this.initLastRenderInfo(), this.initIndexAttribute(), this.initMatricesTexture();
    }
    get capacity() {
      return this._capacity;
    }
    get instancesCount() {
      return this._instancesCount;
    }
    get perObjectFrustumCulled() {
      return this._perObjectFrustumCulled;
    }
    set perObjectFrustumCulled(t) {
      this._perObjectFrustumCulled = t, this._indexArrayNeedsUpdate = true;
    }
    get sortObjects() {
      return this._sortObjects;
    }
    set sortObjects(t) {
      this._sortObjects = t, this._indexArrayNeedsUpdate = true;
    }
    get geometry() {
      return this._geometry;
    }
    set geometry(t) {
      this._geometry = t, this.patchGeometry(t);
    }
    onBeforeShadow(t, e, n, i, s, o, a) {
      this.patchMaterial(t, o), this.updateTextures(t, o);
      const c2 = t.info.render.frame;
      this.instanceIndex && this.autoUpdate && !this.frustumCullingAlreadyPerformed(c2, n, i) && this.performFrustumCulling(i, n), this.count !== 0 && (this.instanceIndex.update(this._renderer, this.count), this.bindTextures(t, o));
    }
    onBeforeRender(t, e, n, i, s, o) {
      if (this.patchMaterial(t, s), this.updateTextures(t, s), !this.instanceIndex) {
        this._renderer = t;
        return;
      }
      const a = t.info.render.frame;
      this.autoUpdate && !this.frustumCullingAlreadyPerformed(a, n, null) && this.performFrustumCulling(n), this.count !== 0 && (this.instanceIndex.update(this._renderer, this.count), this.bindTextures(t, s));
    }
    onAfterShadow(t, e, n, i, s, o, a) {
      this.unpatchMaterial(t, o);
    }
    onAfterRender(t, e, n, i, s, o) {
      this.unpatchMaterial(t, s), !(this.instanceIndex || o && !this.isLastGroup(o.materialIndex)) && this.initIndexAttribute();
    }
    updateTextures(t, e) {
      const n = t.properties.get(e);
      this.matricesTexture.update(t, n, "matricesTexture"), this.colorsTexture?.update(t, n, "colorsTexture"), this.uniformsTexture?.update(t, n, "uniformsTexture"), this.boneTexture?.update(t, n, "boneTexture");
    }
    bindTextures(t, e) {
      const n = t.properties.get(e), i = n.uniforms;
      if (!i)
        return;
      const s = n.currentProgram, o = s?.program;
      if (!o)
        return;
      const a = t.getContext(), c2 = s.getUniforms().map, h = a.getParameter(a.CURRENT_PROGRAM);
      t.state.useProgram(o), this.matricesTexture.bindToProgram(t, a, c2, i, "matricesTexture"), this.colorsTexture?.bindToProgram(t, a, c2, i, "colorsTexture"), this.uniformsTexture?.bindToProgram(t, a, c2, i, "uniformsTexture"), this.boneTexture?.bindToProgram(t, a, c2, i, "boneTexture"), t.state.useProgram(h);
    }
    isLastGroup(t) {
      const e = this.material;
      for (let n = e.length - 1;n >= t; n--)
        if (e[n].visible)
          return n === t;
    }
    initIndexAttribute() {
      if (!this._renderer) {
        this.count = 0;
        return;
      }
      const t = this._renderer.getContext(), e = this._capacity, n = new Uint32Array(e);
      for (let i = 0;i < e; i++)
        n[i] = i;
      this.instanceIndex = new ee(t, t.UNSIGNED_INT, 1, 4, n), this._geometry.setAttribute("instanceIndex", this.instanceIndex);
    }
    initLastRenderInfo() {
      this._parentLOD || (this._lastRenderInfo = { frame: -1, camera: null, shadowCamera: null });
    }
    initMatricesTexture() {
      this._parentLOD || (this.matricesTexture = new J(Float32Array, 4, 4, this._capacity));
    }
    initColorsTexture() {
      this._parentLOD || (this.colorsTexture = new J(Float32Array, 4, 1, this._capacity), this.colorsTexture.colorSpace = Z2.workingColorSpace, this.colorsTexture._data.fill(1), this.materialsNeedsUpdate());
    }
    materialsNeedsUpdate() {
      if (this.material.isMaterial) {
        this.material.needsUpdate = true;
        return;
      }
      for (const t of this.material)
        t.needsUpdate = true;
    }
    patchGeometry(t) {
      const e = t.getAttribute("instanceIndex");
      if (e) {
        if (e === this.instanceIndex)
          return;
        console.warn("The geometry has been cloned because it was already used."), t = t.clone(), t.deleteAttribute("instanceIndex");
      }
      this.instanceIndex && t.setAttribute("instanceIndex", this.instanceIndex);
    }
    patchMaterial(t, e) {
      this._currentMaterial = e, this._customProgramCacheKeyBase = e.customProgramCacheKey, this._onBeforeCompileBase = e.onBeforeCompile, this._definesBase = e.defines, e.customProgramCacheKey = this._customProgramCacheKey, e.onBeforeCompile = this._onBeforeCompile, se(this, t, e);
    }
    unpatchMaterial(t, e) {
      this._currentMaterial = null, re(t), e.defines = this._definesBase, e.onBeforeCompile = this._onBeforeCompileBase, e.customProgramCacheKey = this._customProgramCacheKeyBase, this._onBeforeCompileBase = null, this._customProgramCacheKeyBase = null, this._definesBase = null;
    }
    computeBVH(t = {}) {
      this.bvh || (this.bvh = new te(this, t.margin, t.getBBoxFromBSphere, t.accurateCulling)), this.bvh.clear(), this.bvh.create();
    }
    disposeBVH() {
      this.bvh = null;
    }
    setMatrixAt(t, e) {
      if (e.toArray(this.matricesTexture._data, t * 16), this.instances) {
        const n = this.instances[t];
        e.decompose(n.position, n.quaternion, n.scale);
      }
      this.matricesTexture.enqueueUpdate(t), this.bvh && this.autoUpdateBVH && this.bvh.move(t);
    }
    getMatrixAt(t, e = he) {
      return e.fromArray(this.matricesTexture._data, t * 16);
    }
    getPositionAt(t, e = ue) {
      const n = t * 16, i = this.matricesTexture._data;
      return e.x = i[n + 12], e.y = i[n + 13], e.z = i[n + 14], e;
    }
    getPositionAndMaxScaleOnAxisAt(t, e) {
      const n = t * 16, i = this.matricesTexture._data, s = i[n + 0], o = i[n + 1], a = i[n + 2], c2 = s * s + o * o + a * a, h = i[n + 4], u = i[n + 5], l = i[n + 6], d = h * h + u * u + l * l, p = i[n + 8], m2 = i[n + 9], x = i[n + 10], g2 = p * p + m2 * m2 + x * x;
      return e.x = i[n + 12], e.y = i[n + 13], e.z = i[n + 14], Math.sqrt(Math.max(c2, d, g2));
    }
    applyMatrixAtToSphere(t, e, n, i) {
      const s = t * 16, o = this.matricesTexture._data, a = o[s + 0], c2 = o[s + 1], h = o[s + 2], u = o[s + 3], l = o[s + 4], d = o[s + 5], p = o[s + 6], m2 = o[s + 7], x = o[s + 8], g2 = o[s + 9], y = o[s + 10], w2 = o[s + 11], I = o[s + 12], O2 = o[s + 13], L = o[s + 14], U2 = o[s + 15], C = e.center, A = n.x, b = n.y, v2 = n.z, B2 = 1 / (u * A + m2 * b + w2 * v2 + U2);
      C.x = (a * A + l * b + x * v2 + I) * B2, C.y = (c2 * A + d * b + g2 * v2 + O2) * B2, C.z = (h * A + p * b + y * v2 + L) * B2;
      const F = a * a + c2 * c2 + h * h, E2 = l * l + d * d + p * p, P = x * x + g2 * g2 + y * y;
      e.radius = i * Math.sqrt(Math.max(F, E2, P));
    }
    setVisibilityAt(t, e) {
      this.availabilityArray[t * 2] = e, this._indexArrayNeedsUpdate = true;
    }
    getVisibilityAt(t) {
      return this.availabilityArray[t * 2];
    }
    setActiveAt(t, e) {
      this.availabilityArray[t * 2 + 1] = e, this._indexArrayNeedsUpdate = true;
    }
    getActiveAt(t) {
      return this.availabilityArray[t * 2 + 1];
    }
    getActiveAndVisibilityAt(t) {
      const e = t * 2, n = this.availabilityArray;
      return n[e] && n[e + 1];
    }
    setActiveAndVisibilityAt(t, e) {
      const n = t * 2, i = this.availabilityArray;
      i[n] = e, i[n + 1] = e, this._indexArrayNeedsUpdate = true;
    }
    setColorAt(t, e) {
      this.colorsTexture === null && this.initColorsTexture(), e.isColor ? e.toArray(this.colorsTexture._data, t * 4) : It.set(e).toArray(this.colorsTexture._data, t * 4), this.colorsTexture.enqueueUpdate(t);
    }
    getColorAt(t, e = It) {
      return e.fromArray(this.colorsTexture._data, t * 4);
    }
    setOpacityAt(t, e) {
      this._useOpacity || (this.colorsTexture === null ? this.initColorsTexture() : this.materialsNeedsUpdate(), this._useOpacity = true), this.colorsTexture._data[t * 4 + 3] = e, this.colorsTexture.enqueueUpdate(t);
    }
    getOpacityAt(t) {
      return this._useOpacity ? this.colorsTexture._data[t * 4 + 3] : 1;
    }
    copyTo(t, e) {
      this.getMatrixAt(t, e.matrix).decompose(e.position, e.quaternion, e.scale);
    }
    computeBoundingBox() {
      const t = this._geometry, e = this._instancesArrayCount;
      this.boundingBox ??= new ot, t.boundingBox === null && t.computeBoundingBox();
      const n = t.boundingBox, i = this.boundingBox;
      i.makeEmpty();
      for (let s = 0;s < e; s++)
        this.getActiveAt(s) && (vt.copy(n).applyMatrix4(this.getMatrixAt(s)), i.union(vt));
    }
    computeBoundingSphere() {
      const t = this._geometry, e = this._instancesArrayCount;
      this.boundingSphere ??= new nt, t.boundingSphere === null && t.computeBoundingSphere();
      const n = t.boundingSphere, i = this.boundingSphere;
      i.makeEmpty();
      for (let s = 0;s < e; s++)
        this.getActiveAt(s) && (Tt.copy(n).applyMatrix4(this.getMatrixAt(s)), i.union(Tt));
    }
    clone(t) {
      const e = {
        capacity: this._capacity,
        renderer: this._renderer,
        allowsEuler: this._allowsEuler,
        createEntities: this._createEntities
      };
      return new this.constructor(this.geometry, this.material, e).copy(this, t);
    }
    copy(t, e) {
      return super.copy(t, e), this.count = t._capacity, this._instancesCount = t._instancesCount, this._instancesArrayCount = t._instancesArrayCount, this._capacity = t._capacity, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this.matricesTexture = t.matricesTexture.clone(), this.matricesTexture.image.data = this.matricesTexture.image.data.slice(), t.colorsTexture !== null && (this.colorsTexture = t.colorsTexture.clone(), this.colorsTexture.image.data = this.colorsTexture.image.data.slice()), t.uniformsTexture !== null && (this.uniformsTexture = t.uniformsTexture.clone(), this.uniformsTexture.image.data = this.uniformsTexture.image.data.slice()), t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone(), this.morphTexture.image.data = this.morphTexture.image.data.slice()), t.boneTexture !== null && (this.boneTexture = t.boneTexture.clone(), this.boneTexture.image.data = this.boneTexture.image.data.slice()), this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" }), this.matricesTexture.dispose(), this.colorsTexture?.dispose(), this.morphTexture?.dispose(), this.boneTexture?.dispose(), this.uniformsTexture?.dispose();
    }
    updateMatrixWorld(t) {
      super.updateMatrixWorld(t), this.bindMatrixInverse && (this.bindMode === dt ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === kt ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("Unrecognized bindMode: " + this.bindMode));
    }
  };
  vt = new ot;
  Tt = new nt;
  he = new z;
  It = new Vt;
  ue = new T;
  f.prototype.resizeBuffers = function(r) {
    const t = this._capacity;
    this._capacity = r;
    const e = Math.min(r, t);
    if (this.instanceIndex) {
      const n = new Uint32Array(r);
      n.set(new Uint32Array(this.instanceIndex.array.buffer, 0, e)), this.instanceIndex.array = n;
    }
    if (this.LODinfo) {
      for (const n of this.LODinfo.objects)
        if (n._capacity = r, n.instanceIndex) {
          const i = new Uint32Array(r);
          i.set(new Uint32Array(n.instanceIndex.array.buffer, 0, e)), n.instanceIndex.array = i;
        }
    }
    if (this.availabilityArray.length = r * 2, this.matricesTexture.resize(r), this.colorsTexture && (this.colorsTexture.resize(r), r > t && this.colorsTexture._data.fill(1, t * 4)), this.morphTexture) {
      const n = this.morphTexture.image.data, i = n.length / t;
      this.morphTexture.dispose(), this.morphTexture = new at(new Float32Array(i * r), i, r, ht, ct), this.morphTexture.image.data.set(n);
    }
    return this.uniformsTexture?.resize(r), this;
  };
  f.prototype.setInstancesArrayCount = function(r) {
    if (r < this._instancesArrayCount) {
      const e = this.bvh;
      if (e)
        for (let n = this._instancesArrayCount - 1;n >= r; n--)
          this.getActiveAt(n) && e.delete(n);
      this._instancesArrayCount = r;
      return;
    }
    if (r > this._capacity) {
      let e = this._capacity + (this._capacity >> 1) + 512;
      for (;e < r; )
        e += (e >> 1) + 512;
      this.resizeBuffers(e);
    }
    const t = this._instancesArrayCount;
    this._instancesArrayCount = r, this._createEntities && this.createEntities(t);
  };
  tt = new Kt;
  M = new le;
  D2 = new z;
  R = new z;
  st = new T;
  j = new T;
  N = new T;
  fe = new T;
  S2 = new nt;
  f.prototype.performFrustumCulling = function(r, t = r) {
    const e = this._parentLOD ?? this, n = e.LODinfo;
    let i;
    if (n) {
      i = r !== t ? n.shadowRender ?? n.render : n.render;
      for (const o of n.objects)
        o.count = 0;
    } else
      (e._perObjectFrustumCulled || e._sortObjects) && (e.count = 0);
    e._instancesArrayCount !== 0 && (i?.levels.length > 0 ? e.frustumCullingLOD(i, r, t) : e.frustumCulling(r));
  };
  f.prototype.updateLastRenderInfo = function(r, t, e) {
    const n = this._lastRenderInfo;
    n.frame = r, n.camera = t, n.shadowCamera = e;
  };
  f.prototype.frustumCullingAlreadyPerformed = function(r, t, e) {
    const n = this._lastRenderInfo;
    return n.frame === r && n.camera === t && n.shadowCamera === e ? true : (this.updateLastRenderInfo(r, t, e), false);
  };
  f.prototype.frustumCulling = function(r) {
    const t = this._sortObjects, e = this._perObjectFrustumCulled, n = this.instanceIndex.array;
    if (this.instanceIndex._needsUpdate = true, !e && !t) {
      this.updateIndexArray();
      return;
    }
    if (t && (R.copy(this.matrixWorld).invert(), j.setFromMatrixPosition(r.matrixWorld).applyMatrix4(R), st.set(0, 0, -1).transformDirection(r.matrixWorld).transformDirection(R)), e ? (D2.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse).multiply(this.matrixWorld), this.bvh ? this.BVHCulling(r) : this.linearCulling(r)) : this.updateRenderList(), t) {
      const i = this.customSort;
      i === null ? M.array.sort(this.material?.transparent ? Dt : Bt) : i(M.array);
      const s = M.array, o = s.length;
      for (let a = 0;a < o; a++)
        n[a] = s[a].index;
      this.count = o, M.reset();
    }
  };
  f.prototype.updateIndexArray = function() {
    if (!this._indexArrayNeedsUpdate)
      return;
    const r = this.instanceIndex.array, t = this._instancesArrayCount;
    let e = 0;
    for (let n = 0;n < t; n++)
      this.getActiveAndVisibilityAt(n) && (r[e++] = n);
    this.count = e, this._indexArrayNeedsUpdate = false;
  };
  f.prototype.updateRenderList = function() {
    const r = this._instancesArrayCount;
    for (let t = 0;t < r; t++)
      if (this.getActiveAndVisibilityAt(t)) {
        const e = this.getPositionAt(t).sub(j).dot(st);
        M.push(e, t);
      }
  };
  f.prototype.BVHCulling = function(r) {
    const t = this.instanceIndex.array, e = this._instancesArrayCount, n = this._sortObjects, i = this.onFrustumEnter;
    let s = 0;
    this.bvh.frustumCulling(D2, (o) => {
      const a = o.object;
      if (a < e && this.getVisibilityAt(a) && (!i || i(a, r)))
        if (n) {
          const c2 = this.getPositionAt(a).sub(j).dot(st);
          M.push(c2, a);
        } else
          t[s++] = a;
    }), this.count = s;
  };
  f.prototype.linearCulling = function(r) {
    const t = this.instanceIndex.array;
    this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
    const e = this._geometry.boundingSphere, n = e.radius, i = e.center, s = this._instancesArrayCount, o = i.x === 0 && i.y === 0 && i.z === 0, a = this._sortObjects, c2 = this.onFrustumEnter;
    let h = 0;
    tt.setFromProjectionMatrix(D2);
    for (let u = 0;u < s; u++)
      if (this.getActiveAndVisibilityAt(u)) {
        if (o) {
          const l = this.getPositionAndMaxScaleOnAxisAt(u, S2.center);
          S2.radius = n * l;
        } else
          this.applyMatrixAtToSphere(u, S2, i, n);
        if (tt.intersectsSphere(S2) && (!c2 || c2(u, r)))
          if (a) {
            const l = fe.subVectors(S2.center, j).dot(st);
            M.push(l, u);
          } else
            t[h++] = u;
      }
    this.count = h;
  };
  f.prototype.frustumCullingLOD = function(r, t, e) {
    const { count: n, levels: i } = r;
    for (let c2 = 0;c2 < i.length; c2++) {
      if (!i[c2].object.instanceIndex)
        return;
      n[c2] = 0, i[c2].object.instanceIndex._needsUpdate = true;
    }
    const o = !(t !== e) && this._sortObjects;
    D2.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse).multiply(this.matrixWorld), R.copy(this.matrixWorld).invert(), j.setFromMatrixPosition(t.matrixWorld).applyMatrix4(R), N.setFromMatrixPosition(e.matrixWorld).applyMatrix4(R);
    const a = r.levels.map((c2) => c2.object.instanceIndex.array);
    if (this.bvh ? this.BVHCullingLOD(r, a, o, t, e) : this.linearCullingLOD(r, a, o, t, e), o) {
      const c2 = this.customSort, h = M.array;
      let u = 0, l = i[1].distance;
      c2 === null ? h.sort(i[0].object.material?.transparent ? Dt : Bt) : c2(h);
      for (let d = 0, p = h.length;d < p; d++) {
        const m2 = h[d];
        m2.depth > l && (u++, l = i[u + 1]?.distance ?? 1 / 0), a[u][n[u]++] = m2.index;
      }
      M.reset();
    }
    for (let c2 = 0;c2 < i.length; c2++) {
      const h = i[c2].object;
      h.count = n[c2];
    }
  };
  f.prototype.BVHCullingLOD = function(r, t, e, n, i) {
    const { count: s, levels: o } = r, a = this._instancesArrayCount, c2 = this.onFrustumEnter;
    e ? this.bvh.frustumCulling(D2, (h) => {
      const u = h.object;
      if (u < a && this.getVisibilityAt(u) && (!c2 || c2(u, n, i))) {
        const l = this.getPositionAt(u).distanceToSquared(N);
        M.push(l, u);
      }
    }) : this.bvh.frustumCullingLOD(D2, N, o, (h, u) => {
      const l = h.object;
      if (l < a && this.getVisibilityAt(l)) {
        if (u === null) {
          const d = this.getPositionAt(l).distanceToSquared(N);
          u = this.getObjectLODIndexForDistance(o, d);
        }
        (!c2 || c2(l, n, i, u)) && (t[u][s[u]++] = l);
      }
    });
  };
  f.prototype.linearCullingLOD = function(r, t, e, n, i) {
    const { count: s, levels: o } = r;
    this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
    const a = this._geometry.boundingSphere, c2 = a.radius, h = a.center, u = this._instancesArrayCount, l = h.x === 0 && h.y === 0 && h.z === 0, d = this.onFrustumEnter;
    tt.setFromProjectionMatrix(D2);
    for (let p = 0;p < u; p++)
      if (this.getActiveAndVisibilityAt(p)) {
        if (l) {
          const m2 = this.getPositionAndMaxScaleOnAxisAt(p, S2.center);
          S2.radius = c2 * m2;
        } else
          this.applyMatrixAtToSphere(p, S2, h, c2);
        if (tt.intersectsSphere(S2))
          if (e) {
            if (!d || d(p, n, i)) {
              const m2 = S2.center.distanceToSquared(N);
              M.push(m2, p);
            }
          } else {
            const m2 = S2.center.distanceToSquared(N), x = this.getObjectLODIndexForDistance(o, m2);
            (!d || d(p, n, i, x)) && (t[x][s[x]++] = p);
          }
      }
  };
  f.prototype.clearTempInstance = function(r) {
    const t = this._tempInstance;
    return t.id = r, this.clearInstance(t);
  };
  f.prototype.clearTempInstancePosition = function(r) {
    const t = this._tempInstance;
    return t.id = r, t.position.set(0, 0, 0), t;
  };
  f.prototype.clearInstance = function(r) {
    return r.position.set(0, 0, 0), r.scale.set(1, 1, 1), r.quaternion.identity(), r;
  };
  f.prototype.updateInstances = function(r) {
    const t = this._instancesArrayCount, e = this.instances;
    for (let n = 0;n < t; n++) {
      if (!this.getActiveAt(n))
        continue;
      const i = e ? e[n] : this.clearTempInstance(n);
      r(i, n), i.updateMatrix();
    }
    return this;
  };
  f.prototype.updateInstancesPosition = function(r) {
    const t = this._instancesArrayCount, e = this.instances;
    for (let n = 0;n < t; n++) {
      if (!this.getActiveAt(n))
        continue;
      const i = e ? e[n] : this.clearTempInstancePosition(n);
      r(i, n), i.updateMatrixPosition();
    }
    return this;
  };
  f.prototype.createEntities = function(r) {
    const t = this._instancesArrayCount;
    if (!this.instances)
      this.instances = new Array(t);
    else if (this.instances.length < t)
      this.instances.length = t;
    else
      return this;
    const e = this.instances;
    for (let n = r;n < t; n++)
      e[n] || (e[n] = new Lt(this, n, this._allowsEuler));
    return this;
  };
  f.prototype.addInstances = function(r, t) {
    !t && this.bvh && console.warn("InstancedMesh2: if `computeBVH()` has already been called, it is better to valorize the instances in the `onCreation` callback for better performance.");
    const e = this._freeIds;
    if (e.length > 0) {
      let s = -1;
      const o = Math.min(e.length, r), a = e.length - o;
      for (let c2 = e.length - 1;c2 >= a; c2--) {
        const h = e[c2];
        h > s && (s = h), this.addInstance(h, t);
      }
      e.length -= o, r -= o, this._instancesArrayCount = Math.max(s + 1, this._instancesArrayCount);
    }
    const n = this._instancesArrayCount, i = n + r;
    this.setInstancesArrayCount(i);
    for (let s = n;s < i; s++)
      this.addInstance(s, t);
    return this;
  };
  f.prototype.addInstance = function(r, t) {
    this._instancesCount++, this.setActiveAndVisibilityAt(r, true);
    const e = this.instances ? this.clearInstance(this.instances[r]) : this.clearTempInstance(r);
    t ? (t(e, r), e.updateMatrix()) : e.setMatrixIdentity(), this.bvh?.insert(r);
  };
  f.prototype.removeInstances = function(...r) {
    const t = this._freeIds, e = this.bvh;
    for (const n of r)
      n < this._instancesArrayCount && this.getActiveAt(n) && (this.setActiveAt(n, false), t.push(n), e?.delete(n), this._instancesCount--);
    for (let n = this._instancesArrayCount - 1;n >= 0 && !this.getActiveAt(n); n--)
      this._instancesArrayCount--;
    return this;
  };
  f.prototype.clearInstances = function() {
    if (this._instancesCount = 0, this._instancesArrayCount = 0, this._freeIds.length = 0, this.bvh?.clear(), this.LODinfo)
      for (const r of this.LODinfo.objects)
        r.count = 0;
    return this;
  };
  f.prototype.getObjectLODIndexForDistance = function(r, t) {
    for (let e = r.length - 1;e > 0; e--) {
      const n = r[e], i = n.distance - n.distance * n.hysteresis;
      if (t >= i)
        return e;
    }
    return 0;
  };
  f.prototype.setFirstLODDistance = function(r) {
    if (this._parentLOD)
      throw new Error("Cannot create LOD for this InstancedMesh2.");
    return this.LODinfo || (this.LODinfo = { render: null, shadowRender: null, objects: [this] }), this.LODinfo.render || (this.LODinfo.render = {
      levels: [{ distance: r, hysteresis: 0, object: this }],
      count: [0]
    }), this;
  };
  f.prototype.addLOD = function(r, t, e = 0, n = 0) {
    if (this._parentLOD)
      throw new Error("Cannot create LOD for this InstancedMesh2.");
    if (!this.LODinfo?.render && e === 0)
      throw new Error('Cannot set distance to 0 for the first LOD. Call "setFirstLODDistance" method before use "addLOD".');
    return this.setFirstLODDistance(0), this.addLevel(this.LODinfo.render, r, t, e, n), this;
  };
  f.prototype.addShadowLOD = function(r, t = 0, e = 0) {
    if (this._parentLOD)
      throw new Error("Cannot create LOD for this InstancedMesh2.");
    this.LODinfo || (this.LODinfo = { render: null, shadowRender: null, objects: [this] }), this.LODinfo.shadowRender || (this.LODinfo.shadowRender = { levels: [], count: [] });
    const n = this.addLevel(this.LODinfo.shadowRender, r, null, t, e);
    return n.castShadow = true, this.castShadow = true, this;
  };
  f.prototype.addLevel = function(r, t, e, n, i) {
    const s = this.LODinfo.objects, o = r.levels;
    let a, c2;
    n = n ** 2;
    const h = s.findIndex((u) => u.geometry === t);
    if (h === -1) {
      const u = { capacity: this._capacity, renderer: this._renderer };
      c2 = new f(t, e ?? new Yt, u, this), c2.frustumCulled = false, this.patchLevel(c2), s.push(c2), this.add(c2);
    } else
      c2 = s[h], e && (c2.material = e);
    for (a = 0;a < o.length && !(n < o[a].distance); a++)
      ;
    return o.splice(a, 0, { distance: n, hysteresis: i, object: c2 }), r.count.push(0), c2;
  };
  f.prototype.updateLevel = function(r, t, e, n) {
    if (!r)
      throw new Error("Render list is invalid.");
    const i = r.levels[t];
    if (!i)
      throw new Error("Cannot update an empty LOD.");
    if (e != null && !Number.isNaN(e)) {
      const s = e ** 2;
      i.distance = s;
    }
    return n != null && !Number.isNaN(n) && (i.hysteresis = n), this;
  };
  f.prototype.updateLOD = function(r, t, e) {
    const n = this?.LODinfo?.render;
    if (r === 0)
      throw new Error("Cannot change distance for LOD0. It is the main mesh and must stay at 0.");
    return this.updateLevel(n, r, t, e);
  };
  f.prototype.updateShadowLOD = function(r, t, e) {
    return this.updateLevel(this.LODinfo?.shadowRender, r, t, e);
  };
  f.prototype.updateAllLevels = function(r, t, e) {
    if (!r?.levels)
      throw new Error("Invalid LOD list.");
    const n = r.levels, i = this.LODinfo?.render === r, s = i ? 1 : 0;
    i && (n[0].distance = 0);
    const o = t?.length > 0;
    let a = [];
    o && (a = i && t[0] === 0 ? t.slice(1, Math.min(n.length, t.length)) : t.slice(0, Math.min(n.length - s, t.length)), a.every((h, u) => {
      if (u > 0 && h <= a[u - 1])
        throw new Error(`LOD distances must be strictly increasing: d[${u - 1}]=${a[u - 1]} < d[${u}]=${h}`);
      return true;
    }));
    const c2 = o ? a.length : n.length - s;
    for (let h = 0;h < c2; h++) {
      const u = o ? a[h] : undefined, l = Array.isArray(e) ? e[h] : e;
      this.updateLevel(r, s + h, u, l);
    }
    return this;
  };
  f.prototype.updateAllLOD = function(r, t) {
    return this.updateAllLevels(this.LODinfo?.render, r, t);
  };
  f.prototype.updateAllShadowLOD = function(r, t) {
    return this.updateAllLevels(this.LODinfo?.shadowRender, r, t);
  };
  f.prototype.disposeLOD = function(r) {
    r.geometry.dispose();
    const t = r.material;
    if (Array.isArray(t))
      for (const e of t)
        e.dispose();
    else
      t.dispose();
  };
  f.prototype.removeLOD = function(r, t = true) {
    const e = this.LODinfo, n = e?.render;
    if (!n?.levels)
      throw new Error("Invalid LOD list.");
    const i = n.levels.length;
    if (r < 0 || r >= i)
      throw new Error("Level index OOB");
    if (i > 1 && r === 0)
      throw new Error("Cannot remove LOD0 while others exist");
    const [s] = n.levels.splice(r, 1);
    n.count?.splice?.(r, 1), n.levels.length <= 1 && (e.render = null);
    const o = s.object, a = this.LODinfo?.shadowRender;
    if (a?.levels && r < a.levels.length && (a.levels.splice(r, 1), a.count?.splice?.(r, 1), a.levels.length === 0 && (this.LODinfo.shadowRender = null)), t && o !== this)
      try {
        this.remove(o);
        const c2 = e.objects?.indexOf(o) ?? -1;
        c2 !== -1 && e.objects.splice(c2, 1), this.disposeLOD(o);
      } catch (c2) {
        console.error(c2);
      }
    return this;
  };
  f.prototype.patchLevel = function(r) {
    Object.defineProperty(r, "renderOrder", {
      get() {
        return this._parentLOD.renderOrder;
      }
    }), Object.defineProperty(r, "_lastRenderInfo", {
      get() {
        return this._parentLOD._lastRenderInfo;
      }
    }), Object.defineProperty(r, "matricesTexture", {
      get() {
        return this._parentLOD.matricesTexture;
      }
    }), Object.defineProperty(r, "colorsTexture", {
      get() {
        return this._parentLOD.colorsTexture;
      }
    }), Object.defineProperty(r, "uniformsTexture", {
      get() {
        return this._parentLOD.uniformsTexture;
      }
    }), Object.defineProperty(r, "morphTexture", {
      get() {
        return this._parentLOD.morphTexture;
      }
    }), Object.defineProperty(r, "boneTexture", {
      get() {
        return this._parentLOD.boneTexture;
      }
    }), Object.defineProperty(r, "skeleton", {
      get() {
        return this._parentLOD.skeleton;
      }
    }), Object.defineProperty(r, "bindMatrixInverse", {
      get() {
        return this._parentLOD.bindMatrixInverse;
      }
    }), Object.defineProperty(r, "bindMatrix", {
      get() {
        return this._parentLOD.bindMatrix;
      }
    });
  };
  de = new ut;
  f.prototype.getMorphAt = function(r, t = de) {
    const e = t.morphTargetInfluences, n = this.morphTexture.source.data.data, i = e.length + 1, s = r * i + 1;
    for (let o = 0;o < e.length; o++)
      e[o] = n[s + o];
    return t;
  };
  f.prototype.setMorphAt = function(r, t) {
    const e = t.morphTargetInfluences, n = e.length + 1;
    this.morphTexture === null && !this._parentLOD && (this.morphTexture = new at(new Float32Array(n * this._capacity), n, this._capacity, ht, ct));
    const i = this.morphTexture.source.data.data;
    let s = 0;
    for (const c2 of e)
      s += c2;
    const o = this._geometry.morphTargetsRelative ? 1 : 1 - s, a = n * r;
    i[a] = o, i.set(e, a + 1), this.morphTexture.needsUpdate = true;
  };
  rt = [];
  et = new ut;
  pe = new Ht;
  wt = new T;
  Ct = new T;
  St = new z;
  Mt = new nt;
  f.prototype.raycast = function(r, t) {
    if (this._parentLOD || !this.material || this._instancesArrayCount === 0 || !this.instanceIndex)
      return;
    et.geometry = this._geometry, et.material = this.material;
    const { ray: e, near: n, far: i } = r;
    St.copy(this.matrixWorld).invert(), Ct.setFromMatrixScale(this.matrixWorld), wt.copy(r.ray.direction).multiply(Ct);
    const s = wt.length();
    r.ray = pe.copy(r.ray).applyMatrix4(St), r.near /= s, r.far /= s, this.raycastInstances(r, t), r.ray = e, r.near = n, r.far = i;
  };
  f.prototype.raycastInstances = function(r, t) {
    if (this.bvh)
      this.bvh.raycast(r, (e) => this.checkObjectIntersection(r, e, t));
    else {
      if (this.boundingSphere === null && this.computeBoundingSphere(), Mt.copy(this.boundingSphere), !r.ray.intersectsSphere(Mt))
        return;
      const e = this.instanceIndex.array, i = this.raycastOnlyFrustum && this._perObjectFrustumCulled ? this.count : this._instancesArrayCount;
      for (let s = 0;s < i; s++)
        this.checkObjectIntersection(r, e[s], t);
    }
  };
  f.prototype.checkObjectIntersection = function(r, t, e) {
    if (!(t > this._instancesArrayCount || !this.getActiveAndVisibilityAt(t))) {
      this.getMatrixAt(t, et.matrixWorld), et.raycast(r, rt);
      for (const n of rt)
        n.instanceId = t, n.object = this, e.push(n);
      rt.length = 0;
    }
  };
  f.prototype.initSkeleton = function(r, t = true) {
    if (r && this.skeleton !== r && !this._parentLOD) {
      const e = r.bones;
      if (this.skeleton = r, this.bindMatrix = new z, this.bindMatrixInverse = new z, this.boneTexture = new J(Float32Array, 4, 4 * e.length, this._capacity), t)
        for (const n of e)
          n.matrixAutoUpdate = false, n.matrixWorldAutoUpdate = false;
      this.materialsNeedsUpdate();
    }
  };
  f.prototype.setBonesAt = function(r, t = true, e) {
    const n = this.skeleton;
    if (!n)
      throw new Error('"setBonesAt" cannot be called before "initSkeleton"');
    const { bones: i, boneInverses: s } = n;
    for (let o = 0, a = i.length;o < a; o++) {
      const c2 = i[o];
      t && (e?.has(c2.name) || c2.updateMatrix(), c2.matrixWorld.multiplyMatrices(c2.parent.matrixWorld, c2.matrix)), this.multiplyBoneMatricesAt(r, o, c2.matrixWorld, s[o]);
    }
    this.boneTexture.enqueueUpdate(r);
  };
  f.prototype.multiplyBoneMatricesAt = function(r, t, e, n) {
    const i = (r * this.skeleton.bones.length + t) * 16, s = e.elements, o = n.elements, a = this.boneTexture._data, c2 = s[0], h = s[4], u = s[8], l = s[12], d = s[1], p = s[5], m2 = s[9], x = s[13], g2 = s[2], y = s[6], w2 = s[10], I = s[14], O2 = s[3], L = s[7], U2 = s[11], C = s[15], A = o[0], b = o[4], v2 = o[8], B2 = o[12], F = o[1], E2 = o[5], P = o[9], $2 = o[13], G2 = o[2], q2 = o[6], V2 = o[10], W2 = o[14], k2 = o[3], K = o[7], Y2 = o[11], H2 = o[15];
    a[i + 0] = c2 * A + h * F + u * G2 + l * k2, a[i + 4] = c2 * b + h * E2 + u * q2 + l * K, a[i + 8] = c2 * v2 + h * P + u * V2 + l * Y2, a[i + 12] = c2 * B2 + h * $2 + u * W2 + l * H2, a[i + 1] = d * A + p * F + m2 * G2 + x * k2, a[i + 5] = d * b + p * E2 + m2 * q2 + x * K, a[i + 9] = d * v2 + p * P + m2 * V2 + x * Y2, a[i + 13] = d * B2 + p * $2 + m2 * W2 + x * H2, a[i + 2] = g2 * A + y * F + w2 * G2 + I * k2, a[i + 6] = g2 * b + y * E2 + w2 * q2 + I * K, a[i + 10] = g2 * v2 + y * P + w2 * V2 + I * Y2, a[i + 14] = g2 * B2 + y * $2 + w2 * W2 + I * H2, a[i + 3] = O2 * A + L * F + U2 * G2 + C * k2, a[i + 7] = O2 * b + L * E2 + U2 * q2 + C * K, a[i + 11] = O2 * v2 + L * P + U2 * V2 + C * Y2, a[i + 15] = O2 * B2 + L * $2 + U2 * W2 + C * H2;
  };
  f.prototype.getUniformAt = function(r, t, e) {
    if (!this.uniformsTexture)
      throw new Error(`Before get/set uniform, it's necessary to use "initUniformsPerInstance".`);
    return this.uniformsTexture.getUniformAt(r, t, e);
  };
  f.prototype.setUniformAt = function(r, t, e) {
    if (!this.uniformsTexture)
      throw new Error(`Before get/set uniform, it's necessary to use "initUniformsPerInstance".`);
    this.uniformsTexture.setUniformAt(r, t, e), this.uniformsTexture.enqueueUpdate(r);
  };
  f.prototype.initUniformsPerInstance = function(r) {
    if (!this._parentLOD) {
      const { channels: t, pixelsPerInstance: e, uniformMap: n, fetchInFragmentShader: i } = this.getUniformSchemaResult(r);
      this.uniformsTexture = new J(Float32Array, t, e, this._capacity, n, i), this.materialsNeedsUpdate();
    }
  };
  f.prototype.getUniformSchemaResult = function(r) {
    let t = 0;
    const e = /* @__PURE__ */ new Map, n = [], i = r.vertex ?? {}, s = r.fragment ?? {};
    let o = true;
    for (const u in i) {
      const l = i[u], d = this.getUniformSize(l);
      t += d, n.push({ name: u, type: l, size: d }), o = false;
    }
    for (const u in s)
      if (!i[u]) {
        const l = s[u], d = this.getUniformSize(l);
        t += d, n.push({ name: u, type: l, size: d });
      }
    n.sort((u, l) => l.size - u.size);
    const a = [];
    for (const { name: u, size: l, type: d } of n) {
      const p = this.getUniformOffset(l, a);
      e.set(u, { offset: p, size: l, type: d });
    }
    const c2 = Math.ceil(t / 4);
    return { channels: Math.min(t, 4), pixelsPerInstance: c2, uniformMap: e, fetchInFragmentShader: o };
  };
  f.prototype.getUniformOffset = function(r, t) {
    if (r < 4) {
      for (let n = 0;n < t.length; n++)
        if (t[n] + r <= 4) {
          const i = n * 4 + t[n];
          return t[n] += r, i;
        }
    }
    const e = t.length * 4;
    for (;r > 0; r -= 4)
      t.push(r);
    return e;
  };
  f.prototype.getUniformSize = function(r) {
    switch (r) {
      case "float":
        return 1;
      case "vec2":
        return 2;
      case "vec3":
        return 3;
      case "vec4":
        return 4;
      case "mat3":
        return 9;
      case "mat4":
        return 16;
      default:
        throw new Error(`Invalid uniform type: ${r}`);
    }
  };
  _2.instanced_pars_vertex = me;
  _2.instanced_color_pars_vertex = xe;
  _2.instanced_vertex = _e;
  _2.instanced_color_vertex = ge;
  _2.project_vertex = lt(_2.project_vertex);
  _2.worldpos_vertex = lt(_2.worldpos_vertex);
  _2.defaultnormal_vertex = lt(_2.defaultnormal_vertex);
  _2.batching_pars_vertex = _2.batching_pars_vertex.concat(`
#include <instanced_pars_vertex>`);
  _2.color_pars_vertex = _2.color_pars_vertex.concat(`
#include <instanced_color_pars_vertex>`);
  _2.batching_vertex = _2.batching_vertex.concat(`
#include <instanced_vertex>`);
  _2.skinning_pars_vertex = ye;
  _2.morphinstance_vertex && (_2.morphinstance_vertex = _2.morphinstance_vertex.replaceAll("gl_InstanceID", "instanceIndex"));
});

// node_modules/.bun/three@0.186.1/node_modules/three/examples/jsm/libs/meshopt_simplifier.module.js
var exports_meshopt_simplifier_module = {};
__export(exports_meshopt_simplifier_module, {
  MeshoptSimplifier: () => MeshoptSimplifier
});
var MeshoptSimplifier;
var init_meshopt_simplifier_module = __esm(() => {
  MeshoptSimplifier = function() {
    var wasm = "b9H79Tebbbe:6eO9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gouuuuuue999Gvuuuuueu9Gzuuuuuuuuuuu99uuuub9Gquuuuuuu99uueu9GPuuuuuuuuuuu99uueu9Gquuuuuuuu99ueu9Gruuuuuu99eu9Gwuuuuuu99ueu9Giuuue999Gluuuueu9Gluuuub9GiuuueuiLQdilvorlwDiqkxmPszbHHbelve9Weiiviebeoweuecj:Gdkr:Bdxo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95bw8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bD8A9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9O9v9W9K9HtWbqQ9TW79O9V9Wt9F79P9T9W29P9M959t29V9W9W95bkX9TW79O9V9Wt9F79P9T9W29P9M959qV919UWbxQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bmX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2WbPa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9Wbs59TW79O9V9Wt9F9NW9UWV9HtW9q9V79Pt9P9V9U9sW9T9H9Wbzl79IV9RbHDwebcekdCXq;y;WeQdbk;r:herYue99iuY99Xue9:D998Jjjjjbcj;sb9Rgs8Kjjjjbcbhzasc:Cefcbc;Kbz:tjjjb8AdnabaeSmbabaeadcdtzMjjjb8AkdnamcdGTmbalcrfci4cbyd1:H:cjbHjjjjbbhHasc:Cefasyd;8egecdtfaHBdbasaecefBd;8ecbhlcbhednadTmbabheadhOinaHaeydbci4fcb86bbaeclfheaOcufgOmbkcbhlabheadhOinaHaeydbgAci4fgCaCRbbgCceaAcrGgAtV86bbaCcu7aA4ceGalfhlaeclfheaOcufgOmbkcualcdtalcFFFFi0Ehekaecbyd1:H:cjbHjjjjbbhzasc:Cefasyd;8egecdtfazBdbasaecefBd;8ealcd4alfhOcehHinaHgecethHaeaO6mbkcbhXcuaecdtgOaecFFFFi0Ecbyd1:H:cjbHjjjjbbhHasc:Cefasyd;8egAcdtfaHBdbasaAcefBd;8eaHcFeaOz:tjjjbhQdnadTmbaecufhLcbhKindndnaQabaKcdtfgYydbgAc:v;t;h;Ev2aLGgOcdtfgCydbgHcuSmbceheinazaHcdtfydbaASmdaOaefhHaecefheaQaHaLGgOcdtfgCydbgHcu9hmbkkazaXcdtfaABdbaCaXBdbaXhHaXcefhXkaYaHBdbaKcefgKad9hmbkkaQcbyd:m:H:cjbH:bjjjbbasasyd;8ecufBd;8ekcbh8AcualcefgecdtaecFFFFi0Ecbyd1:H:cjbHjjjjbbhLasc:Cefasyd;8egecdtfaLBdbasaLBdNeasaecefBd;8ecuadcitadcFFFFe0Ecbyd1:H:cjbHjjjjbbhEasc:Cefasyd;8egecdtfaEBdbasaEBd:yeasaecefBd;8eascNefabadalcbz:cjjjbcualcdtgealcFFFFi0Eg3cbyd1:H:cjbHjjjjbbhOasc:Cefasyd;8egHcdtfaOBdbasaHcefBd;8ea3cbyd1:H:cjbHjjjjbbhQasc:Cefasyd;8egHcdtfaQBdbasaHcefBd;8eaOaQaialavazasc:Cefz:djjjbalcbyd1:H:cjbHjjjjbbhYasc:Cefasyd;8egHcdtfaYBdbasaHcefBd;8ea3cbyd1:H:cjbHjjjjbbhHasc:Cefasyd;8egAcdtfaHBdbasaAcefBd;8ea3cbyd1:H:cjbHjjjjbbhAasc:Cefasyd;8egCcdtfaABdbasaCcefBd;8eaHcFeaez:tjjjbh5aAcFeaez:tjjjbh8EdnalTmbindnaLa8AgAcefg8AcdtfydbgCaLaAcdtgefydbgHSmbaCaH9Rh8FaEaHcitfhaa8Eaefhha5aefhKcbhCindndnaaaCcitfydbgXaA9hmbaKaABdbahaABdbxekdnaLaXcdtggfgeclfydbgHaeydbgeSmbaHae9RhHaEaecitfheinaeydbaASmdaecwfheaHcufgHmbkka8EagfgeaAaXaeydbcuSEBdbaKaXaAaKydbcuSEBdbkaCcefgCa8F9hmbkka8Aal9hmbkaOhHaQhAa5hXa8EhCcbheindndnaeaHydbgK9hmbdnaeaAydbgK9hmbaXydbhKdnaCydbg8Fcu9hmbaKcu9hmbaYaefcb86bbxikdna8FcuSmbaKcuSmbaea8FSmbaOa8FcdtfydbaOaKcdtfydb9hmbaYaefcd86bbxikaYaefhadnaea8FSmbaeaKSmbaace86bbxikaacl86bbxdkdnaeaQaKcdtg8Ffydb9hmbdnaCydbgacuSmbaeaaSmbaXydbggcuSmbaeagSmba8Ea8FfydbghcuSmbahaKSmba5a8Ffydbg8FcuSmba8FaKSmbdnaOaacdtfydbgKaOa8Fcdtfydb9hmbaKaOagcdtfydbg8FSmba8FaOahcdtfydb9hmbaYaefcd86bbxlkaYaefcl86bbxikaYaefcl86bbxdkaYaefcl86bbxekaYaefaYaKfRbb86bbkaHclfhHaAclfhAaXclfhXaCclfhCalaecefge9hmbkdnamcaGTmbcbh8JindndnaYa8Jfg8KRbbg8Lc9:fPibebekdndndnaOa8Jcdtfydbgea8J9hmbdnaqmbcbh8FxdkdnazTmbcbh8Fa8JheinaqazaecdtgefydbfRbbce4a8FVceGh8FaQaefydbgea8J9hmbxikkcbh8Fa8JheinaqaefRbbce4a8FVceGh8FaQaecdtfydbgea8J9hmbxdkkaYaefRbbhexeka8JheindnaLaecdtg8AfgeclfydbgHaeydbgeSmbaHae9RhgaEaecitfhhaOa8AfhacbhKinahaKcitfydbgXhednindnaLaecdtgCfgeclfydbgHaeydbgeSmbaHae9RhHaEaecitfheaaydbhAdninaOaeydbcdtfydbaASmeaecwfheaHcufgHTmdxbkkcbhexdkaQaCfydbgeaX9hmbkceheka8FaeVh8FaKcefgKag9hmbkkaQa8Afydbgea8J9hmbka8Lcia8FceGEheka8Kae86bbka8Jcefg8Jal9hmbkkdnaqTmbdndnazTmbazheaOhHalhAindnaqaeydbfRbbceGTmbaYaHydbfcl86bbkaeclfheaHclfhHaAcufgAmbxdkkaqheaOhHalhAindnaeRbbceGTmbaYaHydbfcl86bbkaecefheaHclfhHaAcufgAmbkkaOhealhAaYhHindnaYaeydbfRbbcl9hmbaHcl86bbkaeclfheaHcefhHaAcufgAmbkkamceGTmbaYhealhHindnaeRbbce9hmbaecl86bbkaecefheaHcufgHmbkkcbh8Mcualcx2alc;v:Q;v:Qe0Ecbyd1:H:cjbHjjjjbbh8Nasc:Cefasyd;8egecdtfa8NBdbasaecefBd;8eascbBd:qeas9cb83i1ea8Naialavazasc1efz:ejjjbhydndnaDmbcbh8PcbhCxekcbhCawhecbhHindnaeIdbJbbbb9ETmbasaCcdtfaHBdbaCcefhCkaeclfheaDaHcefgH9hmbkcuaCal2gecdtaecFFFFi0Ecbyd1:H:cjbHjjjjbbh8Pasc:Cefasyd;8egecdtfa8PBdbasaecefBd;8ealTmbdnaCmbcbhCxekarcd4hgdnazTmbaCcdthhcbh8Fa8Phainaoaza8Fcdtfydbag2cdtfhKasheaahHaChAinaHaKaeydbcdtgXfIdbawaXfIdbNUdbaeclfheaHclfhHaAcufgAmbkaaahfhaa8Fcefg8Fal9hmbxdkkaCcdthhcbh8Fa8Phainaoa8Fag2cdtfhKasheaahHaChAinaHaKaeydbcdtgXfIdbawaXfIdbNUdbaeclfheaHclfhHaAcufgAmbkaaahfhaa8Fcefg8Fal9hmbkkcualc8S2gHalc;D;O;f8U0EgXcbyd1:H:cjbHjjjjbbheasc:Cefasyd;8egAcdtfaeBdbasaAcefBd;8eaecbaHz:tjjjbhIcbh8RcbhgdnaCTmbcbh8MaXcbyd1:H:cjbHjjjjbbhgasc:Cefasyd;8egecdtfagBdbasaecefBd;8eagcbaHz:tjjjb8AcuaCal2gecltgHaecFFFFb0Ecbyd1:H:cjbHjjjjbbh8Rasc:Cefasyd;8egecdtfa8RBdbasaecefBd;8ea8RcbaHz:tjjjb8AamcjjjjdGTmbcualcltgealcFFFFb0Ecbyd1:H:cjbHjjjjbbh8Masc:Cefasyd;8egHcdtfa8MBdbasaHcefBd;8ea8Mcbaez:tjjjb8AkdnadTmbcbhKabhHina8NaHclfydbg8Fcx2fgeIdba8NaHydbgacx2fgAIdbg8S:tgRa8NaHcwfydbghcx2fgXIdlaAIdlg8U:tg8VNaeIdla8U:tg8WaXIdba8S:tg8XN:tg8Ya8YNa8WaXIdwaAIdwg8Z:tg80NaeIdwa8Z:tg8Wa8VN:tg81a81Na8Wa8XNaRa80N:tg80a80NMMg8V:rhBa8Yh8Xa80h8Wa81hRdna8VJbbbb9EgATmba8YaB:vh8Xa80aB:vh8Wa81aB:vhRkaIaOaacdtfydbgXc8S2fgeaRaB:rg8VaRNNg83aeIdbMUdbaea8Wa8Va8WNgUNg85aeIdlMUdlaea8Xa8Va8XNg86Ng87aeIdwMUdwaeaRaUNgUaeIdxMUdxaea86aRNg88aeIdzMUdzaea8Wa86Ng89aeIdCMUdCaeaRa8Va8Xa8ZNaRa8SNa8Ua8WNMM:mg8:Ng86NgRaeIdKMUdKaea8Wa86Ng8WaeId3MUd3aea8Xa86Ng8XaeIdaMUdaaea86a8:Ng86aeId8KMUd8Kaea8VaeIdyMUdyaIaOa8Fcdtfydbg8Fc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdyaIaOahcdtfydbgac8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdydna8MTmbdnaATmba8YaB:vh8Ya80aB:vh80a81aB:vh81ka8MaXcltfgeaBJbbbZNgRa80Ng8VaeIdlMUdlaeaRa8YNg8WaeIdwMUdwaeaRa81Ng8XaeIdbMUdbaeaRa8S:ma81Na8Ua80N:ta8Za8YN:tNgRaeIdxMUdxa8Ma8Fcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxa8Maacltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxkaHcxfhHaKcifgKad6mbkkdnalTmbJq;x8J88J;n;m;m89J:v:;;w8ZamczGEamc;abGEh80cbhHaOhXazhKaIhea8NhAindnaHaXydb9hmbaHh8FdnazTmbaKydbh8Fka80hRdnaqTmbJbbjZa80aqa8FfRbbclGEhRkaecxfg8Fa8FIdbJbbbbMUdbaeczfg8Fa8FIdbJbbbbMUdbaecCfg8Fa8FIdbJbbbbMUdbaeaRaecyfg8FIdbg8YNgRaeIdbMUdbaeclfgaaRaaIdbMUdbaecwfgaaRaaIdbMUdbaecKfgaaaIdbaAIdbg8WaRN:tUdbaAcwfIdbh8Vaec3fgaaaIdbaRaAclfIdbg8XN:tUdbaecafgaaaIdbaRa8VN:tUdbaec8KfgaIdbh81a8Fa8YaRMUdbaaa81aRa8Va8VNa8Wa8WNa8Xa8XNMMNMUdbkaXclfhXaKclfhKaec8SfheaAcxfhAalaHcefgH9hmbkkdnadTmbcbh8Aabhainaba8Acdtfh8FcbhHinaYa8FaHc:G:G:cjbfydbcdtfydbgAfRbbhedndnaYaaaHfydbgXfRbbgKc99fcFeGcpe0mbaec99fcFeGc;:e6mekdnaKcufcFeGce0mba5aXcdtfydbaA9hmekdnaecufcFeGce0mba8EaAcdtfydbaX9hmekJbbacJbbacJbbbZaecFeGceSEaKcFeGceSEhUdna8Na8FaHc:K:G:cjbfydbcdtfydbcx2fgeIdwa8NaXcx2fgKIdwg86:tg8Sa8NaAcx2fghIdwa86:tg8Xa8XNahIdbaKIdbg8U:tg80a80NahIdlaKIdlg8Z:tg8Va8VNMMg81Na8Xa8Sa8XNaeIdba8U:tg83a80Na8VaeIdla8Z:tg85NMMg8WN:tg8Ya8YNa83a81Na80a8WN:tgRaRNa85a81Na8Va8WN:tg8Wa8WNMMgBJbbbb9ETmba8YaB:rgB:vh8Ya8WaB:vh8WaRaB:vhRkaUa81:rNgBa8Ya86NaRa8UNa8Za8WNMM:mg81Ng87a81Nh88a80a85Na8Va83N:tg81a81Na8Va8SNa8Xa85N:tg8Va8VNa8Xa83Na80a8SN:tg8Xa8XNMMg83:rh80a8Ya87Nh85a8Wa87Nh89aRa87Nh87a8WaBa8YNg8SNh8:a8SaRNhZaRaBa8WNgnNhca8Ya8SNh8Ya8WanNh8WaRaBaRNNh8Sdna83Jbbbb9ETmba81a80:vh81a8Xa80:vh8Xa8Va80:vh8VkaIaOaXcdtfydbc8S2fgeaeIdba8Sa8VaUa80:rNgRa8VNNMg80MUdbaea8Wa8XaRa8XNg8SNMg83aeIdlMUdlaea8Ya81aRa81Ng8WNMg8YaeIdwMUdwaeaca8Va8SNMg8SaeIdxMUdxaeaZa8Wa8VNMgUaeIdzMUdzaea8:a8Xa8WNMg8WaeIdCMUdCaea87a8VaRa81a86Na8Va8UNa8Za8XNMMg86:mNgRNMg8VaeIdKMUdKaea89a8XaRNMg8XaeId3MUd3aea85a81aRNMg81aeIdaMUdaaea88a86aRN:tgRaeId8KMUd8KaeaBaeIdyMUdyaIaOaAcdtfydbc8S2fgea80aeIdbMUdbaea83aeIdlMUdlaea8YaeIdwMUdwaea8SaeIdxMUdxaeaUaeIdzMUdzaea8WaeIdCMUdCaea8VaeIdKMUdKaea8XaeId3MUd3aea81aeIdaMUdaaeaRaeId8KMUd8KaeaBaeIdyMUdykaHclfgHcx9hmbkaacxfhaa8Acifg8Aad6mbkaCTmbcbhainJbbbbh80a8Nabaacdtfgeclfydbg8Fcx2fgHIdwa8Naeydbghcx2fgAIdwg8Z:tg8Va8VNaHIdbaAIdbg83:tg8Wa8WNaHIdlaAIdlg85:tg8Xa8XNMMg8Sa8Naecwfydbg8Acx2fgeIdwa8Z:tg8YNa8Va8YNa8WaeIdba83:tg81Na8XaeIdla85:tgBNMMgRa8VN:tJbbbbJbbjZa8Sa8Ya8YNa81a81NaBaBNMMg8UNaRaRN:tg86:va86Jbbbb9BEg86Nh88a8Ua8VNaRa8YN:ta86Nh89a8SaBNaRa8XN:ta86Nh8:a8Ua8XNaRaBN:ta86NhZa8Sa81NaRa8WN:ta86Nhna8Ua8WNaRa81N:ta86Nhca8WaBNa8Xa81N:tgRaRNa8Xa8YNa8VaBN:tgRaRNa8Va81Na8Wa8YN:tgRaRNMM:rJbbbZNhRa8PahaC2g8JcdtfhHa8Pa8AaC2gDcdtfhAa8Pa8FaC2g8KcdtfhXa8Z:mh9ca85:mhJa83:mh9eascjdfheaChKJbbbbhBJbbbbh86Jbbbbh8SJbbbbh8UJbbbbh8ZJbbbbh83Jbbbbh85Jbbbbh87JbbbbhUinaecwfaRa89aXIdbaHIdbg8Y:tg8XNa88aAIdba8Y:tg81NMg8VNUdbaeclfaRaZa8XNa8:a81NMg8WNUdbaeaRaca8XNana81NMg8XNUdbaecxfaRa9ca8VNaJa8WNa8Ya9ea8XNMMMg8YNUdbaRa8Va8WNNa8ZMh8ZaRa8Va8XNNa8UMh8UaRa8Wa8XNNa8SMh8SaRa8Ya8YNNaUMhUaRa8Va8YNNa87Mh87aRa8Wa8YNNa85Mh85aRa8Xa8YNNa83Mh83aRa8Va8VNNa86Mh86aRa8Wa8WNNaBMhBaRa8Xa8XNNa80Mh80aHclfhHaXclfhXaAclfhAaeczfheaKcufgKmbkagahc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyaga8Fc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyaga8Ac8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdya8Ra8Jcltfh8FcbhHaChXina8FaHfgeascjdfaHfgAIdbaeIdbMUdbaeclfgKaAclfIdbaKIdbMUdbaecwfgKaAcwfIdbaKIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaHczfhHaXcufgXmbka8Ra8Kcltfh8FcbhHaChXina8FaHfgeascjdfaHfgAIdbaeIdbMUdbaeclfgKaAclfIdbaKIdbMUdbaecwfgKaAcwfIdbaKIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaHczfhHaXcufgXmbka8RaDcltfh8FcbhHaChXina8FaHfgeascjdfaHfgAIdbaeIdbMUdbaeclfgKaAclfIdbaKIdbMUdbaecwfgKaAcwfIdbaKIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaHczfhHaXcufgXmbkaacifgaad6mbkkcbhAdndnamcwGgTmbJbbbbh8ScbhScbh9hcbh9ixekcbhSa3cbyd1:H:cjbHjjjjbbh9iasc:Cefasyd;8egecdtfa9iBdbasaecefBd;8ecua9ialabadaOz:fjjjbgXcltaXcjjjjiGEcbyd1:H:cjbHjjjjbbh9hasc:Cefasyd;8egecdtfa9hBdbasaecefBd;8ea9haXa9ia8Nalz:gjjjbJFFuuh8SaXTmba9hheaXhHinaeIdbgRa8Sa8SaR9EEh8SaeclfheaHcufgHmbkaXhSkdnalTmbaLclfheaLydbhXaYhHalhKcbhAincbaeydbg8FaX9RaHRbbcpeGEaAfhAaHcefhHaeclfhea8FhXaKcufgKmbkaAce4hAkcuadaA9Rcifg6cx2a6c;v:Q;v:Qe0Ecbyd1:H:cjbHjjjjbbh9kasc:Cefasyd;8egecdtfa9kBdbasaecefBd;8ecua6cdta6cFFFFi0Ecbyd1:H:cjbHjjjjbbh0asc:Cefasyd;8egecdtfa0BdbasaecefBd;8ea3cbyd1:H:cjbHjjjjbbh9masc:Cefasyd;8egecdtfa9mBdbasaecefBd;8ealcbyd1:H:cjbHjjjjbbh9nasc:Cefasyd;8egecdtfa9nBdbasaecefBd;8eaxaxNayJbbjZamclGEgZaZN:vh87JbbbbhUdnadak9nmbdna6ci6mbaCclth9oa9kcwfh9pJbbbbh85JbbbbhUinascNefabadalaOz:cjjjbabh8Acbh9qcbh9rinaba9rcdtfhDcbheindnaOa8AaefydbgAcdtghfydbgXaOaDaec:W:G:cjbfydbcdtfydbgHcdtg8JfydbgKSmbaYaHfRbbgacv2aYaAfRbbg8FfRb;a:G:cjbg8La8Fcv2aafg8KRb;a:G:cjbg3VcFeGTmbdnaKaX9nmba8KRb;G:G:cjbcFeGmekdna8FcufcFeGce0mbaaTmba5ahfydbaH9hmekdna8FTmbaacufcFeGce0mba8Ea8JfydbaA9hmeka9ka9qcx2fgXaHaAa3cFeGgKEBdlaXaAaHaKEBdbaXaKa8LGcb9hBdwa9qcefh9qkaeclfgecx9hmbkdna9rcifg9rad9pmba8Acxfh8Aa9qcifa69nmekka9qTmdcbh8KinaIaOa9ka8Kcx2fghydbgKcdtgXfydbg8Ac8S2fgeIdwa8Nahydlg8Fcx2fgHIdwg8WNaeIdzaHIdbg8XNaeIdaMgRaRMMa8WNaeIdlaHIdlg8YNaeIdCa8WNaeId3MgRaRMMa8YNaeIdba8XNaeIdxa8YNaeIdKMgRaRMMa8XNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8V:va8VJbbbb9BEh8VdndnahydwgDmbJFFuuh86xekJbbbbJbbjZaIaOa8Fcdtfydbc8S2fgeIdyg81:va81Jbbbb9BEaeIdwa8NaKcx2fgHIdwg81NaeIdzaHIdbg80NaeIdaMgBaBMMa81NaeIdlaHIdlgBNaeIdCa81NaeId3Mg81a81MMaBNaeIdba80NaeIdxaBNaeIdKMg81a81MMa80NaeId8KMMM:lNh86ka8VaRNhBdnaCTmbagaKc8S2fgAIdwa8WNaAIdza8XNaAIdaMgRaRMMa8WNaAIdla8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8FaC2gacdtfhHa8RaKaC2g8JcltfheaAIdyh81aChAinaHIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaHclfhHaeczfheaAcufgAmbkdndnaDmbJbbbbh8Vxekaga8Fc8S2fgAIdwa8NaKcx2fgeIdwg8XNaAIdzaeIdbg8YNaAIdaMg8Va8VMMa8XNaAIdlaeIdlg81NaAIdCa8XNaAId3Mg8Va8VMMa81NaAIdba8YNaAIdxa81NaAIdKMg8Va8VMMa8YNaAId8KMMMh8Va8Pa8JcdtfhHa8RaacltfheaAIdyh80aChAinaHIdbg8Wa8Wa80NaecxfIdba8XaecwfIdbNa8YaeIdbNa81aeclfIdbNMMMg8Wa8WM:tNa8VMh8VaHclfhHaeczfheaAcufgAmbka8V:lh8VkaBaR:lMhBa86a8VMh86dndndnaYaKfRbbc9:fPddbekaQaXfydbgXaKSmbaOa8Fcdtfydbh8Jindndna5aXcdtgafydbgecuSmbaOaecdtfydba8JSmekdna8EaafydbgecuSmbaOaecdtfydba8JSmeka8FhekagaXc8S2fgAIdwa8Naecx2fgHIdwg8WNaAIdzaHIdbg8XNaAIdaMgRaRMMa8WNaAIdlaHIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaeaC2cdtfhHa8RaXaC2cltfheaAIdyh81aChAinaHIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaHclfhHaeczfheaAcufgAmbkaBaR:lMhBaQaafydbgXaK9hmbkkaYa8FfRbbci9hmeaDTmeaQa8FcdtfydbgXa8FSmeindndna5aXcdtgafydbgecuSmbaOaecdtfydba8ASmekdna8EaafydbgecuSmbaOaecdtfydba8ASmekaKhekagaXc8S2fgAIdwa8Naecx2fgHIdwg8WNaAIdzaHIdbg8XNaAIdaMgRaRMMa8WNaAIdlaHIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaeaC2cdtfhHa8RaXaC2cltfheaAIdyh81aChAinaHIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaHclfhHaeczfheaAcufgAmbka86aR:lMh86aQaafydbgXa8F9hmbxdkkdna8Ea5a5aXfydba8FSEaQaXfydbgacdtfydbgXcu9hmbaQa8FcdtfydbhXkagaac8S2fgAIdwa8NaXcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaXaC2g8AcdtfhHa8RaaaC2g8JcltfheaAIdyh81aChAinaHIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaHclfhHaeczfheaAcufgAmbkdndnaDmbJbbbbh8VxekagaXc8S2fgAIdwa8Naacx2fgeIdwg8XNaAIdzaeIdbg8YNaAIdaMg8Va8VMMa8XNaAIdlaeIdlg81NaAIdCa8XNaAId3Mg8Va8VMMa81NaAIdba8YNaAIdxa81NaAIdKMg8Va8VMMa8YNaAId8KMMMh8Va8Pa8JcdtfhHa8Ra8AcltfheaAIdyh80aChAinaHIdbg8Wa8Wa80NaecxfIdba8XaecwfIdbNa8YaeIdbNa81aeclfIdbNMMMg8Wa8WM:tNa8VMh8VaHclfhHaeczfheaAcufgAmbka8V:lh8VkaBaR:lMhBa86a8VMh86kaha86aBa86aB9DgeEUdwahaKa8FaeaDcb9hGgeEBdlaha8FaKaeEBdba8Kcefg8Ka9q9hmbkascjdfcbcj;qbz:tjjjb8Aa9phea9qhHinascjdfaeydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbcefBdbaecxfheaHcufgHmbkcbhecbhHinascjdfaefgAydbhXaAaHBdbaXaHfhHaeclfgecj;qb9hmbkcbhea9phHinascjdfaHydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbgAcefBdba0aAcdtfaeBdbaHcxfhHa9qaecefge9hmbkadak9RgAci9Uh9sdnalTmbcbhea9mhHinaHaeBdbaHclfhHalaecefge9hmbkkcbh9ta9ncbalz:tjjjbh3aAcO9Uh9ua9sce4h9rcbh8Lcbh8Kdnina9ka0a8Kcdtfydbcx2fg8JIdwgRa879Emea8La9s9pmeJFFuuh8Vdna9ra9q9pmba9ka0a9rcdtfydbcx2fIdwJbb;aZNh8VkdnaRa8V9ETmbaRaU9ETmba8La9u0mdkdna3aOa8JydlgDcdtg9vfg8AydbgAfg9wRbba3aOa8Jydbghcdtg9xfydbgefg9yRbbVmbaYahfRbbh9zdndnaLaecdtfgHclfydbgXaHydbgHSmbaXaH9RhXa8NaAcx2fh8Fa8Naecx2fhaaEaHcitfheindna9maeydbcdtfydbgHaASmba9maeclfydbcdtfydbgKaASmbaHaKSmba8NaKcx2fgKIdba8NaHcx2fgHIdbg8W:tgRaaIdlaHIdlg8X:tg80NaKIdla8X:tg8VaaIdba8W:tgBN:tg8YaRa8FIdla8X:tg86Na8Va8FIdba8W:tg8UN:tg8XNa8VaaIdwaHIdwg81:tg8ZNaKIdwa81:tg8Wa80N:tg80a8Va8FIdwa81:tg83Na8Wa86N:tg8VNa8WaBNaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmikaecwfheaXcufgXmbkkdndndndna9zc9:fPdebdkahheina8AydbhAdndna5aecdtgHfydbgecuSmbaOaecdtfydbaASmekdna8EaHfydbgecuSmbaOaecdtfydbaASmekaDheka9maHfaeBdbaQaHfydbgeah9hmbxikkdna8Ea5a5a9xfydbaDSEaQa9xfydbghcdtfydbgecu9hmbaQa9vfydbheka9ma9xfaDBdbaehDka9mahcdtfaDBdbka9yce86bba9wce86bba8JIdwgRaUaUaR9DEhUa9tcefh9tcecda9zceSEa8Lfh8Lxeka9rcefh9rka8Kcefg8Ka9q9hmbkka9tTmddnalTmbcbh8Fcbhhindna9mahcdtgefydbgAahSmbaOaAcdtfydbh8AdnahaOaefydb9hg8JmbaIa8Ac8S2fgeaIahc8S2fgHIdbaeIdbMUdbaeaHIdlaeIdlMUdlaeaHIdwaeIdwMUdwaeaHIdxaeIdxMUdxaeaHIdzaeIdzMUdzaeaHIdCaeIdCMUdCaeaHIdKaeIdKMUdKaeaHId3aeId3MUd3aeaHIdaaeIdaMUdaaeaHId8KaeId8KMUd8KaeaHIdyaeIdyMUdya8MTmba8Ma8Acltfgea8MahcltfgHIdbaeIdbMUdbaeaHIdlaeIdlMUdlaeaHIdwaeIdwMUdwaeaHIdxaeIdxMUdxkaCTmbagaAc8S2fgeagahc8S2gDfgHIdbaeIdbMUdbaeaHIdlaeIdlMUdlaeaHIdwaeIdwMUdwaeaHIdxaeIdxMUdxaeaHIdzaeIdzMUdzaeaHIdCaeIdCMUdCaeaHIdKaeIdKMUdKaeaHId3aeId3MUd3aeaHIdaaeIdaMUdaaeaHId8KaeId8KMUd8KaeaHIdyaeIdyMUdya9oaA2haa8RhHaChXinaHaafgeaHa8FfgAIdbaeIdbMUdbaeclfgKaAclfIdbaKIdbMUdbaecwfgKaAcwfIdbaKIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaHczfhHaXcufgXmbka8JmbJbbbbJbbjZaIaDfgeIdygR:vaRJbbbb9BEaeIdwa8Na8Acx2fgHIdwgRNaeIdzaHIdbg8VNaeIdaMg8Wa8WMMaRNaeIdlaHIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8VNaeIdxa8WNaeIdKMgRaRMMa8VNaeId8KMMM:lNgRa85a85aR9DEh85ka8Fa9ofh8Fahcefghal9hmbkcbhHa5heindnaeydbgAcuSmbdnaHa9maAcdtgXfydbgA9hmbcuhAa5aXfydbgXcuSmba9maXcdtfydbhAkaeaABdbkaeclfhealaHcefgH9hmbkcbhHa8EheindnaeydbgAcuSmbdnaHa9maAcdtgXfydbgA9hmbcuhAa8EaXfydbgXcuSmba9maXcdtfydbhAkaeaABdbkaeclfhealaHcefgH9hmbkka85aUaCEh85cbhHabhecbhAindnaOa9maeydbcdtfydbg8FcdtfydbgXaOa9maeclfydbcdtfydbgacdtfydbgKSmbaXaOa9maecwfydbcdtfydbg8AcdtfydbghSmbaKahSmbabaHcdtfgXa8FBdbaXcwfa8ABdbaXclfaaBdbaHcifhHkaecxfheaAcifgAad6mbkdndnaTmbaHhdxekdnaHak0mbaHhdxekdna8Sa859FmbaHhdxekJFFuuh8ScbhdabhecbhAindna9ha9iaeydbgXcdtfydbcdtfIdbgRa859ETmbaeclf8Pdbh9AabadcdtfgKaXBdbaKclfa9A83dbaRa8Sa8SaR9EEh8SadcifhdkaecxfheaAcifgAaH6mbkkadak0mbxdkkascNefabadalaOz:cjjjbkdndnadak0mbadhaxekdnaTmbadhaxekdna8Sa879FmbadhaxekcehKina8SJbb;aZNgRa87aRa879DEh8WJbbbbhRdnaSTmba9hheaShHinaeIdbg8VaRa8Va8W9FEaRa8VaR9EEhRaeclfheaHcufgHmbkkJFFuuh8ScbhaabhecbhHindna9ha9iaeydbgAcdtfydbcdtfIdbg8Va8W9ETmbaeclf8Pdbh9AabaacdtfgXaABdbaXclfa9A83dba8Va8Sa8Sa8V9EEh8SaacifhakaecxfheaHcifgHad6mbkdnaKaaad9hVceGmbadhaxdkaRaUaUaR9DEhUaaak9nmecbhKaahda8Sa879FmbkkdnamcjjjjdGTmba9ncbalz:tjjjbh8AdnaaTmbabheaahHina8AaeydbgAfce86bba8AaOaAcdtfydbfce86bbaeclfheaHcufgHmbkkascNefabaaalaOz:cjjjbdndnalTmbcbhXindna8AaXfRbbTmbdnaYaXfRbbgecl0mbceaetcQGmekdnaOaXcdtg8FfydbgeaXSmba8NaXcx2fgHa8Naecx2fgeydwBdwaHae8Pdb83dbxekaIaXc8S2fgKIdygcacJL:3;rUNgRMh87aKIdwg9BaRMh8SaKIdlg9CaRMh8UaKIdbg9DaRMh81aKIdag9EaRa8NaXcx2fg8JIdwg88N:th8ZaKId3g9FaRa8JIdlg89N:th83aKIdKg9Ga8JIdbg8:aRN:th80JbbbbhnaKIdCg9HJbbbbMh85aKIdzg9IJbbbbMhBaKIdxg9JJbbbbMh86dndnaCTmbaXhAinJbbbba87agaAc8S2fgHIdygR:vaRJbbbb9BEhRa8RaAaC2cltfheaHIdaa87Na8ZMh8ZaHId3a87Na83Mh83aHIdKa87Na80Mh80aHIdCa87Na85Mh85aHIdza87NaBMhBaHIdxa87Na86Mh86aHIdwa87Na8SMh8SaHIdla87Na8UMh8UaHIdba87Na81Mh81aChHina8ZaecwfIdbg8VaecxfIdbg8YNaRN:th8Za83aeclfIdbg8Wa8YNaRN:th83a85a8Wa8VNaRN:th85a81aeIdbg8Xa8XNaRN:th81a80a8Xa8YNaRN:th80aBa8Xa8VNaRN:thBa86a8Xa8WNaRN:th86a8Sa8Va8VNaRN:th8Sa8Ua8Wa8WNaRN:th8UaeczfheaHcufgHmbkaQaAcdtfydbgAaX9hmbka8MTmba8MaXcltfgeIdxhxaeIdwh9caeIdlhJaeIdbhRxekJbbbbhxJbbbbh9cJbbbbhJJbbbbhRkaBa81:vg8Wa80Na8Z:ta85aBa86a81:vg8VN:tg8Za8Ua86a8VN:tg8Y:vg8Xa8Va80Na83:tg8UN:th83a9caRa8WN:taJaRa8VN:tg86a8XN:tg85a8SaBa8WN:ta8Za8XN:tgB:vg8S:mh8Za86a8Y:vg9c:mhJdnJbbbbaRaRa81:vg9eN:ta86a9cN:ta85a8SN:tg86:la87J:983:g81NgR9ETmba8Za83NaJa8UNa9ea80Nax:tMMa86:vhnka81:laR9ETmba8Y:laR9ETmbaB:laR9ETmba9e:manNa8W:ma8ZanNa83aB:vMgBNa8V:maJanNa8X:maBNa8Ua8Y:vMMg85Na80:ma81:vMMMh87aLa8FfgeclfydbgHaeydbge9RhhaEaecitfh8FJbbbbhRdnaHaeSgDmbJbbbbhRa8FheahhAina8Naeclfydbcx2fgHIdwa88:tg8Va8VNaHIdba8::tg8Va8VNaHIdla89:tg8Va8VNMMg8Va8Naeydbcx2fgHIdwa88:tg8Wa8WNaHIdba8::tg8Wa8WNaHIdla89:tg8Wa8WNMMg8WaRaRa8W9DEgRaRa8V9DEhRaecwfheaAcufgAmbkaR:rgRaRNhRkaBa88:tg8Va8VNa87a8::tg8Va8VNa85a89:tg8Va8VNMMaR9EmbaKId8KhndnaDmbina8Na8Fclfydbcx2fgeIdba8Na8Fydbcx2fgHIdbg8W:tgRa89aHIdlg8X:tg80NaeIdla8X:tg8Va8:a8W:tg86N:tg8YaRa85a8X:tg8SNa8Va87a8W:tg8UN:tg8XNa8Va88aHIdwg81:tg8ZNaeIdwa81:tg8Wa80N:tg80a8VaBa81:tg83Na8Wa8SN:tg8VNa8Wa86NaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9Fmda8Fcwfh8FahcufghmbkkJbbbbJbbjZac:vacJbbbb9BEgRa9BaBNa9Ia87Na9EMg8Va8VMMaBNa9Ca85Na9HaBNa9FMg8Va8VMMa85Na9Da87Na9Ja85Na9GMg8Va8VMMa87NanMMM:lNaRa9Ba88Na9Ia8:Na9EMg8Va8VMMa88Na9Ca89Na9Ha88Na9FMg8Va8VMMa89Na9Da8:Na9Ja89Na9GMg8Va8VMMa8:NanMMM:lNJbb;aZNJ:983:g81M9Emba8JaBUdwa8Ja85Udla8Ja87UdbkaXcefgXal9hmbkdnaCmbcbhCxdkcbhXindna8AaXfRbbTmbaOaXcdtgefydbaX9hmbaYaXfhhaQaefh8Ja8NaXcx2fhAa8PaXaC2cdtfhDcbhEincuhLdnahRbbci9hmbaXhLa8JydbgeaXSmba8PaEcdtgHfhKaDaHfIdbhRaXhLinaLhHcuhLdnaKaeaC2cdtfIdbaR9CmbaHcuSmbaHhLagaec8S2fIdyagaHc8S2fIdy9ETmbaehLkaQaecdtfydbgeaX9hmbkka8PaEcdtfhKa8RaEcltfh8FaXheinaKaeaC2cdtfJbbbbJbbjZagaeaLaLcuSEgHc8S2fIdygR:vaRJbbbb9BEa8FaHaC2cltfgHIdwaAIdwNaHIdbaAIdbNaHIdlaAIdlNMMaHIdxMNUdbaQaecdtfydbgeaX9hmbkaEcefgEaC9hmbkkaXcefgXal9hmbxdkkaCmbcbhCkaiavaoarawaCala8Na8Pazasayasc1efaYa8Aaqz:hjjjbkdnamcjjjjlGTmbazmbaaTmbabhecbhLinaYaeydbgAfRbbc3thQaecwfgXydbhHcjjjj94hCdna5aAcdtgEfydbaeclfgKydbgOSmbcjjjj94cba8EaOcdtfydbaASEhCkaeaQaCVaAVBdbaYaOfRbbc3th8Fcjjjj94hCcjjjj94hQdna5aOcdtfydbaHSmbcjjjj94cba8EaHcdtfydbaOSEhQkaKa8FaQVaOVBdbaYaHfRbbc3thOdna5aHcdtfydbaASmbcjjjj94cba8EaEfydbaHSEhCkaXaOaCVaHVBdbaecxfheaLcifgLaa6mbkkdnazTmbaaTmbaaheinabazabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPaZaU:rNUdbkdnasyd;8egHTmbaHcdtasc:Ceffc98fheinaeydbcbyd:m:H:cjbH:bjjjbbaec98fheaHcufgHmbkkascj;sbf8Kjjjjbaak;Yieouabydlhvabydbclfcbaicdtz:tjjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd1:H:cjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:tjjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd:m:H:cjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkabclfhbawclfhwaiaDcefgD9hmbkkk;:odvuv998Jjjjjbca9Rgocbyd1:G:cjbBdKaocb8Pdj:G:cjb83izaocbydN:G:cjbBdwaocb8Pd:m:G:cjb83ibdnadTmbaicd4hrdnabmbdnalTmbcbhwinaealawcdtfydbar2cdtfhDcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxikkarcdthwcbhDincbhiinaoczfaifgqaeaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaeawfheaDcefgDad9hmbxdkkdnalTmbcbhwinabawcx2fgiaealawcdtfydbar2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxdkkarcdthlcbhwaehDinabawcx2fgiaeawar2cdtfgqIdbUdbaiaqIdlUdlaiaqIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaDalfhDawcefgwad9hmbkkJbbbbaoIdbaoIdzgx:tgkakJbbbb9DEgkaoIdlaoIdCgm:tgPaPak9DEgkaoIdwaoIdKgP:tgsasak9DEhsdnabTmbadTmbJbbbbJbbjZas:vasJbbbb9BEhkinabakabIdbax:tNUdbabclfgoakaoIdbam:tNUdbabcwfgoakaoIdbaP:tNUdbabcxfhbadcufgdmbkkdnavTmbavaPUdwavamUdlavaxUdbkask:WlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvyd:G:G:cjbcdtfydbcdtfydbhodnalawavfydbcdtfydbgqabaqcdtfgkydbgvSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnaoabaocdtfgkydbgvSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnaxabavfgDydbgvSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhkabhvcbhoindndnaoalydbgq9hmbdnaoavydbgq9hmbavakBdbakcefhkxdkavabaqcdtfydbBdbxekavabaqcdtfydbBdbkalclfhlavclfhvaeaocefgo9hmbkakk;jiilud99euabcbaecltz:tjjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakaqakIdlMUdlakaDakIdwMUdwakakIdxJbbjZMUdxaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhkaehrinakcxfgoIdbhDaocbBdbakakIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbakclfgoaDaoIdbNUdbakcwfgoaDaoIdbNUdbakczfhkarcufgrmbkkdnalTmbinavadydbcltfgkaicwfIdbakIdw:tgDaDNaiIdbakIdb:tgDaDNaiclfIdbakIdl:tgDaDNMMgDakIdxgqaqaD9DEUdxadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhkinabakIdbUdbakczfhkabclfhbaecufgembkkk:moerudnaoTmbaecd4hzdnavTmbaicd4hHavcdthOcbhAindnaPaAfRbbTmbaAhednaDTmbaDaAcdtfydbhekdnasTmbasaefRbbceGmekdnamaAfRbbclSmbabaeaz2cdtfgiaraAcx2fgCIdbakNaxIdbMUdbaiaCIdlakNaxIdlMUdlaiaCIdwakNaxIdwMUdwkadaeaH2cdtfhXaqheawhiavhCinaXaeydbcdtgQfaiIdbalaQfIdb:vUdbaeclfheaiclfhiaCcufgCmbkkawaOfhwaAcefgAao9hmbxdkkdnasmbcbheaDhiindnaPaefRbbTmbaehCdnaDTmbaiydbhCkamaefRbbclSmbabaCaz2cdtfgCarIdbakNaxIdbMUdbaCarclfIdbakNaxIdlMUdlaCarcwfIdbakNaxIdwMUdwkaiclfhiarcxfhraoaecefge9hmbxdkkdnaDTmbindnaPRbbTmbasaDydbgefRbbceGmbamRbbclSmbabaeaz2cdtfgearIdbakNaxIdbMUdbaearclfIdbakNaxIdlMUdlaearcwfIdbakNaxIdwMUdwkaPcefhPaDclfhDamcefhmarcxfhraocufgombxdkkazcdthicbheindnaPaefRbbTmbasaefRbbceGmbamaefRbbclSmbabarIdbakNaxIdbMUdbabclfarclfIdbakNaxIdlMUdbabcwfarcwfIdbakNaxIdwMUdbkarcxfhrabaifhbaoaecefge9hmbkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbkRbababaeadaialavaoarawaDaqakaxcjjjjdVamz:bjjjbk:g8Koque99due99duq998Jjjjjbc;Wb9Rgq8Kjjjjbcbhkaqcxfcbc;Kbz:tjjjb8Aaqcualcx2alc;v:Q;v:Qe0Ecbyd1:H:cjbHjjjjbbgxBdxaqceBd2axaialavcbcbz:ejjjb8AaqcualcdtalcFFFFi0Egmcbyd1:H:cjbHjjjjbbgiBdzaqcdBd2dndnJFF959eJbbjZawJbbjZawJbbjZ9DE:vawJ9VO:d869DEgw:lJbbb9p9DTmbaw:OhPxekcjjjj94hPkadci9Uhsarco9UhzdndnaombaPcd9imekdnalTmbaPcuf:YhwdnaoTmbcbhvaihHaxhOindndnaoavfRbbceGTmbavcjjjjlVhAxekdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHaOcxfhOalavcefgv9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkadTmbcbhkaehvcbhOinakaiavclfydbcdtfydbgHaiavcwfydbcdtfydbgA9haiavydbcdtfydbgXaH9haXaA9hGGfhkavcxfhvaOcifgOad6mbkkarci9UhQdndnaz:Z:rJbbbZMgw:lJbbb9p9DTmbaw:Ohvxekcjjjj94hvkaQ:ZhLcbhKc:bwhzdninakaQ9pmeazaP9Rcd9imeavazcufgOavaO9iEaPcefavaP9kEhYdnalTmbaYcuf:YhwdnaoTmbcbhOaihHaxhvindndnaoaOfRbbceGTmbaOcjjjjlVhAxekdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHavcxfhvalaOcefgO9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkcbhOdnadTmbaehvcbhHinaOaiavclfydbcdtfydbgAaiavcwfydbcdtfydbgX9haiavydbcdtfydbgraA9haraX9hGGfhOavcxfhvaHcifgHad6mbkkdnas:ZgCaL:taY:Ygwaz:Y:tg8ANak:ZgEaO:Zg3:tNaEaL:tawaP:Y:tg5Na3aC:tNMg8EJbbbb9BmbaCaE:ta5a8Aa3aL:tNNNa8E:vawMhwkdndnaOaQ0mbaOhkaYhPxekaOhsaYhzkdndnaKcl0mbdnawJbbbZMgw:lJbbb9p9DTmbaw:Ohvxdkcjjjj94hvxekaPazfcd9ThvkaKcefgKcs9hmbkkdndndnakmbJbbjZhwcbhOcdhvaDmexdkalcd4alfhHcehOinaOgvcethOavaH6mbkcbhOaqcuavcdtgYavcFFFFi0Ecbyd1:H:cjbHjjjjbbgKBdCaqciBd2aqamcbyd1:H:cjbHjjjjbbgzBdKaqclBd2dndndndnalTmbaPcuf:YhwaoTmecbhOaihAaxhHindndnaoaOfRbbceGTmbaOcjjjjlVhXxekdndnaHclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqthXdndnaHcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarVhXdndnaHIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarcCtVhXkaAaXBdbaAclfhAaHcxfhHalaOcefgO9hmbxikkaKcFeaYz:tjjjb8AcbhPcbhvxdkaxhOaihHalhAindndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcCthXdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkarcqtaXVhXdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaHaXarVBdbaOcxfhOaHclfhHaAcufgAmbkkaKcFeaYz:tjjjbhravcufhocbhPcbhYindndndnaraiaYcdtgKfydbgAcm4aA7c:v;t;h;Ev2gvcs4av7aoGgHcdtfgXydbgOcuSmbcehvinaiaOcdtgOfydbaASmdaHavfhOavcefhvaraOaoGgHcdtfgXydbgOcu9hmbkkaXaYBdbaPhvaPcefhPxekazaOfydbhvkazaKfavBdbaYcefgYal9hmbkcuaPc8S2gOaPc;D;O;f8U0EhvkcbhXaqavcbyd1:H:cjbHjjjjbbgvBd3aqcvBd2avcbaOz:tjjjbhOdnadTmbaehiinaxaiclfydbgrcx2fgvIdbaxaiydbgocx2fgHIdbg3:tgCaxaicwfydbgYcx2fgAIdlaHIdlg8A:tgwNavIdla8A:tgEaAIdba3:tg8EN:tgLaLNaEaAIdwaHIdwg5:tg8FNavIdwa5:tgEawN:tgwawNaEa8ENaCa8FN:tgCaCNMMg8E:rhEJbbnnJbbjZazaocdtfydbgvazarcdtfydbgASavazaYcdtfydbgrSGgHEh8Fdna8EJbbbb9ETmbaLaE:vhLaCaE:vhCawaE:vhwkaOavc8S2fgvavIdbawa8FaE:rNgEawNNg8FMUdbavaCaEaCNgaNghavIdlMUdlavaLaEaLNg8ENggavIdwMUdwavawaaNgaavIdxMUdxava8EawNg8JavIdzMUdzavaCa8ENg8EavIdCMUdCavawaEaLa5Nawa3Na8AaCNMM:mg8ANg3NgwavIdKMUdKavaCa3NgCavId3MUd3avaLa3NgLavIdaMUdaava3a8ANg3avId8KMUd8KavaEavIdyMUdydnaHmbaOaAc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdyaOarc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdykaicxfhiaXcifgXad6mbkkcbhAaqcuaPcdtgvaPcFFFFi0Egicbyd1:H:cjbHjjjjbbgHBdaaqcoBd2aqaicbyd1:H:cjbHjjjjbbgiBd8KaqcrBd2aHcFeavz:tjjjbhYdnalTmbazhHinJbbbbJbbjZaOaHydbgXc8S2fgvIdygw:vawJbbbb9BEavIdwaxcwfIdbgwNavIdzaxIdbgCNavIdaMgLaLMMawNavIdlaxclfIdbgLNavIdCawNavId3MgwawMMaLNavIdbaCNavIdxaLNavIdKMgwawMMaCNavId8KMMM:lNhwdndnaYaXcdtgvfgXydbcuSmbaiavfIdbaw9ETmekaXaABdbaiavfawUdbkaHclfhHaxcxfhxalaAcefgA9hmbkkdndnaPmbJbbbbhwxekJbbbbhwinaiIdbgCawawaC9DEhwaiclfhiaPcufgPmbkaw:rhwkakcd4akfhOcehiinaigvcethiavaO6mbkcbhOaqcuavcdtgiavcFFFFi0Ecbyd1:H:cjbHjjjjbbgHBdyaHcFeaiz:tjjjbhXdnadTmbavcufhrcbhPcbhxindnazaeaxcdtfgvydbcdtfydbgiazavclfydbcdtfydbgOSmbaiazavcwfydbcdtfydbgvSmbaOavSmbaYavcdtfydbhAdndnaYaOcdtfydbgvaYaicdtfydbgi9pmbavaA9pmbaAhlaihoavhAxekdnaAai9pmbaAav9pmbaihlavhoxekavhlaAhoaihAkabaPcx2fgvaABdbavcwfaoBdbavclfalBdbdnaXaoc:3F;N8N2alc:F:b:DD27aAc;D;O:B8J27arGgOcdtfgvydbgicuSmbcehHinaHhvdnabaicx2fgiydbaA9hmbaiydlal9hmbaiydwaoSmikavcefhHaXaOavfarGgOcdtfgvydbgicu9hmbkkavaPBdbaPcefhPkaxcifgxad6mbkaPci2hOkcwhvaDTmekaDawUdbkavcdthvaqcxfc98fhiinaiavfydbcbyd:m:H:cjbH:bjjjbbavc98fgvmbkaqc;Wbf8KjjjjbaOk:3ldrue9:8Jjjjjbc;Wb9Rgr8Kjjjjbcbhwarcxfcbc;Kbz:tjjjb8AdnabaeSmbabaeadcdtzMjjjb8AkarcualcdtalcFFFFi0EgDcbyd1:H:cjbHjjjjbbgqBdxarceBd2aqcbaialavcbarcxfz:djjjbcualcx2alc;v:Q;v:Qe0Ecbyd1:H:cjbHjjjjbbhkarcxfaryd2gxcdtfakBdbaraxcefgmBd2akaialavcbcbz:ejjjb8AarcxfamcdtfaDcbyd1:H:cjbHjjjjbbgiBdbaraxcdfgvBd2arcxfavcdtfcuaialaeadaqz:fjjjbgecltaecjjjjiGEcbyd1:H:cjbHjjjjbbgqBdbaqaeaiakalz:gjjjbaxcifhkdnadTmbaoaoNhocbhwabhlcbheindnaqaialydbgvcdtfydbcdtfIdbao9ETmbalclf8PdbhPabawcdtfgDavBdbaDclfaP83dbawcifhwkalcxfhlaecifgead6mbkkdnakTmbaxcdtarcxffcwfhlinalydbcbyd:m:H:cjbH:bjjjbbalc98fhlakcufgkmbkkarc;Wbf8Kjjjjbawk:WCoDud99vue99vuv998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:tjjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd1:H:cjbHjjjjbbgqBdxawceBd2aqaeadaicbcbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd1:H:cjbHjjjjbbgxBdzawcdBd2adcd4adfhmceheinaegicetheaiam6mbkcbhPawcuaicdtgsaicFFFFi0Ecbyd1:H:cjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohexekcjjjj94hekaicufhAc:bwhCcbhXadhQcbhLinaeaCcufgiaeai9iEaPcefaeaP9kEhDdndnadTmbaDcuf:YhOaqhiaxheadhmindndnaiIdbaONJbbbZMgK:lJbbb9p9DTmbaK:OhYxekcjjjj94hYkaYcCthYdndnaiclfIdbaONJbbbZMgK:lJbbb9p9DTmbaK:Oh8Axekcjjjj94h8Aka8AcqtaYVhYdndnaicwfIdbaONJbbbZMgK:lJbbb9p9DTmbaK:Oh8Axekcjjjj94h8AkaeaYa8AVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:tjjjbhEcbh3cbh5indnaEaxa5cdtfydbgYcm4aY7c:v;t;h;Ev2gics4ai7aAGgmcdtfg8AydbgecuSmbaeaYSmbcehiinaEamaifaAGgmcdtfg8AydbgecuSmeaicefhiaeaY9hmbkka8AaYBdba3aecuSfh3a5cefg5ad9hmbxdkkazcFeasz:tjjjb8Acbh3kdnaQ:ZgKaH:taD:YgOaC:Y:tg8ENaX:Zg8Fa3:Zga:tNa8FaH:taOaP:Y:tghNaaaK:tNMggJbbbb9BmbaKa8F:taha8EaaaH:tNNNag:vaOMhOkaPaDa3ar0giEhPaXa3aiEhXdna3arSmbaDaCaiEgCaP9Rcd9imbdndnaLcl0mbdnaOJbbbZMgO:lJbbb9p9DTmbaO:Ohexdkcjjjj94hexekaPaCfcd9Theka3aQaiEhQaLcefgLcs9hmekkdndnaXmbcihicbhDxekcbhiawakcbyd1:H:cjbHjjjjbbg5BdKawclBd2aPcuf:YhKdndnadTmbaqhiaxheadhmindndnaiIdbaKNJbbbZMgO:lJbbb9p9DTmbaO:OhYxekcjjjj94hYkaYcCthYdndnaiclfIdbaKNJbbbZMgO:lJbbb9p9DTmbaO:Oh8Axekcjjjj94h8Aka8AcqtaYVhYdndnaicwfIdbaKNJbbbZMgO:lJbbb9p9DTmbaO:Oh8Axekcjjjj94h8AkaeaYa8AVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:tjjjbhEcbhDcbh3indndndnaEaxa3cdtgCfydbgYcm4aY7c:v;t;h;Ev2gics4ai7aAGgmcdtfg8AydbgecuSmbcehiinaxaecdtgefydbaYSmdamaifheaicefhiaEaeaAGgmcdtfg8Aydbgecu9hmbkka8Aa3BdbaDhiaDcefhDxeka5aefydbhika5aCfaiBdba3cefg3ad9hmbkcuaDc32giaDc;j:KM;jb0EhexekazcFeasz:tjjjb8AcbhDcbhekawaecbyd1:H:cjbHjjjjbbgeBd3awcvBd2aecbaiz:tjjjbh8Aavcd4hxdnadTmbdnalTmbaxcdthEa5hYaqhealhmadhAina8AaYydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiamIdbaiIdxMUdxaiamclfIdbaiIdzMUdzaiamcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaYclfhYaecxfheamaEfhmaAcufgAmbxdkka5hmaqheadhYina8Aamydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKamclfhmaecxfheaYcufgYmbkkdnaDTmba8AhiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgmaOamIdbNUdbaicwfgmaOamIdbNUdbaicxfgmaOamIdbNUdbaiczfgmaOamIdbNUdbaicCfgmaOamIdbNUdbaic3fhiaecufgembkkcbhYawcuaDcdtgCaDcFFFFi0Egicbyd1:H:cjbHjjjjbbgeBdaawcoBd2awaicbyd1:H:cjbHjjjjbbgEBd8KaecFeaCz:tjjjbh3dnadTmbaoJbbjZJbbjZaK:vaPceSENgOaONhKaxcdthxalheinaKaec;8:G:cjbalEgmIdwa8Aa5ydbgAc32fgiIdC:tgOaONamIdbaiIdx:tgOaONamIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndna3aAcdtgifgmydbcuSmbaEaifIdbaO9ETmekamaYBdbaEaifaOUdbka5clfh5aqcxfhqaeaxfheadaYcefgY9hmbkkaba3aCzMjjjb8Acrhikaicdthiawcxfc98fheinaeaifydbcbyd:m:H:cjbH:bjjjbbaic98fgimbkkawc;Wbf8KjjjjbaDk:Pdidui99ducbhi8Jjjjjbca9Rglcbyd1:G:cjbBdKalcb8Pdj:G:cjb83izalcbydN:G:cjbBdwalcb8Pd:m:G:cjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk9DeeuabcFeaicdtz:tjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk;Bidqui998Jjjjjbc;Wb9Rgl8Kjjjjbalcxfcbc;Kbz:tjjjb8Aadcd4adfhvcehoinaogrcethoarav6mbkalcuarcdtgoarcFFFFi0Ecbyd1:H:cjbHjjjjbbgvBdxavcFeaoz:tjjjbhwdnadTmbaicd4hDarcufhqcbhkindndnawcbaeakaD2cdtfgrydlgiaicjjjj94SEgocH4ao7c:F:b:DD2cbarydbgxaxcjjjj94SEgocH4ao7c;D;O:B8J27cbarydwgmamcjjjj94SEgrcH4ar7c:3F;N8N27aqGgvcdtfgrydbgocuSmbam::hPai::hsax::hzcehiinaihrdnaeaoaD2cdtfgiIdbaz9CmbaiIdlas9CmbaiIdwaP9BmikarcefhiawavarfaqGgvcdtfgrydbgocu9hmbkkarakBdbakhokabakcdtfaoBdbakcefgkad9hmbkkalydxcbyd:m:H:cjbH:bjjjbbalc;Wbf8Kjjjjbk9teiucbcbyd:q:H:cjbgeabcifc98GfgbBd:q:H:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd:q:H:cjbgeabcrfc94GfgbBd:q:H:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd:q:H:cjbge9Rcifc98GaefgbBd:q:H:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akkk:Kedbcj:Gdk1eFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeebebbebbebebbbeebbbbbbbbbbbbeeeeeebebbeeebeebbbbebebbbbbbbbbbbbbbbbbbc1:Hdkxebbbdbbb:G:qbb";
    var wasmpack = new Uint8Array([
      32,
      0,
      65,
      2,
      1,
      106,
      34,
      33,
      3,
      128,
      11,
      4,
      13,
      64,
      6,
      253,
      10,
      7,
      15,
      116,
      127,
      5,
      8,
      12,
      40,
      16,
      19,
      54,
      20,
      9,
      27,
      255,
      113,
      17,
      42,
      67,
      24,
      23,
      146,
      148,
      18,
      14,
      22,
      45,
      70,
      69,
      56,
      114,
      101,
      21,
      25,
      63,
      75,
      136,
      108,
      28,
      118,
      29,
      73,
      115
    ]);
    if (typeof WebAssembly !== "object") {
      return {
        supported: false
      };
    }
    var instance;
    var ready = WebAssembly.instantiate(unpack(wasm), {}).then(function(result) {
      instance = result.instance;
      instance.exports.__wasm_call_ctors();
    });
    function unpack(data) {
      var result = new Uint8Array(data.length);
      for (var i = 0;i < data.length; ++i) {
        var ch = data.charCodeAt(i);
        result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
      }
      var write = 0;
      for (var i = 0;i < data.length; ++i) {
        result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
      }
      return result.buffer.slice(0, write);
    }
    function assert(cond) {
      if (!cond) {
        throw new Error("Assertion failed");
      }
    }
    function bytes(view) {
      return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
    }
    function genremap(fun, positions, vertices, stride) {
      var sbrk = instance.exports.sbrk;
      var rp = sbrk(vertices * 4);
      var sp = sbrk(vertices * stride * 4);
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(positions), sp);
      fun(rp, sp, vertices, stride * 4);
      heap = new Uint8Array(instance.exports.memory.buffer);
      var remap = new Uint32Array(vertices);
      new Uint8Array(remap.buffer).set(heap.subarray(rp, rp + vertices * 4));
      sbrk(rp - sbrk(0));
      return remap;
    }
    function reorder(fun, indices, vertices) {
      var sbrk = instance.exports.sbrk;
      var ip = sbrk(indices.length * 4);
      var rp = sbrk(vertices * 4);
      var heap = new Uint8Array(instance.exports.memory.buffer);
      var indices8 = bytes(indices);
      heap.set(indices8, ip);
      var unique = fun(rp, ip, indices.length, vertices);
      heap = new Uint8Array(instance.exports.memory.buffer);
      var remap = new Uint32Array(vertices);
      new Uint8Array(remap.buffer).set(heap.subarray(rp, rp + vertices * 4));
      sbrk(ip - sbrk(0));
      for (var i = 0;i < indices.length; ++i)
        indices[i] = remap[indices[i]];
      return [remap, unique];
    }
    function maxindex(source) {
      var result = 0;
      for (var i = 0;i < source.length; ++i) {
        var index = source[i];
        result = result < index ? index : result;
      }
      return result;
    }
    function simplify(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, target_index_count, target_error, options) {
      var sbrk = instance.exports.sbrk;
      var te2 = sbrk(4);
      var ti = sbrk(index_count * 4);
      var sp = sbrk(vertex_count * vertex_positions_stride);
      var si = sbrk(index_count * 4);
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(vertex_positions), sp);
      heap.set(bytes(indices), si);
      var result = fun(ti, si, index_count, sp, vertex_count, vertex_positions_stride, target_index_count, target_error, options, te2);
      heap = new Uint8Array(instance.exports.memory.buffer);
      var target = new Uint32Array(result);
      bytes(target).set(heap.subarray(ti, ti + result * 4));
      var error2 = new Float32Array(1);
      bytes(error2).set(heap.subarray(te2, te2 + 4));
      sbrk(te2 - sbrk(0));
      return [target, error2[0]];
    }
    function simplifyAttr(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, options) {
      var sbrk = instance.exports.sbrk;
      var te2 = sbrk(4);
      var ti = sbrk(index_count * 4);
      var sp = sbrk(vertex_count * vertex_positions_stride);
      var sa = sbrk(vertex_count * vertex_attributes_stride);
      var sw = sbrk(attribute_weights.length * 4);
      var si = sbrk(index_count * 4);
      var vl = vertex_lock ? sbrk(vertex_count) : 0;
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(vertex_positions), sp);
      heap.set(bytes(vertex_attributes), sa);
      heap.set(bytes(attribute_weights), sw);
      heap.set(bytes(indices), si);
      if (vertex_lock) {
        heap.set(bytes(vertex_lock), vl);
      }
      var result = fun(ti, si, index_count, sp, vertex_count, vertex_positions_stride, sa, vertex_attributes_stride, sw, attribute_weights.length, vl, target_index_count, target_error, options, te2);
      heap = new Uint8Array(instance.exports.memory.buffer);
      var target = new Uint32Array(result);
      bytes(target).set(heap.subarray(ti, ti + result * 4));
      var error2 = new Float32Array(1);
      bytes(error2).set(heap.subarray(te2, te2 + 4));
      sbrk(te2 - sbrk(0));
      return [target, error2[0]];
    }
    function simplifyUpdate(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, options) {
      var sbrk = instance.exports.sbrk;
      var te2 = sbrk(4);
      var sp = sbrk(vertex_count * vertex_positions_stride);
      var sa = sbrk(vertex_count * vertex_attributes_stride);
      var sw = sbrk(attribute_weights.length * 4);
      var si = sbrk(index_count * 4);
      var vl = vertex_lock ? sbrk(vertex_count) : 0;
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(vertex_positions), sp);
      heap.set(bytes(vertex_attributes), sa);
      heap.set(bytes(attribute_weights), sw);
      heap.set(bytes(indices), si);
      if (vertex_lock) {
        heap.set(bytes(vertex_lock), vl);
      }
      var result = fun(si, index_count, sp, vertex_count, vertex_positions_stride, sa, vertex_attributes_stride, sw, attribute_weights.length, vl, target_index_count, target_error, options, te2);
      heap = new Uint8Array(instance.exports.memory.buffer);
      bytes(indices).set(heap.subarray(si, si + result * 4));
      bytes(vertex_positions).set(heap.subarray(sp, sp + vertex_count * vertex_positions_stride));
      bytes(vertex_attributes).set(heap.subarray(sa, sa + vertex_count * vertex_attributes_stride));
      var error2 = new Float32Array(1);
      bytes(error2).set(heap.subarray(te2, te2 + 4));
      sbrk(te2 - sbrk(0));
      return [result, error2[0]];
    }
    function simplifyScale(fun, vertex_positions, vertex_count, vertex_positions_stride) {
      var sbrk = instance.exports.sbrk;
      var sp = sbrk(vertex_count * vertex_positions_stride);
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(vertex_positions), sp);
      var result = fun(sp, vertex_count, vertex_positions_stride);
      sbrk(sp - sbrk(0));
      return result;
    }
    function simplifyPoints(fun, vertex_positions, vertex_count, vertex_positions_stride, vertex_colors, vertex_colors_stride, color_weight, target_vertex_count) {
      var sbrk = instance.exports.sbrk;
      var ti = sbrk(target_vertex_count * 4);
      var sp = sbrk(vertex_count * vertex_positions_stride);
      var sc = vertex_colors ? sbrk(vertex_count * vertex_colors_stride) : 0;
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(vertex_positions), sp);
      if (vertex_colors) {
        heap.set(bytes(vertex_colors), sc);
      }
      var result = fun(ti, sp, vertex_count, vertex_positions_stride, sc, vertex_colors_stride, color_weight, target_vertex_count);
      heap = new Uint8Array(instance.exports.memory.buffer);
      var target = new Uint32Array(result);
      bytes(target).set(heap.subarray(ti, ti + result * 4));
      sbrk(ti - sbrk(0));
      return target;
    }
    function simplifySloppy(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, vertex_lock, target_index_count, target_error) {
      var sbrk = instance.exports.sbrk;
      var te2 = sbrk(4);
      var ti = sbrk(index_count * 4);
      var sp = sbrk(vertex_count * vertex_positions_stride);
      var si = sbrk(index_count * 4);
      var vl = vertex_lock ? sbrk(vertex_count) : 0;
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(vertex_positions), sp);
      heap.set(bytes(indices), si);
      if (vertex_lock) {
        heap.set(bytes(vertex_lock), vl);
      }
      var result = fun(ti, si, index_count, sp, vertex_count, vertex_positions_stride, vl, target_index_count, target_error, te2);
      heap = new Uint8Array(instance.exports.memory.buffer);
      var target = new Uint32Array(result);
      bytes(target).set(heap.subarray(ti, ti + result * 4));
      var error2 = new Float32Array(1);
      bytes(error2).set(heap.subarray(te2, te2 + 4));
      sbrk(te2 - sbrk(0));
      return [target, error2[0]];
    }
    function simplifyPrune(fun, indices, index_count, vertex_positions, vertex_count, vertex_positions_stride, target_error) {
      var sbrk = instance.exports.sbrk;
      var ti = sbrk(index_count * 4);
      var sp = sbrk(vertex_count * vertex_positions_stride);
      var si = sbrk(index_count * 4);
      var heap = new Uint8Array(instance.exports.memory.buffer);
      heap.set(bytes(vertex_positions), sp);
      heap.set(bytes(indices), si);
      var result = fun(ti, si, index_count, sp, vertex_count, vertex_positions_stride, target_error);
      heap = new Uint8Array(instance.exports.memory.buffer);
      var target = new Uint32Array(result);
      bytes(target).set(heap.subarray(ti, ti + result * 4));
      sbrk(ti - sbrk(0));
      return target;
    }
    var simplifyOptions = {
      LockBorder: 1,
      Sparse: 2,
      ErrorAbsolute: 4,
      Prune: 8,
      Regularize: 16,
      Permissive: 32,
      RegularizeLight: 64,
      _InternalDebug: 1 << 30
    };
    return {
      ready,
      supported: true,
      compactMesh: function(indices) {
        assert(indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array);
        assert(indices.length % 3 == 0);
        var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
        var result = reorder(instance.exports.meshopt_optimizeVertexFetchRemap, indices32, maxindex(indices) + 1);
        if (indices !== indices32) {
          for (var i = 0;i < indices32.length; ++i) {
            indices[i] = indices32[i];
          }
        }
        return result;
      },
      generatePositionRemap: function(vertex_positions, vertex_positions_stride) {
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        return genremap(instance.exports.meshopt_generatePositionRemap, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride);
      },
      simplify: function(indices, vertex_positions, vertex_positions_stride, target_index_count, target_error, flags) {
        assert(indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array);
        assert(indices.length % 3 == 0);
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        assert(target_index_count >= 0 && target_index_count <= indices.length);
        assert(target_index_count % 3 == 0);
        assert(target_error >= 0);
        var options = 0;
        for (var i = 0;i < (flags ? flags.length : 0); ++i) {
          assert(flags[i] in simplifyOptions);
          options |= simplifyOptions[flags[i]];
        }
        var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
        var result = simplify(instance.exports.meshopt_simplify, indices32, indices.length, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4, target_index_count, target_error, options);
        result[0] = indices instanceof Uint32Array ? result[0] : new indices.constructor(result[0]);
        return result;
      },
      simplifyWithAttributes: function(indices, vertex_positions, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, flags) {
        assert(indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array);
        assert(indices.length % 3 == 0);
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        assert(vertex_attributes instanceof Float32Array);
        assert(vertex_attributes.length == vertex_attributes_stride * (vertex_positions.length / vertex_positions_stride));
        assert(vertex_attributes_stride >= 0);
        assert(vertex_lock == null || vertex_lock instanceof Uint8Array);
        assert(vertex_lock == null || vertex_lock.length == vertex_positions.length / vertex_positions_stride);
        assert(target_index_count >= 0 && target_index_count <= indices.length);
        assert(target_index_count % 3 == 0);
        assert(target_error >= 0);
        assert(Array.isArray(attribute_weights));
        assert(vertex_attributes_stride >= attribute_weights.length);
        assert(attribute_weights.length <= 32);
        for (var i = 0;i < attribute_weights.length; ++i) {
          assert(attribute_weights[i] >= 0);
        }
        var options = 0;
        for (var i = 0;i < (flags ? flags.length : 0); ++i) {
          assert(flags[i] in simplifyOptions);
          options |= simplifyOptions[flags[i]];
        }
        var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
        var result = simplifyAttr(instance.exports.meshopt_simplifyWithAttributes, indices32, indices.length, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4, vertex_attributes, vertex_attributes_stride * 4, new Float32Array(attribute_weights), vertex_lock, target_index_count, target_error, options);
        result[0] = indices instanceof Uint32Array ? result[0] : new indices.constructor(result[0]);
        return result;
      },
      simplifyWithUpdate: function(indices, vertex_positions, vertex_positions_stride, vertex_attributes, vertex_attributes_stride, attribute_weights, vertex_lock, target_index_count, target_error, flags) {
        assert(indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array);
        assert(indices.length % 3 == 0);
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        assert(vertex_attributes instanceof Float32Array);
        assert(vertex_attributes.length == vertex_attributes_stride * (vertex_positions.length / vertex_positions_stride));
        assert(vertex_attributes_stride >= 0);
        assert(vertex_lock == null || vertex_lock instanceof Uint8Array);
        assert(vertex_lock == null || vertex_lock.length == vertex_positions.length / vertex_positions_stride);
        assert(target_index_count >= 0 && target_index_count <= indices.length);
        assert(target_index_count % 3 == 0);
        assert(target_error >= 0);
        assert(Array.isArray(attribute_weights));
        assert(vertex_attributes_stride >= attribute_weights.length);
        assert(attribute_weights.length <= 32);
        for (var i = 0;i < attribute_weights.length; ++i) {
          assert(attribute_weights[i] >= 0);
        }
        var options = 0;
        for (var i = 0;i < (flags ? flags.length : 0); ++i) {
          assert(flags[i] in simplifyOptions);
          options |= simplifyOptions[flags[i]];
        }
        var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
        var result = simplifyUpdate(instance.exports.meshopt_simplifyWithUpdate, indices32, indices.length, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4, vertex_attributes, vertex_attributes_stride * 4, new Float32Array(attribute_weights), vertex_lock, target_index_count, target_error, options);
        if (indices !== indices32) {
          for (var i = 0;i < result[0]; ++i) {
            indices[i] = indices32[i];
          }
        }
        return result;
      },
      getScale: function(vertex_positions, vertex_positions_stride) {
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        return simplifyScale(instance.exports.meshopt_simplifyScale, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4);
      },
      simplifyPoints: function(vertex_positions, vertex_positions_stride, target_vertex_count, vertex_colors, vertex_colors_stride, color_weight) {
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        assert(target_vertex_count >= 0 && target_vertex_count <= vertex_positions.length / vertex_positions_stride);
        if (vertex_colors) {
          assert(vertex_colors instanceof Float32Array);
          assert(vertex_colors.length % vertex_colors_stride == 0);
          assert(vertex_colors_stride >= 3);
          assert(vertex_positions.length / vertex_positions_stride == vertex_colors.length / vertex_colors_stride);
          return simplifyPoints(instance.exports.meshopt_simplifyPoints, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4, vertex_colors, vertex_colors_stride * 4, color_weight || 0, target_vertex_count);
        } else {
          return simplifyPoints(instance.exports.meshopt_simplifyPoints, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4, undefined, 0, 0, target_vertex_count);
        }
      },
      simplifySloppy: function(indices, vertex_positions, vertex_positions_stride, vertex_lock, target_index_count, target_error) {
        assert(indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array);
        assert(indices.length % 3 == 0);
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        assert(vertex_lock == null || vertex_lock instanceof Uint8Array);
        assert(vertex_lock == null || vertex_lock.length == vertex_positions.length / vertex_positions_stride);
        assert(target_index_count >= 0 && target_index_count <= indices.length);
        assert(target_index_count % 3 == 0);
        assert(target_error >= 0);
        var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
        var result = simplifySloppy(instance.exports.meshopt_simplifySloppy, indices32, indices.length, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4, vertex_lock, target_index_count, target_error);
        result[0] = indices instanceof Uint32Array ? result[0] : new indices.constructor(result[0]);
        return result;
      },
      simplifyPrune: function(indices, vertex_positions, vertex_positions_stride, target_error) {
        assert(indices instanceof Uint32Array || indices instanceof Int32Array || indices instanceof Uint16Array || indices instanceof Int16Array);
        assert(indices.length % 3 == 0);
        assert(vertex_positions instanceof Float32Array);
        assert(vertex_positions.length % vertex_positions_stride == 0);
        assert(vertex_positions_stride >= 3);
        assert(target_error >= 0);
        var indices32 = indices.BYTES_PER_ELEMENT == 4 ? indices : new Uint32Array(indices);
        var result = simplifyPrune(instance.exports.meshopt_simplifyPrune, indices32, indices.length, vertex_positions, vertex_positions.length / vertex_positions_stride, vertex_positions_stride * 4, target_error);
        result = indices instanceof Uint32Array ? result : new indices.constructor(result);
        return result;
      }
    };
  }();
});

// node_modules/.bun/three@0.186.1/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
var exports_BufferGeometryUtils = {};
__export(exports_BufferGeometryUtils, {
  toTrianglesDrawMode: () => toTrianglesDrawMode,
  toCreasedNormals: () => toCreasedNormals,
  mergeVertices: () => mergeVertices,
  mergeGroups: () => mergeGroups,
  mergeGeometries: () => mergeGeometries,
  mergeAttributes: () => mergeAttributes,
  interleaveAttributes: () => interleaveAttributes,
  estimateBytesUsed: () => estimateBytesUsed,
  deinterleaveGeometry: () => deinterleaveGeometry,
  deinterleaveAttribute: () => deinterleaveAttribute,
  deepCloneAttribute: () => deepCloneAttribute,
  computeMorphedAttributes: () => computeMorphedAttributes,
  computeMikkTSpaceTangents: () => computeMikkTSpaceTangents
});
import {
  BufferAttribute,
  BufferGeometry as BufferGeometry2,
  Float32BufferAttribute,
  InstancedBufferAttribute,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  TriangleFanDrawMode,
  TriangleStripDrawMode,
  TrianglesDrawMode,
  Vector3
} from "three";
function computeMikkTSpaceTangents(geometry, MikkTSpace, negateSign = true) {
  if (!MikkTSpace || !MikkTSpace.isReady) {
    throw new Error("THREE.BufferGeometryUtils: Initialized MikkTSpace library required.");
  }
  if (!geometry.hasAttribute("position") || !geometry.hasAttribute("normal") || !geometry.hasAttribute("uv")) {
    throw new Error('THREE.BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.');
  }
  function getAttributeArray(attribute) {
    if (attribute.normalized || attribute.isInterleavedBufferAttribute) {
      const dstArray = new Float32Array(attribute.count * attribute.itemSize);
      for (let i = 0, j2 = 0;i < attribute.count; i++) {
        dstArray[j2++] = attribute.getX(i);
        dstArray[j2++] = attribute.getY(i);
        if (attribute.itemSize > 2) {
          dstArray[j2++] = attribute.getZ(i);
        }
      }
      return dstArray;
    }
    if (attribute.array instanceof Float32Array) {
      return attribute.array;
    }
    return new Float32Array(attribute.array);
  }
  const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;
  const tangents = MikkTSpace.generateTangents(getAttributeArray(_geometry.attributes.position), getAttributeArray(_geometry.attributes.normal), getAttributeArray(_geometry.attributes.uv));
  if (negateSign) {
    for (let i = 3;i < tangents.length; i += 4) {
      tangents[i] *= -1;
    }
  }
  _geometry.setAttribute("tangent", new BufferAttribute(tangents, 4));
  if (geometry !== _geometry) {
    geometry.copy(_geometry);
  }
  return geometry;
}
function mergeGeometries(geometries, useGroups = false) {
  const isIndexed = geometries[0].index !== null;
  const attributesUsed = new Set(Object.keys(geometries[0].attributes));
  const morphAttributesUsed = new Set(Object.keys(geometries[0].morphAttributes));
  const attributes = {};
  const morphAttributes = {};
  const morphTargetsRelative = geometries[0].morphTargetsRelative;
  const mergedGeometry = new BufferGeometry2;
  let offset = 0;
  for (let i = 0;i < geometries.length; ++i) {
    const geometry = geometries[i];
    let attributesCount = 0;
    if (isIndexed !== (geometry.index !== null)) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");
      return null;
    }
    for (const name in geometry.attributes) {
      if (!attributesUsed.has(name)) {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.');
        return null;
      }
      if (attributes[name] === undefined)
        attributes[name] = [];
      attributes[name].push(geometry.attributes[name]);
      attributesCount++;
    }
    if (attributesCount !== attributesUsed.size) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". Make sure all geometries have the same number of attributes.");
      return null;
    }
    if (morphTargetsRelative !== geometry.morphTargetsRelative) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". .morphTargetsRelative must be consistent throughout all geometries.");
      return null;
    }
    for (const name in geometry.morphAttributes) {
      if (!morphAttributesUsed.has(name)) {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ".  .morphAttributes must be consistent throughout all geometries.");
        return null;
      }
      if (morphAttributes[name] === undefined)
        morphAttributes[name] = [];
      morphAttributes[name].push(geometry.morphAttributes[name]);
    }
    if (useGroups) {
      let count;
      if (isIndexed) {
        count = geometry.index.count;
      } else if (geometry.attributes.position !== undefined) {
        count = geometry.attributes.position.count;
      } else {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". The geometry must have either an index or a position attribute");
        return null;
      }
      mergedGeometry.addGroup(offset, count, i);
      offset += count;
    }
  }
  if (isIndexed) {
    let indexOffset = 0;
    const mergedIndex = [];
    for (let i = 0;i < geometries.length; ++i) {
      const index = geometries[i].index;
      for (let j2 = 0;j2 < index.count; ++j2) {
        mergedIndex.push(index.getX(j2) + indexOffset);
      }
      indexOffset += geometries[i].attributes.position.count;
    }
    mergedGeometry.setIndex(mergedIndex);
  }
  for (const name in attributes) {
    const mergedAttribute = mergeAttributes(attributes[name]);
    if (!mergedAttribute) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " attribute.");
      return null;
    }
    mergedGeometry.setAttribute(name, mergedAttribute);
  }
  for (const name in morphAttributes) {
    const numMorphTargets = morphAttributes[name][0].length;
    if (numMorphTargets === 0)
      continue;
    mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
    mergedGeometry.morphAttributes[name] = [];
    for (let i = 0;i < numMorphTargets; ++i) {
      const morphAttributesToMerge = [];
      for (let j2 = 0;j2 < morphAttributes[name].length; ++j2) {
        morphAttributesToMerge.push(morphAttributes[name][j2][i]);
      }
      const mergedMorphAttribute = mergeAttributes(morphAttributesToMerge);
      if (!mergedMorphAttribute) {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " morphAttribute.");
        return null;
      }
      mergedGeometry.morphAttributes[name].push(mergedMorphAttribute);
    }
  }
  return mergedGeometry;
}
function mergeAttributes(attributes) {
  let TypedArray;
  let itemSize;
  let normalized;
  let gpuType = -1;
  let arrayLength = 0;
  for (let i = 0;i < attributes.length; ++i) {
    const attribute = attributes[i];
    if (TypedArray === undefined)
      TypedArray = attribute.array.constructor;
    if (TypedArray !== attribute.array.constructor) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.");
      return null;
    }
    if (itemSize === undefined)
      itemSize = attribute.itemSize;
    if (itemSize !== attribute.itemSize) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.");
      return null;
    }
    if (normalized === undefined)
      normalized = attribute.normalized;
    if (normalized !== attribute.normalized) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.");
      return null;
    }
    if (gpuType === -1)
      gpuType = attribute.gpuType;
    if (gpuType !== attribute.gpuType) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.");
      return null;
    }
    arrayLength += attribute.count * itemSize;
  }
  const array = new TypedArray(arrayLength);
  const result = new BufferAttribute(array, itemSize, normalized);
  let offset = 0;
  for (let i = 0;i < attributes.length; ++i) {
    const attribute = attributes[i];
    if (attribute.isInterleavedBufferAttribute) {
      const tupleOffset = offset / itemSize;
      for (let j2 = 0, l = attribute.count;j2 < l; j2++) {
        for (let c2 = 0;c2 < itemSize; c2++) {
          const value = attribute.getComponent(j2, c2);
          result.setComponent(j2 + tupleOffset, c2, value);
        }
      }
    } else {
      array.set(attribute.array, offset);
    }
    offset += attribute.count * itemSize;
  }
  if (gpuType !== undefined) {
    result.gpuType = gpuType;
  }
  return result;
}
function deepCloneAttribute(attribute) {
  if (attribute.isInstancedInterleavedBufferAttribute || attribute.isInterleavedBufferAttribute) {
    return deinterleaveAttribute(attribute);
  }
  if (attribute.isInstancedBufferAttribute) {
    return new InstancedBufferAttribute().copy(attribute);
  }
  return new BufferAttribute().copy(attribute);
}
function interleaveAttributes(attributes) {
  let TypedArray;
  let arrayLength = 0;
  let stride = 0;
  for (let i = 0, l = attributes.length;i < l; ++i) {
    const attribute = attributes[i];
    if (TypedArray === undefined)
      TypedArray = attribute.array.constructor;
    if (TypedArray !== attribute.array.constructor) {
      console.error("AttributeBuffers of different types cannot be interleaved");
      return null;
    }
    arrayLength += attribute.array.length;
    stride += attribute.itemSize;
  }
  const interleavedBuffer = new InterleavedBuffer(new TypedArray(arrayLength), stride);
  let offset = 0;
  const res = [];
  const getters = ["getX", "getY", "getZ", "getW"];
  const setters = ["setX", "setY", "setZ", "setW"];
  for (let j2 = 0, l = attributes.length;j2 < l; j2++) {
    const attribute = attributes[j2];
    const itemSize = attribute.itemSize;
    const count = attribute.count;
    const iba = new InterleavedBufferAttribute(interleavedBuffer, itemSize, offset, attribute.normalized);
    res.push(iba);
    offset += itemSize;
    for (let c2 = 0;c2 < count; c2++) {
      for (let k2 = 0;k2 < itemSize; k2++) {
        iba[setters[k2]](c2, attribute[getters[k2]](c2));
      }
    }
  }
  return res;
}
function deinterleaveAttribute(attribute) {
  const cons = attribute.data.array.constructor;
  const count = attribute.count;
  const itemSize = attribute.itemSize;
  const normalized = attribute.normalized;
  const array = new cons(count * itemSize);
  let newAttribute;
  if (attribute.isInstancedInterleavedBufferAttribute) {
    newAttribute = new InstancedBufferAttribute(array, itemSize, normalized, attribute.meshPerAttribute);
  } else {
    newAttribute = new BufferAttribute(array, itemSize, normalized);
  }
  for (let i = 0;i < count; i++) {
    newAttribute.setX(i, attribute.getX(i));
    if (itemSize >= 2) {
      newAttribute.setY(i, attribute.getY(i));
    }
    if (itemSize >= 3) {
      newAttribute.setZ(i, attribute.getZ(i));
    }
    if (itemSize >= 4) {
      newAttribute.setW(i, attribute.getW(i));
    }
  }
  return newAttribute;
}
function deinterleaveGeometry(geometry) {
  const attributes = geometry.attributes;
  const morphTargets = geometry.morphTargets;
  const attrMap = new Map;
  for (const key2 in attributes) {
    const attr = attributes[key2];
    if (attr.isInterleavedBufferAttribute) {
      if (!attrMap.has(attr)) {
        attrMap.set(attr, deinterleaveAttribute(attr));
      }
      attributes[key2] = attrMap.get(attr);
    }
  }
  for (const key2 in morphTargets) {
    const attr = morphTargets[key2];
    if (attr.isInterleavedBufferAttribute) {
      if (!attrMap.has(attr)) {
        attrMap.set(attr, deinterleaveAttribute(attr));
      }
      morphTargets[key2] = attrMap.get(attr);
    }
  }
}
function estimateBytesUsed(geometry) {
  let mem = 0;
  for (const name in geometry.attributes) {
    const attr = geometry.getAttribute(name);
    mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;
  }
  const indices = geometry.getIndex();
  mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
  return mem;
}
function mergeVertices(geometry, tolerance = 0.0001) {
  tolerance = Math.max(tolerance, Number.EPSILON);
  const hashToIndex = {};
  const indices = geometry.getIndex();
  const positions = geometry.getAttribute("position");
  const vertexCount = indices ? indices.count : positions.count;
  let nextIndex = 0;
  const attributeNames = Object.keys(geometry.attributes);
  const tmpAttributes = {};
  const tmpMorphAttributes = {};
  const newIndices = [];
  const getters = ["getX", "getY", "getZ", "getW"];
  const setters = ["setX", "setY", "setZ", "setW"];
  for (let i = 0, l = attributeNames.length;i < l; i++) {
    const name = attributeNames[i];
    const attr = geometry.attributes[name];
    tmpAttributes[name] = new attr.constructor(new attr.array.constructor(attr.count * attr.itemSize), attr.itemSize, attr.normalized);
    const morphAttributes = geometry.morphAttributes[name];
    if (morphAttributes) {
      if (!tmpMorphAttributes[name])
        tmpMorphAttributes[name] = [];
      morphAttributes.forEach((morphAttr, i2) => {
        const array = new morphAttr.array.constructor(morphAttr.count * morphAttr.itemSize);
        tmpMorphAttributes[name][i2] = new morphAttr.constructor(array, morphAttr.itemSize, morphAttr.normalized);
      });
    }
  }
  const halfTolerance = tolerance * 0.5;
  const exponent = Math.log10(1 / tolerance);
  const hashMultiplier = Math.pow(10, exponent);
  const hashAdditive = halfTolerance * hashMultiplier;
  for (let i = 0;i < vertexCount; i++) {
    const index = indices ? indices.getX(i) : i;
    let hash = "";
    for (let j2 = 0, l = attributeNames.length;j2 < l; j2++) {
      const name = attributeNames[j2];
      const attribute = geometry.getAttribute(name);
      const itemSize = attribute.itemSize;
      for (let k2 = 0;k2 < itemSize; k2++) {
        hash += `${Math.trunc(attribute[getters[k2]](index) * hashMultiplier + hashAdditive)},`;
      }
    }
    if (hash in hashToIndex) {
      newIndices.push(hashToIndex[hash]);
    } else {
      for (let j2 = 0, l = attributeNames.length;j2 < l; j2++) {
        const name = attributeNames[j2];
        const attribute = geometry.getAttribute(name);
        const morphAttributes = geometry.morphAttributes[name];
        const itemSize = attribute.itemSize;
        const newArray = tmpAttributes[name];
        const newMorphArrays = tmpMorphAttributes[name];
        for (let k2 = 0;k2 < itemSize; k2++) {
          const getterFunc = getters[k2];
          const setterFunc = setters[k2];
          newArray[setterFunc](nextIndex, attribute[getterFunc](index));
          if (morphAttributes) {
            for (let m2 = 0, ml = morphAttributes.length;m2 < ml; m2++) {
              newMorphArrays[m2][setterFunc](nextIndex, morphAttributes[m2][getterFunc](index));
            }
          }
        }
      }
      hashToIndex[hash] = nextIndex;
      newIndices.push(nextIndex);
      nextIndex++;
    }
  }
  const result = geometry.clone();
  for (const name in geometry.attributes) {
    const tmpAttribute = tmpAttributes[name];
    result.setAttribute(name, new tmpAttribute.constructor(tmpAttribute.array.slice(0, nextIndex * tmpAttribute.itemSize), tmpAttribute.itemSize, tmpAttribute.normalized));
    if (!(name in tmpMorphAttributes))
      continue;
    for (let j2 = 0;j2 < tmpMorphAttributes[name].length; j2++) {
      const tmpMorphAttribute = tmpMorphAttributes[name][j2];
      result.morphAttributes[name][j2] = new tmpMorphAttribute.constructor(tmpMorphAttribute.array.slice(0, nextIndex * tmpMorphAttribute.itemSize), tmpMorphAttribute.itemSize, tmpMorphAttribute.normalized);
    }
  }
  result.setIndex(newIndices);
  return result;
}
function toTrianglesDrawMode(geometry, drawMode) {
  if (drawMode === TrianglesDrawMode) {
    console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.");
    return geometry;
  }
  if (drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode) {
    let index = geometry.getIndex();
    if (index === null) {
      const indices = [];
      const position = geometry.getAttribute("position");
      if (position !== undefined) {
        for (let i = 0;i < position.count; i++) {
          indices.push(i);
        }
        geometry.setIndex(indices);
        index = geometry.getIndex();
      } else {
        console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
        return geometry;
      }
    }
    const numberOfTriangles = index.count - 2;
    const newIndices = [];
    if (drawMode === TriangleFanDrawMode) {
      for (let i = 1;i <= numberOfTriangles; i++) {
        newIndices.push(index.getX(0));
        newIndices.push(index.getX(i));
        newIndices.push(index.getX(i + 1));
      }
    } else {
      for (let i = 0;i < numberOfTriangles; i++) {
        if (i % 2 === 0) {
          newIndices.push(index.getX(i));
          newIndices.push(index.getX(i + 1));
          newIndices.push(index.getX(i + 2));
        } else {
          newIndices.push(index.getX(i + 2));
          newIndices.push(index.getX(i + 1));
          newIndices.push(index.getX(i));
        }
      }
    }
    if (newIndices.length / 3 !== numberOfTriangles) {
      console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    }
    geometry.setIndex(newIndices);
    geometry.clearGroups();
    return geometry;
  } else {
    console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", drawMode);
    return geometry;
  }
}
function computeMorphedAttributes(object) {
  const _vA = new Vector3;
  const _vB = new Vector3;
  const _vC = new Vector3;
  const _tempA = new Vector3;
  const _tempB = new Vector3;
  const _tempC = new Vector3;
  const _morphA = new Vector3;
  const _morphB = new Vector3;
  const _morphC = new Vector3;
  function _calculateMorphedAttributeData(object2, attribute, morphAttribute, morphTargetsRelative2, a2, b2, c3, modifiedAttributeArray) {
    _vA.fromBufferAttribute(attribute, a2);
    _vB.fromBufferAttribute(attribute, b2);
    _vC.fromBufferAttribute(attribute, c3);
    const morphInfluences = object2.morphTargetInfluences;
    if (morphAttribute && morphInfluences) {
      _morphA.set(0, 0, 0);
      _morphB.set(0, 0, 0);
      _morphC.set(0, 0, 0);
      for (let i2 = 0, il2 = morphAttribute.length;i2 < il2; i2++) {
        const influence = morphInfluences[i2];
        const morph = morphAttribute[i2];
        if (influence === 0)
          continue;
        _tempA.fromBufferAttribute(morph, a2);
        _tempB.fromBufferAttribute(morph, b2);
        _tempC.fromBufferAttribute(morph, c3);
        if (morphTargetsRelative2) {
          _morphA.addScaledVector(_tempA, influence);
          _morphB.addScaledVector(_tempB, influence);
          _morphC.addScaledVector(_tempC, influence);
        } else {
          _morphA.addScaledVector(_tempA.sub(_vA), influence);
          _morphB.addScaledVector(_tempB.sub(_vB), influence);
          _morphC.addScaledVector(_tempC.sub(_vC), influence);
        }
      }
      _vA.add(_morphA);
      _vB.add(_morphB);
      _vC.add(_morphC);
    }
    if (object2.isSkinnedMesh) {
      object2.applyBoneTransform(a2, _vA);
      object2.applyBoneTransform(b2, _vB);
      object2.applyBoneTransform(c3, _vC);
    }
    modifiedAttributeArray[a2 * 3 + 0] = _vA.x;
    modifiedAttributeArray[a2 * 3 + 1] = _vA.y;
    modifiedAttributeArray[a2 * 3 + 2] = _vA.z;
    modifiedAttributeArray[b2 * 3 + 0] = _vB.x;
    modifiedAttributeArray[b2 * 3 + 1] = _vB.y;
    modifiedAttributeArray[b2 * 3 + 2] = _vB.z;
    modifiedAttributeArray[c3 * 3 + 0] = _vC.x;
    modifiedAttributeArray[c3 * 3 + 1] = _vC.y;
    modifiedAttributeArray[c3 * 3 + 2] = _vC.z;
  }
  const geometry = object.geometry;
  const material = object.material;
  let a, b, c2;
  const index = geometry.index;
  const positionAttribute = geometry.attributes.position;
  const morphPosition = geometry.morphAttributes.position;
  const morphTargetsRelative = geometry.morphTargetsRelative;
  const normalAttribute = geometry.attributes.normal;
  const morphNormal = geometry.morphAttributes.normal;
  const groups2 = geometry.groups;
  const drawRange = geometry.drawRange;
  let i, j2, il, jl;
  let group;
  let start2, end;
  const modifiedPosition = new Float32Array(positionAttribute.count * positionAttribute.itemSize);
  const modifiedNormal = new Float32Array(normalAttribute.count * normalAttribute.itemSize);
  if (index !== null) {
    if (Array.isArray(material)) {
      for (i = 0, il = groups2.length;i < il; i++) {
        group = groups2[i];
        start2 = Math.max(group.start, drawRange.start);
        end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
        for (j2 = start2, jl = end;j2 < jl; j2 += 3) {
          a = index.getX(j2);
          b = index.getX(j2 + 1);
          c2 = index.getX(j2 + 2);
          _calculateMorphedAttributeData(object, positionAttribute, morphPosition, morphTargetsRelative, a, b, c2, modifiedPosition);
          _calculateMorphedAttributeData(object, normalAttribute, morphNormal, morphTargetsRelative, a, b, c2, modifiedNormal);
        }
      }
    } else {
      start2 = Math.max(0, drawRange.start);
      end = Math.min(index.count, drawRange.start + drawRange.count);
      for (i = start2, il = end;i < il; i += 3) {
        a = index.getX(i);
        b = index.getX(i + 1);
        c2 = index.getX(i + 2);
        _calculateMorphedAttributeData(object, positionAttribute, morphPosition, morphTargetsRelative, a, b, c2, modifiedPosition);
        _calculateMorphedAttributeData(object, normalAttribute, morphNormal, morphTargetsRelative, a, b, c2, modifiedNormal);
      }
    }
  } else {
    if (Array.isArray(material)) {
      for (i = 0, il = groups2.length;i < il; i++) {
        group = groups2[i];
        start2 = Math.max(group.start, drawRange.start);
        end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
        for (j2 = start2, jl = end;j2 < jl; j2 += 3) {
          a = j2;
          b = j2 + 1;
          c2 = j2 + 2;
          _calculateMorphedAttributeData(object, positionAttribute, morphPosition, morphTargetsRelative, a, b, c2, modifiedPosition);
          _calculateMorphedAttributeData(object, normalAttribute, morphNormal, morphTargetsRelative, a, b, c2, modifiedNormal);
        }
      }
    } else {
      start2 = Math.max(0, drawRange.start);
      end = Math.min(positionAttribute.count, drawRange.start + drawRange.count);
      for (i = start2, il = end;i < il; i += 3) {
        a = i;
        b = i + 1;
        c2 = i + 2;
        _calculateMorphedAttributeData(object, positionAttribute, morphPosition, morphTargetsRelative, a, b, c2, modifiedPosition);
        _calculateMorphedAttributeData(object, normalAttribute, morphNormal, morphTargetsRelative, a, b, c2, modifiedNormal);
      }
    }
  }
  const morphedPositionAttribute = new Float32BufferAttribute(modifiedPosition, 3);
  const morphedNormalAttribute = new Float32BufferAttribute(modifiedNormal, 3);
  return {
    positionAttribute,
    normalAttribute,
    morphedPositionAttribute,
    morphedNormalAttribute
  };
}
function mergeGroups(geometry) {
  if (geometry.groups.length === 0) {
    console.warn("THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.");
    return geometry;
  }
  let groups2 = geometry.groups;
  groups2 = groups2.sort((a, b) => {
    if (a.materialIndex !== b.materialIndex)
      return a.materialIndex - b.materialIndex;
    return a.start - b.start;
  });
  if (geometry.getIndex() === null) {
    const positionAttribute = geometry.getAttribute("position");
    const indices = [];
    for (let i = 0;i < positionAttribute.count; i += 3) {
      indices.push(i, i + 1, i + 2);
    }
    geometry.setIndex(indices);
  }
  const index = geometry.getIndex();
  const newIndices = [];
  for (let i = 0;i < groups2.length; i++) {
    const group = groups2[i];
    const groupStart = group.start;
    const groupLength = groupStart + group.count;
    for (let j2 = groupStart;j2 < groupLength; j2++) {
      newIndices.push(index.getX(j2));
    }
  }
  geometry.dispose();
  geometry.setIndex(newIndices);
  let start2 = 0;
  for (let i = 0;i < groups2.length; i++) {
    const group = groups2[i];
    group.start = start2;
    start2 += group.count;
  }
  let currentGroup = groups2[0];
  geometry.groups = [currentGroup];
  for (let i = 1;i < groups2.length; i++) {
    const group = groups2[i];
    if (currentGroup.materialIndex === group.materialIndex) {
      currentGroup.count += group.count;
    } else {
      currentGroup = group;
      geometry.groups.push(currentGroup);
    }
  }
  return geometry;
}
function toCreasedNormals(geometry, creaseAngle = Math.PI / 3) {
  const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
  const posAttr = resultGeometry.attributes.position;
  const vertexCount = posAttr.count;
  let positions;
  if (posAttr.isBufferAttribute === true && posAttr.itemSize === 3 && posAttr.normalized === false) {
    positions = posAttr.array;
  } else {
    positions = new Float64Array(vertexCount * 3);
    for (let i = 0;i < vertexCount; i++) {
      positions[3 * i + 0] = posAttr.getX(i);
      positions[3 * i + 1] = posAttr.getY(i);
      positions[3 * i + 2] = posAttr.getZ(i);
    }
  }
  const creaseDot = Math.cos(creaseAngle);
  const hashMultiplier = (1 + 0.0000000001) * 100;
  const faceCount = vertexCount / 3;
  const faceNormals = new Float64Array(faceCount * 3);
  for (let f2 = 0;f2 < faceCount; f2++) {
    const f9 = 9 * f2;
    const ax = positions[f9 + 0], ay = positions[f9 + 1], az = positions[f9 + 2];
    const bx = positions[f9 + 3], by = positions[f9 + 4], bz = positions[f9 + 5];
    const cx = positions[f9 + 6], cy = positions[f9 + 7], cz = positions[f9 + 8];
    const v1x = cx - bx, v1y = cy - by, v1z = cz - bz;
    const v2x = ax - bx, v2y = ay - by, v2z = az - bz;
    const nx = v1y * v2z - v1z * v2y;
    const ny = v1z * v2x - v1x * v2z;
    const nz = v1x * v2y - v1y * v2x;
    const invLength = 1 / (Math.sqrt(nx * nx + ny * ny + nz * nz) || 1);
    faceNormals[3 * f2 + 0] = nx * invLength;
    faceNormals[3 * f2 + 1] = ny * invLength;
    faceNormals[3 * f2 + 2] = nz * invLength;
  }
  const vertexIds = new Int32Array(vertexCount);
  const quantized = new Float64Array(vertexCount * 3);
  let tableSize = 1;
  while (tableSize < vertexCount * 2)
    tableSize <<= 1;
  const tableMask = tableSize - 1;
  const table = new Int32Array(tableSize);
  let uniqueCount = 0;
  for (let i = 0;i < vertexCount; i++) {
    const i3 = 3 * i;
    const qx = Math.trunc(positions[i3 + 0] * hashMultiplier);
    const qy = Math.trunc(positions[i3 + 1] * hashMultiplier);
    const qz = Math.trunc(positions[i3 + 2] * hashMultiplier);
    let slot = (Math.imul(qx, 73856093) ^ Math.imul(qy, 19349663) ^ Math.imul(qz, 83492791)) & tableMask;
    while (true) {
      const id = table[slot];
      if (id === 0) {
        const q32 = 3 * uniqueCount;
        quantized[q32 + 0] = qx;
        quantized[q32 + 1] = qy;
        quantized[q32 + 2] = qz;
        table[slot] = uniqueCount + 1;
        vertexIds[i] = uniqueCount++;
        break;
      }
      const q3 = 3 * (id - 1);
      if (quantized[q3 + 0] === qx && quantized[q3 + 1] === qy && quantized[q3 + 2] === qz) {
        vertexIds[i] = id - 1;
        break;
      }
      slot = slot + 1 & tableMask;
    }
  }
  const bucketOffsets = new Int32Array(uniqueCount + 1);
  for (let i = 0;i < vertexCount; i++)
    bucketOffsets[vertexIds[i] + 1]++;
  for (let i = 0;i < uniqueCount; i++)
    bucketOffsets[i + 1] += bucketOffsets[i];
  const bucketFaces = new Int32Array(vertexCount);
  const bucketCursors = bucketOffsets.slice(0, uniqueCount);
  for (let f2 = 0;f2 < faceCount; f2++) {
    const f3 = 3 * f2;
    bucketFaces[bucketCursors[vertexIds[f3 + 0]]++] = f2;
    bucketFaces[bucketCursors[vertexIds[f3 + 1]]++] = f2;
    bucketFaces[bucketCursors[vertexIds[f3 + 2]]++] = f2;
  }
  const normalArray = new Float32Array(vertexCount * 3);
  for (let f2 = 0;f2 < faceCount; f2++) {
    const f3 = 3 * f2;
    const nx = faceNormals[f3 + 0];
    const ny = faceNormals[f3 + 1];
    const nz = faceNormals[f3 + 2];
    for (let n = 0;n < 3; n++) {
      const i = f3 + n;
      const id = vertexIds[i];
      let sumX = 0, sumY = 0, sumZ = 0;
      for (let k2 = bucketOffsets[id], end = bucketOffsets[id + 1];k2 < end; k2++) {
        const o3 = 3 * bucketFaces[k2];
        const ox = faceNormals[o3 + 0];
        const oy = faceNormals[o3 + 1];
        const oz = faceNormals[o3 + 2];
        if (nx * ox + ny * oy + nz * oz > creaseDot) {
          sumX += ox;
          sumY += oy;
          sumZ += oz;
        }
      }
      const invLength = 1 / (Math.sqrt(sumX * sumX + sumY * sumY + sumZ * sumZ) || 1);
      normalArray[3 * i + 0] = sumX * invLength;
      normalArray[3 * i + 1] = sumY * invLength;
      normalArray[3 * i + 2] = sumZ * invLength;
    }
  }
  resultGeometry.setAttribute("normal", new BufferAttribute(normalArray, 3, false));
  return resultGeometry;
}
var init_BufferGeometryUtils = () => {};

// runtime/src/index.ts
import { ShaderMaterial, WebGLRenderTarget, Color, Raycaster, Vector3 as Vector33 } from "three";

// runtime/src/resolution.ts
var WINDOW = 30;
var DOWN_AFTER = 30;
var UP_AFTER = 120;
var STEP = 0.125;
var MIN = 0.5;
var budget = 16.7;
var start = 1;
var ours = 1;
var frame = 0;
var over = 0;
var under = 0;
var samples = [];
var changes = [];
var resolution = {
  enable(r, opts) {
    budget = opts?.frameMs ?? 16.7;
    start = ours = r.getPixelRatio();
    frame = over = under = 0;
    samples = [];
  },
  disable(r) {
    if (r.getPixelRatio() === ours)
      r.setPixelRatio(start);
  },
  after(r, ms) {
    frame++;
    const now = r.getPixelRatio();
    if (now !== ours) {
      start = ours = now;
      over = under = 0;
      samples = [];
    }
    samples.push(ms);
    if (samples.length > WINDOW)
      samples.shift();
    if (samples.length < WINDOW)
      return;
    const median = [...samples].sort((a, b) => a - b)[WINDOW >> 1];
    over = median > budget * 1.1 ? over + 1 : 0;
    under = median < budget * 0.7 ? under + 1 : 0;
    if (over >= DOWN_AFTER)
      step(r, -STEP, median);
    else if (under >= UP_AFTER)
      step(r, STEP, median);
  },
  status: () => ({ frameMs: budget, changes })
};
function step(r, d, median) {
  over = under = 0;
  samples = [];
  const from = r.getPixelRatio();
  r.setPixelRatio(Math.min(Math.max(from + d, MIN), Math.max(devicePixelRatio, start)));
  const to = ours = r.getPixelRatio();
  if (to !== from)
    changes = [...changes, { frame, from, to, medianMs: +median.toFixed(2) }].slice(-20);
}

// runtime/src/instancing.ts
import { BufferGeometry, Object3D, ShaderChunk } from "three";
var PASS_EVERY = 120;
var MIN_GROUP = 20;
var IM = null;
var draw = null;
var frame2 = 0;
var bypass = false;
var loading = false;
var error = "";
var groups = new Map;
var grouped = new Map;
var still = new WeakMap;
var scenes = new Set;
var changes2 = [];
var BASE = Object3D.prototype;
var key = (o) => `${o.geometry.uuid}|${o.material.uuid}|${+o.material.transparent}${+o.castShadow}${+o.receiveShadow}${+o.frustumCulled}|${o.layers.mask}|${o.renderOrder}`;
var same = (a, b) => {
  for (let i = 0;i < 16; i++)
    if (a[i] !== b[i])
      return false;
  return true;
};
var note = (c2) => {
  changes2 = [...changes2, { frame: frame2, ...c2 }].slice(-20);
};
function candidate(o) {
  const m2 = o.material;
  return o.isMesh && !o.isInstancedMesh && !o.isSkinnedMesh && !o.isBatchedMesh && !grouped.has(o) && !Array.isArray(m2) && !m2.isShaderMaterial && !m2.transparent && !o.morphTargetInfluences?.length && o.onBeforeRender === BASE.onBeforeRender && o.onBeforeShadow === BASE.onBeforeShadow;
}
function shown(o, scene) {
  let vis = o.visible;
  while (o.parent) {
    o = o.parent;
    vis &&= o.visible;
  }
  return o === scene ? vis : null;
}
var instancing = {
  enable(r) {
    if (!loading) {
      loading = true;
      const chunks = ShaderChunk, morph = chunks.morphinstance_vertex;
      Promise.resolve().then(() => (init_build2(), exports_build)).then((m2) => {
        IM = m2.InstancedMesh2;
        if (morph)
          chunks.morphinstance_vertex = `#ifdef USE_INSTANCING_INDIRECT
${chunks.morphinstance_vertex}
#else
${morph}
#endif`;
      }).catch((e) => {
        error = `instanced-mesh did not load: ${e?.message ?? e}`;
      });
    }
    draw = r.renderBufferDirect;
    r.renderBufferDirect = function(...a) {
      if (bypass ? groups.has(a[4]) : grouped.has(a[4]))
        return;
      draw.apply(r, a);
    };
    frame2 = 0;
  },
  disable(r) {
    if (draw)
      r.renderBufferDirect = draw;
    draw = null;
    for (const im of groups.keys())
      drop(im);
    groups = new Map;
    grouped = new Map;
    still = new WeakMap;
    scenes = new Set;
  },
  before(r, scene) {
    if (scene.__r3f || scenes.has(scene))
      return;
    scenes.add(scene);
    if (scene.matrixWorldAutoUpdate)
      scene.updateMatrixWorld();
    for (const [im, g2] of groups)
      if (g2.scene === scene)
        mirror(im, g2);
    if (frame2 % PASS_EVERY === 0)
      pass(r, scene);
  },
  after() {
    frame2++;
    scenes.clear();
  },
  status: () => ({ groups: groups.size, instanced: grouped.size, changes: changes2, ...error && { error } })
};
var isGroup = (o) => groups.has(o);
function drop(im) {
  im.removeFromParent();
  const geo = im.geometry;
  geo.index = null;
  for (const name of Object.keys(geo.attributes))
    if (name !== "instanceIndex")
      geo.deleteAttribute(name);
  geo.dispose();
  im.dispose();
}
function mirror(im, g2) {
  g2.members = g2.members.filter((o) => {
    const e = grouped.get(o), vis = shown(o, g2.scene);
    const why = vis === null ? "removed" : !same(o.matrixWorld.elements, e.m) ? "moved" : key(o) !== g2.key ? "changed" : "";
    if (!why) {
      if (vis !== e.vis)
        im.setVisibilityAt(e.id, e.vis = vis);
      return true;
    }
    im.removeInstances(e.id);
    grouped.delete(o);
    still.set(o, [...o.matrixWorld.elements]);
    note({ ejected: o.name || o.type, why });
    return false;
  });
  if (g2.members.length)
    return;
  groups.delete(im);
  drop(im);
}
function pass(r, scene) {
  const byKey = new Map;
  scene.traverse((o) => {
    if (!candidate(o))
      return;
    const prev = still.get(o), m2 = o.matrixWorld.elements;
    still.set(o, [...m2]);
    if (!prev || !same(prev, m2))
      return;
    const k2 = key(o);
    byKey.get(k2)?.push(o) ?? byKey.set(k2, [o]);
  });
  if (!IM)
    return;
  for (const [k2, list] of byKey) {
    if (list.length < MIN_GROUP)
      continue;
    const first = list[0];
    const src = first.geometry, geo = new BufferGeometry;
    geo.index = src.index;
    for (const name in src.attributes)
      geo.setAttribute(name, src.attributes[name]);
    geo.drawRange = src.drawRange;
    const im = new IM(geo, first.material, { capacity: list.length, renderer: r });
    im.matrixAutoUpdate = im.matrixWorldAutoUpdate = false;
    im.castShadow = first.castShadow;
    im.receiveShadow = first.receiveShadow;
    im.frustumCulled = first.frustumCulled;
    im.layers.mask = first.layers.mask;
    im.renderOrder = first.renderOrder;
    im.raycast = () => {};
    im.addInstances(list.length);
    list.forEach((o, id) => {
      const vis = shown(o, scene);
      im.setMatrixAt(id, o.matrixWorld);
      im.setVisibilityAt(id, vis);
      grouped.set(o, { im, id, m: [...o.matrixWorld.elements], vis });
    });
    im.computeBVH();
    scene.add(im);
    groups.set(im, { scene, key: k2, members: list });
    note({ grouped: list.length, like: first.name || first.type });
  }
}
function originals(draw2) {
  bypass = true;
  try {
    return draw2();
  } finally {
    bypass = false;
  }
}

// runtime/src/defaults.ts
var CAP = 2;
var STILL_FRAMES = 60;
var setPixelRatio = null;
var asked = 1;
var compiled = false;
var frozen = false;
var still2 = 0;
var moved = false;
var warm = new WeakSet;
var last = new WeakMap;
var animates = (o) => o.isSkinnedMesh || o.isInstancedMesh && !isGroup(o) || o.isBatchedMesh || !!o.morphTargetInfluences?.length;
var defaults = {
  enable(r) {
    setPixelRatio = r.setPixelRatio;
    asked = r.getPixelRatio();
    r.setPixelRatio = (v2) => {
      asked = v2;
      setPixelRatio.call(r, Math.min(v2, CAP));
    };
    r.setPixelRatio(asked);
    compiled = frozen = moved = false;
    still2 = 0;
    warm = new WeakSet;
    last = new WeakMap;
  },
  disable(r) {
    if (setPixelRatio) {
      r.setPixelRatio = setPixelRatio;
      r.setPixelRatio(asked);
    }
    setPixelRatio = null;
    if (frozen)
      r.shadowMap.autoUpdate = true;
    frozen = false;
  },
  before(r, scene, camera) {
    if (!warm.has(scene)) {
      warm.add(scene);
      compiled = true;
      r.compileAsync(scene, camera).catch(() => {});
    }
    if (!r.shadowMap.enabled)
      return;
    if (scene.matrixWorldAutoUpdate)
      scene.updateMatrixWorld();
    const now = [];
    let animating = false;
    scene.traverseVisible((o) => {
      if (!o.castShadow)
        return;
      if (animates(o))
        animating = true;
      now.push(o.id, ...o.matrixWorld.elements);
      const target = o.target;
      if (target)
        now.push(...target.matrixWorld.elements);
    });
    const prev = last.get(scene);
    last.set(scene, now);
    if (!animating && prev && now.length === prev.length && now.every((v2, i) => v2 === prev[i]))
      return;
    moved = true;
    if (frozen) {
      frozen = false;
      r.shadowMap.autoUpdate = true;
    }
  },
  after(r) {
    still2 = moved ? 0 : still2 + 1;
    moved = false;
    if (!frozen && still2 >= STILL_FRAMES && r.shadowMap.enabled && r.shadowMap.autoUpdate) {
      frozen = true;
      r.shadowMap.autoUpdate = false;
    }
  },
  status: () => ({ pixelRatioCap: CAP, compiled, shadowsFrozen: frozen })
};

// runtime/src/lod.ts
import { BufferAttribute as BufferAttribute2, BufferGeometry as BufferGeometry3, Sphere, Vector3 as Vector32 } from "three";
var MIN_TRIANGLES = 1e4;
var RATIOS = [0.5, 0.2];
var FAR = [10, 30];
var ERROR = 0.01;
var RESCAN = 120;
var simplifier = null;
var mergeVertices2 = null;
var error2 = "";
var made = new WeakMap;
var ours2 = new WeakSet;
var scans = new WeakMap;
var swapped = new Map;
var groups2 = [];
var frame3 = 0;
var reduced = 0;
var found = [];
var sphere = new Sphere;
var eye = new Vector32;
var triangles = (g2) => (g2.index ?? g2.attributes.position).count / 3;
function levelsOf(g2) {
  if (made.has(g2))
    return made.get(g2);
  let out = null;
  if (!ours2.has(g2) && g2.attributes.position && !g2.groups.length && !g2.morphAttributes.position && triangles(g2) > MIN_TRIANGLES) {
    const src = g2.index ? g2 : mergeVertices2(g2);
    const pos = src.attributes.position, xyz = new Float32Array(pos.count * 3);
    for (let i = 0;i < pos.count; i++) {
      xyz[i * 3] = pos.getX(i);
      xyz[i * 3 + 1] = pos.getY(i);
      xyz[i * 3 + 2] = pos.getZ(i);
    }
    const chans = [["normal", 1], ["uv", 10]].filter(([k2]) => src.attributes[k2]);
    const stride = chans.reduce((n, [k2]) => n + src.attributes[k2].itemSize, 0), attrs = new Float32Array(pos.count * stride);
    const weights = chans.flatMap(([k2, w2]) => Array(src.attributes[k2].itemSize).fill(w2));
    for (let i = 0, o = 0;i < pos.count; i++)
      for (const [k2] of chans) {
        const a = src.attributes[k2];
        for (let c2 = 0;c2 < a.itemSize; c2++)
          attrs[o++] = a.getComponent(i, c2);
      }
    const index = src.index.array;
    let last2 = index.length;
    out = [];
    for (const r of RATIOS) {
      const target = Math.floor(index.length * r / 3) * 3;
      const [idx] = simplifier.simplifyWithAttributes(index, xyz, 3, attrs, stride, weights, null, target, ERROR, chans.length ? ["Permissive"] : []);
      if (idx.length >= last2)
        continue;
      last2 = idx.length;
      const l = new BufferGeometry3;
      for (const k2 in src.attributes)
        l.setAttribute(k2, src.attributes[k2]);
      l.setIndex(new BufferAttribute2(idx, 1));
      l.boundingSphere = g2.boundingSphere ?? (g2.computeBoundingSphere(), g2.boundingSphere);
      l.boundingBox = g2.boundingBox;
      ours2.add(l);
      out.push(l);
    }
    if (!out.length)
      out = null;
    else
      g2.addEventListener("dispose", () => {
        for (const l of out)
          l.dispose();
        made.delete(g2);
      });
    if (out)
      found = [...found, { name: g2.name || g2.uuid, triangles: triangles(g2), levels: out.map(triangles) }].slice(-20);
  }
  made.set(g2, out);
  return out;
}
function scan(scene) {
  const meshes = [];
  scene.traverse((o) => {
    const m2 = o;
    if (m2.isInstancedMesh2) {
      if (m2._parentLOD || m2.LODinfo?.render || groups2.includes(m2))
        return;
      const l = levelsOf(m2.geometry);
      if (!l)
        return;
      const r = m2.geometry.boundingSphere.radius;
      l.forEach((g2, i) => m2.addLOD(g2, m2.material, r * FAR[i]));
      groups2.push(m2);
      return;
    }
    if (!m2.isMesh || m2.isSkinnedMesh || m2.isInstancedMesh || m2.isBatchedMesh || m2.morphTargetInfluences?.length)
      return;
    if (levelsOf(swapped.get(m2) ?? m2.geometry))
      meshes.push(m2);
  });
  return meshes;
}
function restore() {
  for (const [m2, g2] of swapped)
    m2.geometry = g2;
  swapped.clear();
}
var lod = {
  enable() {
    error2 = "";
    made = new WeakMap;
    found = [];
    Promise.all([Promise.resolve().then(() => (init_meshopt_simplifier_module(), exports_meshopt_simplifier_module)), Promise.resolve().then(() => (init_BufferGeometryUtils(), exports_BufferGeometryUtils))]).then(async ([m2, u]) => {
      await m2.MeshoptSimplifier.ready;
      simplifier = m2.MeshoptSimplifier;
      mergeVertices2 = u.mergeVertices;
    }).catch((e) => {
      error2 = `simplifier did not load: ${e?.message ?? e}`;
    });
  },
  disable() {
    restore();
    for (const m2 of groups2) {
      const levels = m2.LODinfo?.render?.levels ?? [];
      for (let i = levels.length - 1;i > 0; i--) {
        const o = levels[i].object;
        m2.removeLOD(i, false);
        m2.remove(o);
        o.dispose();
      }
    }
    groups2 = [];
    scans = new WeakMap;
    simplifier = null;
  },
  before(_r, scene, camera) {
    if (!simplifier)
      return;
    let s = scans.get(scene);
    if (!s || frame3 - s.at >= RESCAN)
      scans.set(scene, s = { at: frame3, meshes: scan(scene) });
    if (!swapped.size)
      queueMicrotask(restore);
    camera.updateMatrixWorld();
    eye.setFromMatrixPosition(camera.matrixWorld);
    for (const m2 of s.meshes) {
      const own = swapped.get(m2) ?? m2.geometry, levels = levelsOf(own);
      if (!levels)
        continue;
      sphere.copy(own.boundingSphere).applyMatrix4(m2.matrixWorld);
      const d = sphere.center.distanceTo(eye);
      let i = 0;
      while (i < levels.length && d >= sphere.radius * FAR[i])
        i++;
      m2.geometry = i ? levels[i - 1] : own;
      if (i)
        swapped.set(m2, own);
      else
        swapped.delete(m2);
    }
  },
  after() {
    frame3++;
    reduced = swapped.size;
    restore();
  },
  status: () => ({ meshes: found, groups: groups2.length, reduced, ...error2 && { error: error2 } })
};

// runtime/src/dispose.ts
var SETTLE = 10;
var MAX_WAIT = 60;
var proto = null;
var remove = null;
var removed = new Set;
var scenes2 = new Set;
var quiet = 0;
var waited = 0;
var disposed = { geometries: 0, materials: 0, textures: 0 };
var kept = (x) => !!x?.userData?.keep;
function uses(o, out) {
  if (o.geometry)
    out.add(o.geometry);
  for (const m2 of [o.material].flat()) {
    if (!m2)
      continue;
    out.add(m2);
    for (const v2 of Object.values(m2))
      if (v2?.isTexture)
        out.add(v2);
    for (const u of Object.values(m2.uniforms ?? {}))
      if (u?.value?.isTexture)
        out.add(u.value);
  }
}
function sweep() {
  const used = new Set, gone = new Set;
  for (const s of scenes2) {
    s.traverse((o) => uses(o, used));
    for (const t of [s.background, s.environment])
      if (t?.isTexture)
        used.add(t);
    if (s.overrideMaterial)
      uses({ material: s.overrideMaterial }, used);
  }
  const walk = (o) => {
    if (kept(o))
      return;
    uses(o, gone);
    for (const c2 of o.children)
      walk(c2);
  };
  for (const o of removed)
    walk(o);
  for (const x of gone) {
    if (used.has(x) || kept(x) || x.isRenderTargetTexture)
      continue;
    x.dispose();
    disposed[x.isTexture ? "textures" : x.isMaterial ? "materials" : "geometries"]++;
  }
  removed.clear();
  scenes2.clear();
  quiet = waited = 0;
}
var dispose = {
  enable() {
    disposed = { geometries: 0, materials: 0, textures: 0 };
  },
  disable() {
    if (proto)
      proto.remove = remove;
    proto = remove = null;
    removed.clear();
    scenes2.clear();
  },
  before(_r, scene) {
    if (!proto) {
      let p = Object.getPrototypeOf(scene);
      while (p && !Object.hasOwn(p, "remove"))
        p = Object.getPrototypeOf(p);
      if (!p)
        return;
      proto = p;
      const own = remove = p.remove;
      p.remove = function(...objects) {
        for (const o of objects)
          if (o?.isObject3D && o.parent === this)
            removed.add(o);
        quiet = 0;
        return own.apply(this, objects);
      };
    }
    scenes2.add(scene);
  },
  after() {
    if (!removed.size) {
      scenes2.clear();
      return;
    }
    if (++quiet >= SETTLE || ++waited >= MAX_WAIT)
      sweep();
  },
  status: () => ({ disposed, pending: removed.size })
};

// runtime/src/index.ts
var SWITCHES = { resolution, defaults, instancing, lod, dispose };
var on = new Map;
var w2 = window;
var realNow = () => Performance.prototype.now.call(performance);
var renderer = null;
var found2 = null;
var installed = false;
var depth = 0;
var frameMs = 0;
var pending = false;
var toScreen = false;
var hint = {};
var hook = w2.__THREE_DEVTOOLS__ ??= new EventTarget;
hook.addEventListener("observe", (e) => {
  const o = e.detail;
  if (!o?.isWebGLRenderer || found2)
    return;
  found2 = o;
  if (installed)
    attach(o);
});
function attach(r) {
  if (renderer)
    return;
  renderer = r;
  const render = r.render;
  r.render = (scene, camera) => {
    if (depth)
      return render.call(r, scene, camera);
    if (!pending) {
      pending = true;
      queueMicrotask(() => endFrame(r));
    }
    toScreen ||= r.getRenderTarget() === null;
    for (const name in SWITCHES)
      if (on.has(name))
        SWITCHES[name].before?.(r, hint.scene ?? scene, hint.camera ?? camera);
    const t0 = realNow();
    depth++;
    try {
      render.call(r, scene, camera);
    } finally {
      depth--;
    }
    frameMs += realNow() - t0;
  };
  for (const name in SWITCHES)
    if (on.has(name))
      SWITCHES[name].enable(r, on.get(name));
}
function endFrame(r) {
  pending = false;
  if (!toScreen)
    return;
  toScreen = false;
  wrapGame(w2.__game);
  for (const name in SWITCHES)
    if (on.has(name))
      SWITCHES[name].after?.(r, frameMs);
  frameMs = 0;
}
function enable(name, opts = true) {
  if (!SWITCHES[name])
    return console.warn(`three-runtime: no switch named ${name}`);
  if (on.has(name))
    disable(name);
  on.set(name, opts);
  if (renderer)
    SWITCHES[name].enable(renderer, opts);
}
function disable(name) {
  if (!on.delete(name))
    return;
  if (renderer)
    SWITCHES[name].disable(renderer);
}
function status() {
  const s = { renderer: !!renderer, switches: [...on.keys()] };
  for (const name in SWITCHES)
    s[name] = SWITCHES[name].status();
  return s;
}
function wrapGame(g2) {
  if (!g2?.observe || g2.observe.__runtime)
    return g2;
  const observe = g2.observe;
  g2.observe = (...a) => {
    const r = observe.apply(g2, a);
    return r && typeof r === "object" ? { ...r, runtime: status() } : r;
  };
  g2.observe.__runtime = true;
  return g2;
}
async function fileConfig() {
  try {
    const res = await fetch("./game-runtime.json");
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}
async function install(opts = {}) {
  if (installed)
    return;
  installed = true;
  hint = { scene: opts.scene, camera: opts.camera };
  let game = wrapGame(w2.__game);
  try {
    Object.defineProperty(w2, "__game", { configurable: true, enumerable: true, get: () => game, set: (g2) => {
      game = wrapGame(g2);
    } });
  } catch {}
  const r = opts.renderer ?? found2;
  if (r)
    attach(r);
  const cfg = w2.__harnessConfig?.runtime ?? opts.config ?? await fileConfig();
  for (const [name, o] of Object.entries(cfg?.switches ?? {}))
    if (o)
      enable(name, o);
}
w2.__threeRuntime = { enable, disable, status, originals, THREE: { ShaderMaterial, WebGLRenderTarget, Color, Raycaster, Vector3: Vector33 } };
export {
  status,
  install,
  enable,
  disable
};
