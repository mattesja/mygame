export const type = 'SOLVE';

export function reduce(state, { key }) {
  console.log(key);
  return state;
}

export function solveQuiz(key) {
  return { type, key };
};
