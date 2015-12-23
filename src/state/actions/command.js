import flow from 'lodash/function/flow';
import { playSound } from 'utils/sound';
import Immutable from 'immutable';


import buildModel from 'state/utils/buildModel';

export const type = 'COMMAND';

export function reduce(state, { key }) {
  return flow(executeCommand)(state, key);
}

export function executeCommand(state, key) {
  console.log("executeCommand()");
  const quiz = state.get('quiz');
  const entity = state.get('entity');
  if (entity && entity.get('isItem')) {
    console.log('execMaybe()');
  }
  return state;
}

export function execCommand(key) {
  return { type, key };
};
