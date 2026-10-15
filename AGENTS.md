# paprika3D (the three.js toolset for coding agents)

This is the paprika3D plugin: an MCP server whose `game_*` tools let a coding agent open, look at, play, measure and fix
three.js, React Three Fiber and WebGL pages in headless Chrome on a paused, seeded clock. Use it on any such page you
write or change (a game, a product viewer, a simulation, a shader demo), before saying it is done. The page needs no
changes to be opened, looked at and driven.

When the user says "use paprika3d to playtest" (or "playtest it", "look at it", "check the scene"), run the loop below.

## The loop: open, look, act, eval

1. **Open:** `game_open` with `cwd` (the project folder) and `url: "index.html"` (the folder is served) or
   `command: "bunx vite"`. Read the `Loaded:` and `Failed to load:` lines.
2. **Look:** `game_look`. Read `Never visible:`: an object of 0.07 units in a scene 8 units wide is at the wrong scale;
   `behind the camera` or `outside the view` is a framing problem. Open the picture it saves.
3. **Act:** for each interaction the request names, `game_act` (keys, mouse, touch or `__game.act` actions, frame by
   frame) and read the state before and after. `game_clock` steps time.
4. **Eval:** `game_eval` runs JavaScript in the page with `scene`, `camera`, `renderer`, `find(name)` and
   `stats(target)` in scope, to check sizes, materials and positions or try a change before writing it into the source.
5. Fix, then look again. `game_perf` when performance matters; `game_optimize` only when a check says the frame is over
   budget or the user asks.

For a game with exact rules (scoring, collisions, turn order, stated numbers), lock a contract with `game_contract`
and run `game_check` after each change. Never edit `game-contract.json` by hand: its hash is kept outside the project.

## The `window.__game` convention

Any page can be opened and looked at. To read and check a game's state, the page sets, once loaded:

```js
window.__game = {
  describe(),        // name, controls, units
  observe(),         // the state as plain JSON (the keys of game-contract.json's schema)
  act(input),        // one input: { key, down? } or { action, ...args }
  setState(partial), // sets any of the schema's keys at once
};
```

It starts playing on load (no title screen, no click to start), takes time only from `requestAnimationFrame` /
`performance.now` and randomness only from `Math.random`; paprika3D fakes and seeds both. Keys listen on `window` and
match `event.key`.

## More

- The full method, templates (plain three.js, React Three Fiber, Rapier) and rules: `skills/threejs-game/SKILL.md`,
  with `references/contract.md`, `references/geometry.md` and `references/optimize.md` beside it.
- `game_open` puts `geo.js` (booleans, hull, extrude, revolve, seeded scatter) in the project.
- Runs are saved in `<project>/paprika3d/runs/`; add `paprika3d/` to the project's `.gitignore`.
