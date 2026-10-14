# Game harness

A test harness for three.js games that an agent builds. It runs the game in a headless Chrome on a paused, seeded clock so every input and check is exact and repeatable. For a game with exact rules it can also turn the user's prompt into a **game contract** (keypoints the game must pass) and tell the agent when an edit breaks or fixes a keypoint. It also measures frame time against a budget and picks the optimizations that help. Every check, perf and optimize run is recorded in Paprika when it is installed.

It is five things in one folder:

- `@keeno/game-harness`: an MCP server with eleven `game_*` tools, and a `game-harness` command line.
- A Claude Code plugin whose root is this folder: the MCP server, an after-edit hook that checks the contract in the background (silent until a game opens), a guard that refuses edits to `game-contract.json`, and the `threejs-game` skill.
- `@keeno/three-runtime` (`runtime/`): the browser-side optimizer layer a game imports.
- `@keeno/game-store` (`store/`): game state in fixed-size arrays, a generated `window.__game`, rewind and Rapier in a worker; tried in the benchmark's `store` arm before it reaches the skill.
- `@keeno/game-geo` (`geo/`): procedural geometry for games (see below).

It never captures the screen: every picture is of its own headless page.

## Install

Needs Google Chrome, and Node 20.11 or later for the stable build (Bun for the dev build and a clone). It is published as the plugin **paprika**:

```bash
claude plugin marketplace add JC-Keeno/paprika
claude plugin install paprika@paprika
```

Dev builds, one per green push to `main`, are for invited collaborators of the private repo JC-Keeno/paprika-dev: `claude plugin marketplace add JC-Keeno/paprika-dev#dev`, then `claude plugin install paprika@paprika-dev`. Claude Code clones it with your own git login, so first run `gh auth login` and `gh auth setup-git` (or have a GitHub SSH key loaded). Only the dev build has the 3D asset search (`game_asset`), over the model catalog the tester hosts in `~/.game-harness/assets` (see below); the stable build has none. From a clone, `claude --plugin-dir ~/Projects/game-harness` loads this folder as `game-harness`, and the first run installs its dependencies and builds `runtime/dist/`.

## The game convention

A game the harness can check exposes `window.__game` once its page has loaded:

```js
window.__game = {
  describe(),        // a short description: name, controls, units
  observe(),         // the state, exactly the keys of game-contract.json's schema, as plain JSON
  act(input),        // performs one input object: { key, down? } or { action, ...args }
  setState(partial), // sets any of the schema's keys at once; keys left out keep their values
};
// Starts playing on load: no title screen, no click to start.
// Time comes only from requestAnimationFrame / performance.now (faked, 1/60 s per frame, never more than 0.1 s a frame).
// Randomness comes only from Math.random (seeded). Keys listen on window and match event.key.
```

The full rules are in `skills/threejs-game/SKILL.md`, with templates for plain three.js, React Three Fiber and Rapier beside it.

## Tools

