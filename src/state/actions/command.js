import flow from 'lodash/function/flow';
import { playSound } from 'utils/sound';
import Immutable from 'immutable';

import buildModel from 'state/utils/buildModel';

import level from 'state/models/level';
import player from 'state/models/player';

export const type = 'COMMAND';

export function reduce(state, { key }) {
  return flow(executeCommand)(state, key);
}

export function executeCommand(state, key) {
  const quiz = state.get('quiz');
  const entity = state.get('entity');
  const esOccupado = !!entity;
  const type = esOccupado && entity.get('type');
  const health = state.get('health');

  if (entity && entity.get('isPowerup') && key === 'J') {
    console.log('execMaybe()');

    const row = player.getRow(state);
    const col = player.getCol(state);

    const removeEntity   = (s) => level.setEntityPropAt(col, row, 'type', 'empty', s);
    const addPowerup     = (s) => s.update('powerups', (ps) => ps.push(type));
    const pay           = (s) => s.update('health', (h) => h - 5);

    if (health >= 5) {
      return flow(removeEntity, addPowerup, pay)(state);
    }
    else {
      return state.set('message', 'Nicht genügend Goldstücke!');
    }
  }
  return state;
}

export function execCommand(key) {
  return { type, key };
};
