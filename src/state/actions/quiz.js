import flow from 'lodash/function/flow';

export const type = 'SOLVE';

export function reduce(state, { key }) {
  console.log("reduce" + Object.keys(state));
  return state;
}

export function solveQuiz(key) {
  return { type, key };
};
