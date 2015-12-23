import flow from 'lodash/function/flow';

export const type = 'SOLVE';

export function reduce(state, { key }) {
  console.log("reduce" + Object.keys(state));
  const quiz = state.get('quiz');
  const entity = state.get('entity');
  if (entity && entity.get('type') === 'houseA')
    if (quiz && quiz.get('solution') === key) {
      console.log('solved');
      state.update('health', (h) => h + 1);
  }
  else {
      console.log('wrong');
      state.update('health', (h) => h - 1);
    }
  return state;
}

export function solveQuiz(key) {
  return { type, key };
};

export function askQuiz() {
  console.log('askQuiz()');
  return {
    question: '1 + 2 = ?',
    solution: '3'
  };
}
