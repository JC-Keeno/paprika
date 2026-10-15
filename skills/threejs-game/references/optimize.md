# Performance: game_perf, game_optimize and the runtime layer

## game_perf

Measures the open game uncapped in headless Chrome: median and p95 frame time, draw calls, triangles and the size of the project's assets, against a budget. `desktop` (the default) is 16.7 ms a frame, 5 MB of assets, 200,000 triangles, 2048 px textures and a pixel ratio of at most 2. The contract's `budget`, or a `budget` argument, overrides it.

## game_optimize

Tries each switch of `@paprika3d/three-runtime` on the open game, one at a time, on top of the ones already kept:

| Switch | What it does | Kept when |
|---|---|---|
| `resolution` | Lowers the pixel ratio while frames run over budget, raises it back when there is time | it breaks no keypoint and is not slower |
| `defaults` | Caps the pixel ratio at 2, compiles shaders up front, stops redrawing shadow maps while no caster moves | same |
| `instancing` | Draws many still meshes that share a geometry and material as one instanced mesh | it is measurably faster, or 20% fewer draw calls |
| `lod` | Simpler versions of meshes over 10,000 triangles when they are far away | measurably faster |
| `dispose` | Frees the GPU memory of objects removed from the scene and never disposed | it breaks no keypoint and is not slower |

A switch that fails a keypoint, breaks the page or changes the picture when it must not is reverted, with the reason. The kept switches go to `game-runtime.json` in the project (and in `public/` when there is one, since vite copies only `public/`). The game's single `install()` call reads that file, so the shipped game runs with the same switches.

`resolution` and `lod` may change the picture; a kept one that did is marked `lookChanged`, with before and after pictures to compare.

The report also lists image and `.glb` files whose textures are over the budget's size.

## Adding the runtime layer

When the game does not import the runtime yet, `game_optimize` puts the built runtime in the project root as `three-runtime.js` and says so. Import it (`import { install } from "./three-runtime.js"`, or `"../three-runtime.js"` from `src/`) and call `install()` at the top of the entry file, before the renderer is made. Never read, copy or edit that file: it is a 110 KB minified bundle the harness keeps current. It does nothing until `game_optimize` has chosen switches. Then reopen the game with `game_open` and call `game_optimize` again.

The layer must be imported by the game itself (only the game's own copy of three can be patched):

```js
import { install } from './three-runtime.js';   // game_optimize puts it in the project root; never read it
install();                                     // before the renderer is made
```

In a page with an import map, `three` must be mapped, since the runtime imports it. Under vite, the project's `three` package is used. A renderer made before `install()` must be passed: `install({ renderer })`. Mark an object, geometry, material or texture with `userData.keep = true` to keep `dispose` away from it (a pooled object kept outside the scene).
