import flow from 'lodash/function/flow';
import { playSound } from 'utils/sound';

import level from 'state/models/level';
import player from 'state/models/player';
import {askNewQuiz, resetKeybuffer} from 'state/actions/quiz';

export const type = 'COMMAND';

export const quizKeyCodes = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'K', 'L', 'M', 'N', 'V', 'Q']);

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

    const removeEntity = (s) => level.setEntityPropAt(col, row, 'type', 'empty', s);
    const addPowerup = (s) => s.update('powerups', (ps) => ps.push(type));
    const pay = (s) => s.update('health', (h) => h - 5);

    if (health >= 5) {
      return flow(removeEntity, addPowerup, pay)(state);
    }
    else {
      return state.set('message', 'Nicht genügend Goldstücke!');
    }
  }
  if (entity && entity.get('type') == 'musichall') {
    if (key === 'Z') {

      const addTime = (s) => s.update('time', (t) => t + 60);
      const pay = (s) => s.update('health', (h) => h - 4);

      if (health >= 4) {
        return flow(addTime, pay)(state);
      }
      else {
        return state.set('message', 'Nicht genügend Goldstücke!');
      }
    }
  }
  if (entity && entity.get('type') == 'houseB') {
    if (quizKeyCodes.has(key)) {
      playSound('klick');
      return flow(state => state.set('quizLevel', key), askNewQuiz, resetKeybuffer)(state);
    }
  }
  if (key === 'S') { // stop time counter
    return state.update('timeStopped', (ts) => !ts);
  }
  return state;
}

export function execCommand(key) {
  return { type, key };
};
