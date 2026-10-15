---
name: threejs-game
description: Runs, sees, plays, measures and speeds up any three.js, React Three Fiber or WebGL page as you build it - a game, a product viewer or configurator, a simulation, a shader or post-processing demo - in headless Chrome on a paused, seeded clock - what is on screen and what never appears (a model at the wrong scale, out of view or not loaded), frame-exact keyboard, mouse and touch input, the page state as JSON, mesh stats, feel and frame-time measurements. Use it instead of Playwright or Chrome DevTools whenever the user asks to make, fix, test, extend, screenshot or profile a three.js or WebGL page, new or existing, and before saying one is done. For a game with exact rules it can also lock a game contract that is checked after every edit.
---

# Building and testing a three.js game with the harness

The harness runs the game in a headless Chrome on a paused, seeded clock: you send inputs frame by frame and read back the game's state as JSON, so what you see is exact and repeatable. A **game contract** is optional: keypoints taken from the user's prompt, each a starting state, a few inputs and the values `observe()` must then return, checked after every edit.

## Order of work

1. **Start from a template** for a new game, in `${CLAUDE_PLUGIN_ROOT}/skills/threejs-game/templates/`: `plain.html` (one page, an import map, no build), `r3f.tsx` (React Three Fiber under vite) or `rapier.ts` (the `window.__game` bridge for a Rapier world, with either). Give the game a `window.__game` following the convention below. An existing game works as it is; add `window.__game` when you need its state.
2. **Open the game** with `game_open`: `url: "index.html"` for a plain page (the folder is served), or `command: "bunx vite"` for a vite project. Open it once: after each edit the next tool call reloads the page by itself.
3. **Build, playing as you go.** After each change, play the inputs that matter with `game_act` (and `game_clock`), read the state it returns or `game_observe`, and look with `game_look` (`game_act` with `look: true` returns the picture after its steps in the same call; `sheet` shows several stages, levels or views in one picture). `game_eval` inspects the scene or tries a change in the page before you write it into the source.
4. **Feel.** When the user's request says how the game should look and feel (its feel brief), for each event it names call `game_feel` with the inputs that cause it (set the state up first with `game_act`) and read what reacted. Every event the brief says should feel like something must show at least one reaction (a pop, a flash, a shake, particles, a HUD tick, a sound), and motion the brief calls eased or snappy must show eased moves and no teleports. Fix what does not, and rerun `game_feel`.

## Game contract (optional)

Use one when the game has exact rules where one misread breaks it (scoring, collisions, matching, clearing and refilling, turn order, stated numbers), or when the user asks for a locked spec or tests. Otherwise skip it.

1. Before writing game code, call `game_contract` with the project folder (`cwd`) and, as `prompt`, everything the user wrote about the game, verbatim: the request and any interface, rules or numbers that came with it, since the subagent sees nothing else. It writes a brief and tells you the one-line prompt to start a fresh subagent with: the Agent tool, in the foreground, model sonnet. That subagent drafts and issues the contract, and its reply gives you the keypoints and the `observe()` schema. Never read the brief, the draft or `game-contract.json` yourself: a failing `game_check` tells you the state and values a keypoint needs. Make `window.__game` return exactly the schema's keys.
2. `game_open` then ends with the first check of the contract, so do not call `game_check` until you have changed something.
3. Call `game_check` after every change. A hook also checks after each edit, in the background, and tells you only when the failing keypoints change: no message means the result is the same as the last one you saw. What each failure means is in `references/contract.md`. Do the feel step once the contract passes, and rerun `game_check` after its fixes.
4. **Before saying it is done:** call `game_check` once more, so the final result is a full run of the whole contract and nothing is left to a background check that would be lost when the session ends.

## Performance

Call `game_optimize` only when a check or `game_perf` result says the frame is over budget, or when the user asks about performance (stutter, or a phone target: then measure with `game_perf` and `budget: "mobile"` first). How it works, and the runtime import it asks for: `references/optimize.md`.

## Procedural geometry

Build shapes in code, with three's own geometries plus `geo.js`, which `game_open` puts in the project: `import { geo, scatter } from "./geo.js"` (`"../geo.js"` from `src/` in a vite project). It gives booleans, hull, extrude and revolve through Manifold, and a seeded `scatter`.
After each build step, give the mesh a name and call `game_eval` with `return stats("<name>")`: check its triangles, that it is `closed`, and its volume.
Use `game_eval` to try a change in the running game before writing it into the source; what it changes vanishes on reload.
Recipes (scatter, arrays, curves, booleans, revolve, hull, level sets, rounding) and pitfalls: `references/geometry.md`.

## The `window.__game` convention

Once the page has loaded, it exposes:

```js
window.__game = {
  describe(),        // a short description: name, controls, units
  observe(),         // the state, exactly the keys of game-contract.json's schema, as plain JSON
  act(input),        // performs one input object: { key, down? } or { action, ...args }
  setState(partial), // sets any of the schema's keys; keys left out keep their values
};
```

`observe`, `look`, `perf` and `optimize` work on any three.js page; `game_check` needs all four functions.

### Rules

- The game starts playing as soon as the page loads: no title screen and no click to start.
- **Time.** The harness steps frames one at a time, 1/60 s each, on a fake clock (`requestAnimationFrame`, `performance.now`, `Date`, timers). Advance the game by each frame's elapsed time, or a fixed 1/60 s per frame, and never by more than 0.1 s in one frame. Count the first frame as one frame: the clock jumps forward when the page finishes loading, so time read before the first frame is not game time. Speeds are per second of game time. Never read real time some other way.
- **Randomness.** Use `Math.random`; the harness seeds it, so a check sees the same game every time.
- **setState** takes effect at once: the next `observe()` returns the new values, and the game's own start-up must not undo them, even when `setState` runs before the first frame. Objects and lists are replaced whole, with the same fields `observe()` returns.
- **observe()** returns plain JSON (numbers, booleans, strings, null, objects, arrays), never three.js objects. Lists keep their order: new items at the end, removed items dropped.
- **Keys** listen on `window` and match `event.key`. A key can go down and up within one frame, so one-shot controls (turn, jump, fire) act on `keydown`; held controls (move, steer) last from `keydown` to `keyup`. Route real key events and `act({ key })` through the same function.
- **Names.** Give meshes a `name` (`player`, `enemy3`, `coin`): `game_look` lists what is on screen by name.

`templates/plain.html` is a complete small game in this shape. In React, keep the game state in a plain module outside components (as `templates/r3f.tsx` does), so `setState` and `observe` never wait for a render, and set `window.__game` in the Canvas's `onCreated`: the harness starts stepping frames once `__game` exists.

## Never

- With a contract, never edit `game-contract.json` by hand or from a shell: a changed contract is refused. To change what the game must do, run `game_contract` again with the user's new prompt.
- Never change a keypoint's expected values by changing the game's `observe()` to report something the game does not do.
