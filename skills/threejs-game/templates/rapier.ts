// Rapier template: the window.__game bridge for a game whose bodies live in a Rapier world, with
// @react-three/rapier (`installGame(useRapier().world, ...)` in an effect) or plain @dimforge/rapier3d-compat.
// observe() reads positions from the bodies, rounded so a check's exact values are stable; setState teleports a body
// and stops it unless the state gives its velocity, so a keypoint starts at rest by default. Keep the physics step fixed at 1/60 s (@react-three/rapier's default
// timeStep) so stepped frames are exact. Replace the rules, keep the shape.
import type { RigidBody, World } from '@dimforge/rapier3d-compat';

type Vec = { x: number; y: number; z: number };
const SPEED = 4, JUMP = 7;   // units per second
const held = new Set<string>();
let jump = false, score = 0;
const round = (v: Vec) => ({ x: +v.x.toFixed(2), y: +v.y.toFixed(2), z: +v.z.toFixed(2) });

/** One input path for real keys and the harness's act(); Space jumps once per press. */
export function act({ key, down = true }: { key: string; down?: boolean }) {
  const k = key === ' ' ? 'Space' : key;
  if (k === 'Space' && down && !held.has(k)) jump = true;
  if (down) held.add(k); else held.delete(k);
}

/** Call once per physics step, before the world steps: held keys set the player's velocity. */
export function tick(player: RigidBody) {
  const vx = ((held.has('ArrowRight') ? 1 : 0) - (held.has('ArrowLeft') ? 1 : 0)) * SPEED;
  player.setLinvel({ x: vx, y: jump ? JUMP : player.linvel().y, z: 0 }, true);
  jump = false;
}

/** Installs window.__game and the key listeners for the named bodies; returns the cleanup. */
export function installGame(world: World, bodies: { player: RigidBody }) {
  const down = (e: KeyboardEvent) => act({ key: e.key });
  const up = (e: KeyboardEvent) => act({ key: e.key, down: false });
  addEventListener('keydown', down);
  addEventListener('keyup', up);
  (window as any).__game = {
    describe: () => ({ name: 'platformer', stack: 'rapier', units: 'metres, y up', keys: { ArrowLeft: 'hold', ArrowRight: 'hold', Space: 'jump' } }),
    observe: () => ({ score, bodies: world.bodies.len(), player: round(bodies.player.translation()), velocity: round(bodies.player.linvel()) }),
    act,
    setState: (s: { score?: number; player?: Vec; velocity?: Vec }) => {   // every schema key but bodies (a count), applied at once
      if (s.score !== undefined) score = s.score;
      if (s.player) bodies.player.setTranslation(s.player, true);
      if (s.player || s.velocity) bodies.player.setLinvel(s.velocity ?? { x: 0, y: 0, z: 0 }, true);
    },
  };
  return () => { removeEventListener('keydown', down); removeEventListener('keyup', up); delete (window as any).__game; };
}
