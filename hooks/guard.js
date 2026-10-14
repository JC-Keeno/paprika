// hooks/guard.ts
import { json } from "node:stream/consumers";
json(process.stdin).then((input) => {
  const path = input?.tool_input?.file_path ?? input?.tool_input?.notebook_path;
  if (typeof path === "string" && /(^|[\\/])game-contract\.json$/.test(path)) {
    console.error("game-contract.json is owned by the harness; run game_contract to change it");
    process.exit(2);
  }
}, () => {});
