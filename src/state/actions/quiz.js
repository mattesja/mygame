import flow from 'lodash/function/flow';
import { playSound } from 'utils/sound';

export const type = 'SOLVE';

export function reduce(state, { key }) {
  return flow(answerQuiz)(state, key);
}

export function answerQuiz(state, key) {
  const quiz = state.get('quiz');
  const entity = state.get('entity');
  if (entity && entity.get('type') === 'houseA')
    if (quiz && quiz.get('solution') === key) {
      console.log('solved');
      playSound('oh');
      return flow(incrementHealth, askNewQuiz)(state);
    }
    else {
      console.log('wrong');
      playSound('hit-shriek');
      return state.update('health', (h) => h - 1);
    }
  return state;
}

function incrementHealth(state) {
  return state.update('health', (h) => h + 1);
}

function askNewQuiz(state) {
  return state.setIn('quiz', askQuiz());
}

export function solveQuiz(key) {
  return { type, key };
};

export function askQuiz() {

  const firstNumber = getRandom(19, 5);
  const secondNumber = getRandom(20 - firstNumber, 1);
  var solution = firstNumber + secondNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ?';

  console.log('askQuiz()' + firstNumber + " " + secondNumber + " " + solution);

  if (secondNumber < 10) {
    question = solution + ' - ' + firstNumber + ' = ?';
    solution = secondNumber;
  } else if (solution > 9) {
    solution = Math.abs(firstNumber - secondNumber);
    question = secondNumber + ' + ? = ' + firstNumber;
  }

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + ''
  };
}

export function getRandom(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
