import compact from 'lodash/array/compact';
import curry from 'lodash/function/curry';
import flow from 'lodash/function/flow';

import clamp from 'utils/clamp';

import level from 'state/models/level';
import player from 'state/models/player';

import die from 'state/utils/die';
import reset from 'state/utils/reset';

import * as changeLevel from 'state/actions/changeLevel';

import {
  canBlock,
  canCollect,
  canDestroy,
  canDie,
  canKill,
  canHeal,
  canWin
} from 'state/definitions/abilities';

const xOffsets = Object.freeze({
  left:  -1,
  right:  1,
});

const yOffsets = Object.freeze({
  up:   -1,
  down:  1,
});

export const type = 'MOVE';

const { minCol, maxCol, minRow, maxRow } = level;
const clampToWorld = curry((state, col, row) => {
  return [
    clamp(minCol(state), maxCol(state), col),
    clamp(minRow(state), maxRow(state), row)
  ];
});

export function reduce(state, { direction }) {

  const dir = direction;
  const newDir = (dir in xOffsets) ? dir : player.getDirection(state);

  const xOffset = xOffsets[dir] || 0;
  const yOffset = yOffsets[dir] || 0;

  const row = player.getRow(state);
  const col = player.getCol(state);

  const [newCol, newRow] = clampToWorld(
    state,
    col + xOffset,
    row + yOffset
  );

  const entity = level.entityAt(newCol, newRow, state);
  const esOccupado = !!entity;
  const type = esOccupado && entity.get('type');

  const cleanMessage   = (s) => s.set('message', '');
  const setEntity      = (s) => s.set('entity', entity);
  const setType        = (s) => s.set('type', type);
  const move           = (s) => player.setCoords(newCol, newRow, s);
  const moveBack       = (s) => player.setCoords(col, row, s);
  const orient         = (s) => player.setDirection(newDir, s);
  const win            = (s) => s.get('gameLevel') === 7 ? s.set('hasWon', true) : changeLevel.setNextLevel(s);
  const removeEntity   = (s) => level.setEntityPropAt(newCol, newRow, 'type', 'empty', s);
  const incrementTapes = (s) => s.update('numTapes', (num) => num + 1);
  const addPowerup     = (s) => s.update('powerups', (ps) => ps.push(type));
  const ghostify       = (s) => level.setEntityPropAt(newCol, newRow, 'type', (type === 'wave' || type === 'doorsimple' ? type : 'empty'), s);
  const collect        = (s) => (type === 'tape') ? incrementTapes(s) : s;
  const hurt           = (s) => s.update('health', (h) => h - 1);
  const heal         = (s) => s.update('health', (h) => h + 1);
  const dieIfUnhealthy = (s) => (s.get('health') < 0) ? flow(die)(s) : s;

  const whenEntity = curry((condition, update, s) => {
    return (esOccupado && condition(s, entity)) ? update(s) : s;
  });

  return flow(
    cleanMessage,
    setEntity,
    setType,
    move,
    orient,
    whenEntity(canBlock, moveBack), // move back to original position, if target posistion is blocked by entity (e.g. tree)
    whenEntity(canWin, win),
    whenEntity(canDestroy, removeEntity),
    whenEntity(canCollect, flow(removeEntity, collect)),
    whenEntity(canDie, ghostify),
    whenEntity(canKill, hurt),
    whenEntity(canHeal, heal),
    dieIfUnhealthy
  )(state);

};

export function toMove(direction) {
  return { type, direction };
};
