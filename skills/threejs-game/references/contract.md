# The game contract

`game-contract.json` holds the user's prompt, the `observe()` schema and 8 to 20 keypoints. Each keypoint:

```json
{ "id": "eat-grows", "title": "eating food grows the snake by one",
  "state": { "head": { "x": 3, "y": 3 }, "food": { "x": 4, "y": 3 } },
  "actions": [{ "key": "ArrowUp" }],
  "frames": 1,
  "expect": [{ "path": "score", "op": "==", "value": 1 }, { "path": "body.length", "op": ">=", "value": 3 }] }
```

`game_check` runs every keypoint on a freshly reloaded page: `setState(state)`, confirmed in `observe()` before any frame runs; then each action (one frame each unless it says `frames`); then `frames` more frames (60 when left out); then every `expect` over `observe()`. Paths are dotted: `head.x`, `body.length`, `body.0.x`.

## What a failure means

| Outcome | Meaning | Usual fix |
|---|---|---|
| `launch_failed` | The page did not load or draw a frame | Read the error; `game_observe` shows console errors |
| `state_not_realized` | After `setState`, `observe()` did not return those values | `setState` must apply every schema key at once, and start-up code must not overwrite it |
| `actions_incomplete` | An input could not be sent or `act` threw | Handle that key or action in `act` |
| `outcome_mismatch` | An `expect` did not hold; the line says what was expected and got | Fix the game logic, not `observe()` |

A failing keypoint saves a picture of the page in the run folder.

## Rules

- Only `game_contract` writes `game-contract.json`. Its hash is kept outside the project, and a contract changed by hand is refused with "changed by hand; run game_contract again".
- The contract describes what the user asked for. When the user changes the request, run `game_contract` again with the new prompt (a fresh subagent writes it again).
- When a check result ends with "stale", the sources changed while it ran: check again.
