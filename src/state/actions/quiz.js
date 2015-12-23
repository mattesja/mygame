import flow from 'lodash/function/flow';

export const type = 'SOLVE';

export function reduce(state, { key }) {
  console.log("reduce" + Object.keys(state));
  return state;
}

export function solveQuiz(key) {
  return { type, key };
};

export function askQuiz() {
  console.log('askQuiz()');
  return {
    question: '1 + 2 = ?',
    solution: 3
  };
}
