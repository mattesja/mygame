import flow from 'lodash/function/flow';

export const type = 'ASK';

export function reduce(state, { solution }) {
  console.log("reduceask" + Object.keys(state));
  return state;
}

export function askQuiz(solution) {
  console.log("askQuiz solution" + solution);
  return { type, solution };
};
