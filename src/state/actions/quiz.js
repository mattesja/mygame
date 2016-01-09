import flow from 'lodash/function/flow';
import { playSound } from 'utils/sound';
import Immutable from 'immutable';

import buildModel from 'state/utils/buildModel';

export const type = 'SOLVE';

export function reduce(state, { key }) {
  return flow(answerQuiz)(state, key);
}

export function answerQuiz(state, key) {
  const quiz = state.get('quiz');
  const entity = state.get('entity');
  var keybuffer = state.get('keybuffer');
  if (entity && entity.get('type') === 'houseA') {
    if (quiz && quiz.get('solution') === keybuffer + key) {
      console.log('solved');

      if (quiz.get('question2')) {
        playSound('oh');
        return flow(askQuiz2, resetKeybuffer)(state);
      } else {
        playSound('sunglasses');
        return flow(incrementHealth, askNewQuiz, resetKeybuffer)(state);
      }
    }
    else if (quiz) {
      var solution = quiz.get('solution');
      var keybuffer = state.get('keybuffer');
      if (solution.length > keybuffer.length + 1 && solution.lastIndexOf(key, 0) === 0) { // only relevant for solutions with multiple digits
        console.log('partial key ' + key + ' solution ' + solution + ' keybuffer ' + keybuffer);
        playSound('klick');
        return state.update('keybuffer', (k) => k + key);
      }
    }
    console.log('wrong');
    playSound('hit-shriek');
    return flow(decrementHealth, resetKeybuffer)(state);
  }
  else { // key pressed outside house -> ignore
    return state;
  }
}

function incrementHealth(state) {
  return state.update('health', (h) => h + 1);
}

function decrementHealth(state) {
  return state.update('health', (h) => h - 1);
}

function resetKeybuffer(state) {
  return state.set('keybuffer', '');
}

function askQuiz2(state) {
  const quiz = state.get('quiz');
  const question = quiz.get('question2');
  const solution = quiz.get('solution2');

  const newquiz = quiz.set('question', question).set('solution', solution).set('question2', undefined).set('solution2', undefined);
  return state.set('quiz', newquiz);
}

function askNewQuiz(state) {
  const quizLevel = state.get('quizLevel');
  const newQuiz = askQuizIn(quizLevel);
  if (newQuiz) {
    const newstate = state.update('quiz', (q) => newQuiz);
    console.log('new quiz ' + newstate.get('quiz').get('solution') + ' for level ' + quizLevel);
    return newstate;
  }
  return state;
}

export function solveQuiz(key) {
  return { type, key };
};

function askQuizIn(quizLevel) {
  const newQuiz = askQuiz(quizLevel);
  return Immutable.fromJS(newQuiz);
}

export function askQuiz(quizLevel) {
  if (quizLevel === 'A') {
    return askQuiz_addition_pair();
  }
  else if (quizLevel === 'B') {
    return askQuiz_sum_10();
  }
  else if (quizLevel === 'C') {
    return askQuiz_addition_10();
  }
  else if (quizLevel === 'D') {
    return askQuiz_minus_over_10();
  }
  else if (quizLevel === 'E') {
    return askQuiz_random_type();
  }
  else if (quizLevel === 'F') {
    return askQuiz_addition_10();
  }
  return askQuiz_random_type();
}

export function askQuiz_addition_10() {

  const firstNumber = getRandom(9, 1);
  const secondNumber = getRandom(10, 3);
  var solution = secondNumber + firstNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ? ';

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: undefined,
    solution2: undefined
  };
}

export function askQuiz_sum_10() {

  const firstNumber = getRandom(9, 1);
  const secondNumber = 10;
  var solution = secondNumber - firstNumber;
  var question = firstNumber + ' + ? = ' + secondNumber;

  console.log('askQuiz() ' + question + "==" + solution + " " + firstNumber + " " + secondNumber + " ");

  return {
    question: question,
    solution: solution + '',
    question2: undefined,
    solution2: undefined
  };
}

export function askQuiz_minus_over_10() {

  const firstNumber = getRandom(12, 5);
  const secondNumber = getRandom(8, 4);
  var solution = firstNumber + secondNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ?';

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: undefined,
    solution2: undefined
  };
}

export function askQuiz_random_type() {

  const firstNumber = getRandom(10, 5);
  const secondNumber = getRandom(11 - firstNumber, 1);
  var solution = firstNumber + secondNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ?';

  if (secondNumber < 10) {
    question = solution + ' - ' + firstNumber + ' = ?';
    solution = secondNumber;
  } else if (solution > 9) {
    solution = Math.abs(firstNumber - secondNumber);
    question = secondNumber + ' - ? = ' + firstNumber;
  }

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: undefined,
    solution2: undefined
  };
}

export function askQuiz_addition_pair() {

  const firstNumber = getRandom(0, 10);
  const secondNumber = getRandom(1, 10 - firstNumber);
  var solution = firstNumber + secondNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ?';
  var question2 = '1' + firstNumber + ' + ' + secondNumber + ' = ?';
  var solution2 = solution + 10;

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: question2,
    solution2: solution2 + ''
  };
}


export function getRandom(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
