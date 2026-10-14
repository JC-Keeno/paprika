import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
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
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// src/fingerprint.ts
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { createHash } from "node:crypto";
function fingerprint(cwd) {
  const h = createHash("sha256");
  const walk = (rel) => {
    const entries = readdirSync(join(cwd, rel), { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    for (const e of entries) {
      const path = rel ? `${rel}/${e.name}` : e.name;
      if (SKIP_TOP.has(path))
        continue;
      if (e.isDirectory()) {
        if (!e.name.startsWith(".") && !SKIP_DIRS.has(e.name))
          walk(path);
      } else if (e.isFile() && !BINARY.has(extname(e.name).toLowerCase())) {
        h.update(`${path}\x00`);
        h.update(readFileSync(join(cwd, path)));
        h.update("\x00");
      }
    }
  };
  walk("");
  return h.digest("hex");
}
var SKIP_DIRS, SKIP_TOP, BINARY;
var init_fingerprint = __esm(() => {
  SKIP_DIRS = new Set(["node_modules", "dist", "build"]);
  SKIP_TOP = new Set(["game-harness", "geo.js", "game-contract.json", "game-runtime.json", "public/game-runtime.json"]);
  BINARY = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".avif",
    ".bmp",
    ".ico",
    ".ktx2",
    ".basis",
    ".dds",
    ".hdr",
    ".exr",
    ".glb",
    ".bin",
    ".fbx",
    ".obj",
    ".blend",
    ".mp3",
    ".ogg",
    ".wav",
    ".m4a",
    ".mp4",
    ".webm",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".wasm",
    ".zip"
  ]);
});

// src/state.ts
import { closeSync, mkdirSync, openSync, readFileSync as readFileSync2, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join as join2 } from "node:path";
function readState(cwd) {
  try {
    return { ...empty(), ...JSON.parse(readFileSync2(file(cwd), "utf8")) };
  } catch {
    return empty();
  }
}
function updateState(cwd, change) {
  const path = file(cwd);
  mkdirSync(join2(cwd, "game-harness"), { recursive: true });
  const lock = `${path}.lock`;
  const deadline = Date.now() + LOCK_WAIT_MS;
  for (;; ) {
    try {
      closeSync(openSync(lock, "wx"));
      break;
    } catch (e) {
      if (e.code !== "EEXIST")
        throw e;
      try {
        if (Date.now() - statSync(lock).mtimeMs > LOCK_STALE_MS)
          rmSync(lock, { force: true });
      } catch {}
      if (Date.now() > deadline)
        throw new Error(`state.json is locked: ${lock}`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5);
    }
  }
  try {
    const s = readState(cwd);
    change(s);
    writeFileSync(`${path}.tmp`, JSON.stringify(s, null, 2));
    renameSync(`${path}.tmp`, path);
    return s;
  } finally {
    rmSync(lock, { force: true });
  }
}
function noteRun(cwd, fingerprint2, run) {
  return updateState(cwd, (s) => {
    if (s.lastFingerprint !== fingerprint2)
      s.iterations++;
    s.lastFingerprint = fingerprint2;
    if (run.failing)
      setLastCheck(s, fingerprint2, run.failing);
    s.runs = [...s.runs, run].slice(-MAX_RUNS);
  });
}
function setLastCheck(s, fingerprint2, failing) {
  const before = s.lastCheck?.failing ?? [];
  s.lastCheck = { fingerprint: fingerprint2, failing, changed: before.length !== failing.length || !failing.every((id) => before.includes(id)) };
}
function issueContract(cwd, contractHash, issued) {
  return updateState(cwd, (s) => {
    Object.assign(s, { contractHash, issued, lastFingerprint: null, lastCheck: null, iterations: 0 });
  });
}
var MAX_RUNS = 200, LOCK_WAIT_MS = 1e4, LOCK_STALE_MS = 30000, empty = () => ({ contractHash: null, issued: null, lastFingerprint: null, lastCheck: null, iterations: 0, url: null, command: null, server: null, runs: [] }), file = (cwd) => join2(cwd, "game-harness", "state.json");
var init_state = () => {};

// hooks/after-batch.ts
init_fingerprint();
init_state();
import { existsSync } from "node:fs";
import { dirname, extname as extname2, join as join3, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { json } from "node:stream/consumers";
var FILE_TOOLS = new Set(["Edit", "Write", "NotebookEdit"]);
var input = await json(process.stdin).catch(() => null);
if (!input)
  process.exit(0);
var calls = input.tool_calls ?? (input.tool_name ? [input] : []);
var edits = calls.filter((c) => FILE_TOOLS.has(c.tool_name)).map((c) => ({ ref: c.tool_use_id ?? "", file: String(c.tool_input?.file_path ?? c.tool_input?.notebook_path ?? "") })).filter((e) => e.file);
if (!edits.length)
  process.exit(0);
function project(from) {
  for (let d = resolve(from);; d = dirname(d)) {
    if (existsSync(join3(d, "game-contract.json")))
      return d;
    if (dirname(d) === d)
      return null;
  }
}
var dir = edits.map((e) => project(dirname(resolve(input.cwd ?? ".", e.file)))).find(Boolean) ?? project(input.cwd ?? ".");
if (!dir)
  process.exit(0);
var print = fingerprint(dir);
if (readState(dir).lastCheck?.fingerprint === print)
  process.exit(0);
var edit = edits.at(-1);
var session = input.agent_id ? `${input.session_id}/${input.agent_id}` : String(input.session_id ?? "");
var cli = join3(import.meta.dirname, "../src", `cli${extname2(import.meta.filename)}`);
var p = spawnSync(process.execPath, [
  cli,
  "check",
  "--cwd",
  dir,
  "--json",
  "--edit-ref",
  edit.ref,
  "--edit-file",
  resolve(input.cwd ?? ".", edit.file),
  "--edit-time",
  new Date().toISOString(),
  "--session",
  session
], { encoding: "utf8", maxBuffer: 64 << 20 });
var out = p.stdout ?? "";
var err = p.stderr ?? "";
var changed;
var report;
if (out.trim()) {
  ({ changed, text: report } = JSON.parse(out));
} else if (err.includes("game-harness check: game not ready")) {
  process.exit(0);
} else {
  report = err.trim().split(`
`).filter((l) => l.startsWith("game-harness")).join(`
`) || err.trim() || `game-harness check exited ${p.status}`;
  changed = updateState(dir, (s) => setLastCheck(s, print, [report])).lastCheck.changed;
}
if (!changed)
  process.exit(0);
var text = `Game contract after your edit to ${edit.file} (the failing keypoints changed):
${report}`;
var parent = process.env.CLAUDE_PID ? spawnSync("ps", ["-o", "args=", "-p", process.env.CLAUDE_PID], { encoding: "utf8" }).stdout : "";
var inline = /(^|\s)(-p|--print)(\s|$)/.test(parent) && !/--input-format[ =]stream-json/.test(parent);
if (inline) {
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: input.hook_event_name ?? "PostToolBatch", additionalContext: text } }));
  process.exit(0);
}
console.error(text);
process.exit(2);