| Tool | What it does |
|---|---|
| `game_contract` | Turns the user's prompt into `game-contract.json`, written by a fresh subagent that has seen no game code; its hash is kept outside the project, so a hand-edited contract is refused |
| `game_open` | Opens the game (a file or folder, an http URL, or a dev-server command) in headless Chrome on a paused, seeded clock |
| `game_observe` | The game's state, renderer counts, new console errors and what changed since the last observe |
| `game_eval` | Runs JavaScript in the page with `scene`, `camera`, `renderer`, `find(name)` and `stats(target)` in scope, and replies with what it returns; `stats` gives each mesh's vertices, triangles, bounds, attributes, materials, closed or open edges, volume and genus. Replies are capped at 2,048 characters, with the full text saved in the run folder |
| `game_act` | Sends keys, mouse, touch or `__game.act` actions frame by frame, with the state before and after |
| `game_clock` | Steps frames, pauses or resumes real-time play, sets the time scale |
| `game_look` | A picture, an ID image (one colour per object) and the list of named objects on screen; with `target`, one named object alone from the front, right, top and a three-quarter angle in one picture |
| `game_feel` | Sends the steps that cause an event, then watches the next frames for camera shake, scale pops, eased moves versus teleports, colour flashes, spawned objects, HUD text ticks and sounds |
| `game_check` | Runs the contract, each keypoint on a freshly loaded page; its last line is the frame time the keypoints stepped at, against the budget |
| `game_perf` | Frame time, draw calls, triangles and asset size against a budget (desktop, mobile, quest, or the contract's) |
| `game_optimize` | Only when a check says the frame is over budget, or the user asks about performance: measures, tries the runtime's switches, keeps those that help without failing a keypoint or changing the picture, writes `game-runtime.json`, and ends with the final check |
| `game_asset` | Bench-only until the `asset` arm earns it (listed only with `GAME_HARNESS_ASSETS=1`): finds a CC0 model for one thing the game needs (a `query` plus a `role`), answers with the best match and two alternates, and `pick` copies it into the project with the exact loading code (size, floor-centred origin, animation clips, a `height` to scale it); `inspect` describes any GLB |

## The runtime import

A game needs it only once a check says the frame is over budget. Then `game_optimize`, on a game without it, puts the built runtime in the project as `three-runtime.js` and asks for the import; add it once at the top of the entry file, before the renderer is made, and reopen the game:

```js
import { install } from "./three-runtime.js";
install();
```

It does nothing until `game_optimize` has written `game-runtime.json` (also into `public/` when the project has one, since vite copies only that); then it runs the switches kept there: `resolution`, `defaults`, `instancing`, `lod` and `dispose`.

## Procedural geometry

`game_open` puts `geo.js` in the project: `@keeno/game-geo` (`geo/`), one file with Manifold built in, for booleans, hull, extrude and revolve, plus a seeded `scatter`. Import it with `import { geo, scatter } from "./geo.js";` (`"../geo.js"` from `src/` in a vite project). Recipes are in `skills/threejs-game/references/geometry.md`.

## Where runs go

- `<project>/game-harness/runs/<time>/`: each run's pictures and `run.json`. `<project>/game-harness/state.json` holds the iteration count, the last 200 runs and how the hook reaches the running server. Add `game-harness/` to the project's `.gitignore`.
- `~/.game-harness/issued.json` (or `$GAME_HARNESS_HOME`): the hash of each issued contract.
- `~/.game-harness/assets/`: the model catalog (`catalog.sqlite`, one row per model with its licence, size, origin, triangle count and clip names, plus FTS) and `models/<pack>/<name>.glb`, each meshopt-compressed with WebP textures. `bun run src/cli.ts ingest [DIR]` adds the CC0 models under DIR (default `/Users/Shared/aa3d/assets`, the AA-3D download: Kenney and KayKit), skipping anything without a CC0 licence file and Quaternius, whose licence forbids redistributing files. The catalog never ships with the plugin.
- `game_asset` search ranks by SigLIP 2 vectors (eight rendered views per model) when they are loaded, and falls back to name search otherwise. Its `size` option is a real-world height estimated per model: tiny under 0.3 m, small 0.3–1 m, medium 1–3 m, large 3–10 m, huge over 10 m. `bun run src/cli.ts vectors FILE` and `sizes FILE` load the two files the asset-search experiment (`experiments/asset-search/` at the repo root) exports with `uv run bench.py export --catalog ~/.game-harness/assets/catalog.sqlite` and `uv run bench.py export --sizes`. Newly ingested models have neither, so worded searches can't find them until they are rendered, embedded and sized in that experiment, then exported and loaded. The first search downloads the text model, about 577 MB, to `~/.game-harness/models/`.
- Paprika: each run is an action row (`source: "game-harness"`) dropped in `~/.paprika/spool/` (or `$PAPRIKA_HOME`), with its result, wall-clock time, iteration count and the edit that triggered it. It shows on the page of the run's picture.

## Benchmark

`bench/` measures whether the plugin helps an agent build three.js games: nineteen tasks, each run with and without the plugin (and the lean and feel arms) in an isolated project, scored against a contract the agent never sees. It needs `CLAUDE_CODE_OAUTH_TOKEN` (from `claude setup-token`) in the environment. The smoke grid:

```bash
bun run src/cli.ts bench --tasks snake-portals,breakout-powerups --runs 1 --models opus --conditions with,without
```

Tasks, scoring and where results go: `bench/README.md`.

## Development

Run `bun install` here once; the root install does not cover this folder. `bun run check` typechecks and runs the tests on real headless Chrome; Paprika's `bun run check` at the repo root runs it too. `bun run perf-test` runs the frame-time tests, which stay out of the release gate.

Publishing (`.github/workflows/publish.yml`): every push and pull request is typechecked, and each build is smoke-tested (installed, its MCP server started, its tools listed and the template game played) before it is published. The test suite needs a Mac (a real GPU for WebGL, `sips`, quiet frame timing), so run `bun run check` here before tagging a stable release. The source lives in the private repo JC-Keeno/paprika-dev. A green push to `main` publishes the dev build to its `dev` branch; a tag `vX.Y.Z` publishes the stable build, and nothing else, to the public repo JC-Keeno/paprika, pushed with the write deploy key in the `PUBLIC_DEPLOY_KEY` secret. `scripts/build-plugin.ts` makes each build: the plugin renamed paprika, with `skills/`, the built runtime and the built `geo.js`. The stable build bundles `src/cli.js` and the two hooks for Node with their dependencies, so an install needs no package manager and no Bun, and leaves out the asset search; the dev build is the Bun source with the run-time dependencies, and turns `game_asset` on with `GAME_HARNESS_ASSETS=1` (about 510 MB). `scripts/smoke-plugin.ts` checks a build's tool list, then plays the skill's plain template in a fresh project (open, observe, eval, act, look, look at one object).
