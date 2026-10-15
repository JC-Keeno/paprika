# paprika3D: the toolset that makes your coding agent a better three.js developer

paprika3D is a Claude Code plugin and MCP server that lets a coding agent open, look at, play, measure and fix the three.js, React Three Fiber and WebGL pages it writes, before it tells you they are done: it **sees** the scene as data, **plays** the page on an exact clock, **inspects** any mesh or value, **builds** shapes with real geometry, and **speeds up** the frame.

## Install

Needs Google Chrome and Node 20.11 or later.

```bash
claude plugin marketplace add paprika3d/paprika3d
claude plugin install paprika3d@paprika3d
```

Chrome is found at its usual macOS path; elsewhere, set `PAPRIKA3D_CHROME` to the Chrome executable. For other agents, see [Other agents](#other-agents).

Docs: [https://paprika3d.com/docs](https://paprika3d.com/docs). The `window.__game` convention: [https://paprika3d.com/docs/convention](https://paprika3d.com/docs/convention). For LLMs: [https://paprika3d.com/docs/llms.txt](https://paprika3d.com/docs/llms.txt).

It works on any three.js, React Three Fiber or WebGL page: a game, a product viewer or configurator, a simulation, a shader or post-processing demo. The page needs no changes to be opened, looked at, driven and inspected.

## What your agent gets

A three.js page is one `<canvas>`: from outside it is a picture. paprika3D works inside it, with the 3D scene itself.

| Your agent asks | paprika3D answers |
|---|---|
| What is on screen? | Every named object with its share of the image and its box, plus each one that never appears, with its size and whether it is behind the camera, outside the view or too small to draw |
| Did my model load? | Reported when the page opens: the model, texture and sound files fetched, and every load that failed |
| What happens when I press Space? | The key goes in on an exact frame of a paused, seeded clock (1/60 s per frame), so the same inputs give the same frames and state every run |
| What is the game's state? | The state as JSON before and after each input |
| How big is this mesh? Is it closed? | Found without changes to the page: triangles, bounds, closed or open edges, volume and genus per mesh, and any JavaScript run against `scene`, `camera` and `renderer` |
| Is it fast enough? | Frame time, draw calls, triangles and asset size against a desktop, mobile or Quest budget |
| How do I make it faster? | `game_optimize` tries resolution scaling, instancing, LOD and disposal, and keeps only what helps without changing the picture |
| Does the hit feel like anything? | Camera shake, scale pops, eased moves versus teleports, flashes, spawned objects and sounds after an event |
| Can it build the shape I need? | `geo.js` in the project: booleans, hull, extrude, revolve and seeded scatter, with Manifold built in |

It never captures your screen: every picture is of its own headless page.

## What it catches

Here is `game_look` on a mini golf page an agent wrote from a spec that said "scale the car to 0.8":

```
On screen (14):
Mesh 17.4% [399, 240, 880, 771]
…
Never visible: ToyCar (0.0338 units, in view), Glass (0.0168 units, in view)
```

The car is there, in view, and 3 cm long on an 8-metre course. In the runs below, two agents opened a page like this, looked at the screenshot and still missed the car; this line names it.

Measured with Sonnet 5.5 in clean installs, on long, exact three.js specs that each ship a glTF model:

| | Agent alone | With paprika3D |
|---|---|---|
| Imported model left at the wrong scale or not loaded | 10 of 11 runs | 2 of 11 runs |
| Draco-compressed model that never loaded ("No DRACOLoader instance provided") | 3 of 3 runs | 0 of 3 runs |

With the tools installed but no reminder, the agent opened its page in 0 of 6 runs; with the reminder the plugin now gives once per session, 10 of 11. Game logic was right in every arm on these tasks, so the gain is in what only looking shows: imported assets, scale, framing and failed loads. A run costs about 1.5 to 2 times the dollars and 2 to 7 times the wall time. These are small samples (3 to 5 runs per task, one model).

## For agents: the loop

To ask for it in a prompt, say **use paprika3d to playtest**.

Use these tools after writing or changing any three.js, React Three Fiber or WebGL page, before saying it is done.

1. **Open it:** `game_open` with `url: "index.html"` (the folder is served) or `command: "bunx vite"`. Read the `Loaded:` and `Failed to load:` lines.
2. **Look:** `game_look`. Read `Never visible:`. An object of 0.07 units in a scene 8 units wide is at the wrong scale; `behind the camera` or `outside the view` is a framing problem. Open the picture it saves.
3. **Drive it:** for each interaction the request names, call `game_act` and read the state it returns. Use `game_clock` to step time.
4. **Ask the scene:** `game_eval` answers questions about sizes, materials and positions, and can try a change in the page before you write it into the source.
5. **Fix it, then look again.** Call `game_perf` when performance matters.

For a game with exact rules (scoring, collisions, turn order, stated numbers), lock a **game contract** with `game_contract` and call `game_check` after each change. A hook also checks after each edit in the background. The `threejs-game` skill has the full method and templates for plain three.js, React Three Fiber and Rapier.

## Tools

| Tool | What it does |
|---|---|
| `game_open` | Opens the page (a file or folder, an http URL, or a dev-server command) in headless Chrome on a paused, seeded clock, and lists the model, texture and sound files the page fetched and every fetch that failed |
| `game_look` | A picture, an ID image (one colour per object) and the list of named objects on screen, plus the named objects no look has seen yet with their size and where they are (behind the camera, outside the view, or in view but drawing no pixel); with `target`, one named object alone from the front, right, top and a three-quarter angle in one picture |
| `game_act` | Sends keys, mouse, touch or `__game.act` actions frame by frame, with the state before and after |
| `game_observe` | The page's state (its `__game.observe()`, or its named three.js objects), renderer counts, new console errors and what changed since the last observe |
| `game_eval` | Runs JavaScript in the page with `scene`, `camera`, `renderer`, `find(name)` and `stats(target)` in scope, and replies with what it returns; `stats` gives each mesh's vertices, triangles, bounds, attributes, materials, closed or open edges, volume and genus. Replies are capped at 2,048 characters, with the full text saved in the run folder |
| `game_clock` | Steps frames, pauses or resumes real-time play, sets the time scale |
| `game_feel` | Sends the steps that cause an event, then watches the next frames for camera shake, scale pops, eased moves versus teleports, colour flashes, spawned objects, HUD text ticks and sounds |
| `game_perf` | Frame time, draw calls, triangles and asset size against a budget (desktop, mobile, quest, or the contract's) |
| `game_optimize` | Only when a check says the frame is over budget, or the user asks about performance: measures, tries the runtime's switches, keeps those that help without failing a keypoint or changing the picture, writes `game-runtime.json`, and ends with the final check |
| `game_contract` | Turns the user's prompt into `game-contract.json`, written by a fresh subagent that has seen no game code; its hash is kept outside the project, so a hand-edited contract is refused |
| `game_check` | Runs the contract, each keypoint on a freshly loaded page; its last line is the frame time the keypoints stepped at, against the budget |

## Making a game checkable

Any page can be opened, looked at and driven. To check its rules, a game also exposes `window.__game` once its page has loaded:

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

The full rules are in `skills/threejs-game/SKILL.md` and at [https://paprika3d.com/docs/convention](https://paprika3d.com/docs/convention).

## The runtime import

A game needs it only once a check says the frame is over budget. Then `game_optimize`, on a game without it, puts the built runtime in the project as `three-runtime.js` and asks for the import; add it once at the top of the entry file, before the renderer is made, and reopen the game:

```js
import { install } from "./three-runtime.js";
install();
```

It does nothing until `game_optimize` has written `game-runtime.json` (also into `public/` when the project has one, since vite copies only that); then it runs the switches kept there: `resolution`, `defaults`, `instancing`, `lod` and `dispose`.

## Procedural geometry

`game_open` puts `geo.js` in the project: one file with Manifold built in, for booleans, hull, extrude and revolve, plus a seeded `scatter`. Import it with `import { geo, scatter } from "./geo.js";` (`"../geo.js"` from `src/` in a vite project). Recipes are in `skills/threejs-game/references/geometry.md`.

## Other agents

The MCP server runs on Node 20.11 or later with Google Chrome, and needs no install step. Clone this repo and point your MCP client at `src/cli.js serve`:

```bash
git clone https://github.com/paprika3d/paprika3d.git
```

```json
{
  "mcpServers": {
    "paprika3d": {
      "command": "node",
      "args": ["/path/to/paprika3d/src/cli.js", "serve"]
    }
  }
}
```

Every tool takes the project folder as `cwd`. The after-edit hook and the `threejs-game` skill are Claude Code features; other agents can read `AGENTS.md` and `skills/threejs-game/SKILL.md` for the same method.

## Where runs go

- `<project>/paprika3d/runs/<time>/`: each run's pictures and `run.json`. `<project>/paprika3d/state.json` holds the iteration count, the last 200 runs and how the hook reaches the running server. Add `paprika3d/` to the project's `.gitignore`.
- `~/.paprika3d/issued.json` (or `$PAPRIKA3D_HOME`): the hash of each issued contract.
- The Paprika app: when it is installed, each check, perf and optimize run is an action row dropped in `~/.paprika/spool/` (or `$PAPRIKA_HOME`), with its result, wall-clock time, iteration count and the edit that triggered it.

## License

Apache License 2.0 (`LICENSE`). The packages each build bundles keep their own licences, listed in
`THIRD_PARTY_NOTICES.md`. "paprika3D" and "paprika3d" are trademarks of Keeno Corp (`NOTICE`); forks are welcome under
the licence with their own name. Issues are welcome; see `CONTRIBUTING.md` for code.
