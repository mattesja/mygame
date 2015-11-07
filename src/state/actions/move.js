import compact from 'lodash/array/compact';
import curry from 'lodash/function/curry';
import flow from 'lodash/function/flow';

import clamp from 'utils/clamp';

import player from 'state/models/player';
import { coordsToId } from 'state/utils/coordsToId';
import resetState from 'state/utils/resetState';

import {
  canBlock,
  canCollect,
  canDestroy,
  canDie,
  canKill,
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

// TODO: `memoize`
const terminalCell = curry((method, prop, collection) => {
  return collection[method]((item) => item.get(prop)).get(prop);
});
const minCol = terminalCell('minBy', 'col');
const maxCol = terminalCell('maxBy', 'col');
const minRow = terminalCell('minBy', 'row');
const maxRow = terminalCell('maxBy', 'row');

const clampToWorld = curry((grounds, col, row) => {
  return [
    clamp(minCol(grounds), maxCol(grounds), col),
    clamp(minRow(grounds), maxRow(grounds), row)
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
    state.get('grounds'),
    col + xOffset,
    row + yOffset
  );

  const eKeypath = 'entities';
  const id = coordsToId(newCol, newRow);
  const entity = state.getIn([eKeypath, id]);
  const esOccupado = !!entity;
  const type = esOccupado && entity.get('type');

  const move           = (s) => player.setCoords(newCol, newRow, s);
  const moveBack       = (s) => player.setCoords(col, row, s);
  const orient         = (s) => player.setDirection(newDir, s);
  const win            = (s) => s.set('hasWon', true);
  const removeEntity   = (s) => s.deleteIn([eKeypath, id]);
  const incrementTapes = (s) => s.update('numTapes', (num) => num + 1);
  const addPowerup     = (s) => s.update('powerups', (ps) => ps.push(type));
  const reset          = (s) => resetState();
  const ghostify       = (s) => s.setIn([eKeypath, id, 'type'], 'ghost');
  const collect        = (s) => (type === 'tape') ? incrementTapes(s) : addPowerup(s);

  const whenEntity = curry((condition, update, s) => {
    return (esOccupado && condition(s, entity)) ? update(s) : s;
  });

  return flow(
    move,
    orient,
    whenEntity(canWin, win),
    whenEntity(canDestroy, removeEntity),
    whenEntity(canCollect, flow(removeEntity, collect)),
    whenEntity(canDie, ghostify),
    whenEntity(canBlock, moveBack),
    whenEntity(canKill, reset)
  )(state);

};

export function toMove(direction) {
  return { type, direction };
};
