import flow from 'lodash/function/flow';
import {playSound} from 'utils/sound';
import Immutable from 'immutable';

export const type = 'SOLVE';

export function reduce(state, { key }) {
  return flow(answerQuiz)(state, key);
}

export function answerQuiz(state, key) {
  const quiz = state.get('quiz');
  const entity = state.get('entity');
  var keybuffer = state.get('keybuffer');
  if (entity && entity.get('type') === 'houseA') {
    if (key === 'enter') {
      if (quiz && quiz.get('solution') === keybuffer) {
          console.log('solved');

          if (quiz.get('question2')) {
            playSound('oh');
            return flow(incrementHealth, askQuiz2, resetKeybuffer)(state);
          } else {
            playSound('sunglasses');
            return flow(incrementHealth, askNewQuiz, resetKeybuffer)(state);
          }
      } else {
        console.log('wrong');
        playSound('hit-shriek');
        return flow(decrementHealth, resetKeybuffer)(state);
      }
    } if (key === 'backspace') {
      if (keybuffer.length > 0) {
        playSound('klick');
        return state.update('keybuffer', (k) => k.slice(0, -1));
      } else {
        return state;
      }
    }
    else if (quiz) {
      var solution = quiz.get('solution');
      var keybuffer = state.get('keybuffer');
      console.log('partial key ' + key + ' solution ' + solution + ' keybuffer ' + keybuffer);
      playSound('klick');
      if (keybuffer.length < 10) {
        return state.update('keybuffer', (k) => k + key);
      }
      else {
        return state;
      }
    }
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

export function resetKeybuffer(state) {
  return state.set('keybuffer', '');
}

function askQuiz2(state) {
  const quiz = state.get('quiz');
  const question = quiz.get('question2');
  const solution = quiz.get('solution2');

  const newquiz = quiz.set('question', question).set('solution', solution).set('question2', undefined).set('solution2', undefined);
  return state.set('quiz', newquiz);
}

export function askNewQuiz(state) {
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
    return askQuiz_addition_pair_minus();
  }
  else if (quizLevel === 'B') {
    return askQuiz_fraction();
  }
  else if (quizLevel === 'C') {
    return askQuiz_fraction_shorten();
  }
  else if (quizLevel === 'D') {
    return askQuiz_minus_over_10();
  }
  else if (quizLevel === 'E') {
    return askQuiz_random_type();
  }
  else if (quizLevel === 'P') {
    return askQuiz_addition_pair2();
  }
  else if (quizLevel === 'K') {
    return askQuiz_komma();
  }
  else if (quizLevel === 'L') {
    return askQuiz_addition_pair();
  }
  else if (quizLevel === 'M') {
    return askQuiz_multiplication();
  }
  else if (quizLevel === 'N') {
    return askQuiz_multiplication2();
  }
  else if (quizLevel === 'V') {
    return askQuiz_division();
  }
  else if (quizLevel === 'Q') {
    return askQuiz_cheat();
  }
  return askQuiz_fraction_shorten();
}

export function askQuiz_addition_10() {

  const firstNumber = getRandom(5, 1);
  const secondNumber = getRandom(5, 3);
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

  const firstNumber = getRandom(10, 3);
  const secondNumber = getRandom(firstNumber-1, 2);
  var solution = firstNumber - secondNumber;
  var question = firstNumber + ' - ' + secondNumber + ' = ?';

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

  const order = getRandom(0, 4);
  const firstNumber = getRandom(0, 10);
  const secondNumber = getRandom(1, 90  - firstNumber);
  var solution = firstNumber + secondNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ?';
  var question2 = firstNumber + ' + ' + (secondNumber + 10 ) + ' = ?';
  var solution2 = solution + 10;

  if (order >= 2) {
    var solution3 = solution;
    var question3 = question;
    solution = solution2;
    question = question2;
    solution2 = solution3;
    question2 = question3;
  }

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: question2,
    solution2: solution2 + ''
  };
}

export function askQuiz_addition_pair_minus() {

  const order = getRandom(0, 4);
  const secondNumber = getRandom(9, 1);
  const firstNumber = getRandom(secondNumber, 89);
  var solution = firstNumber - secondNumber;
  var question = firstNumber + ' - ' + secondNumber + ' = ?';
  var firstNumber2 = firstNumber + 10;
  var question2 = firstNumber2 + ' - ' + secondNumber + ' = ?';
  var solution2 = solution + 10;

  if (order >= 2) {
    var solution3 = solution;
    var question3 = question;
    solution = solution2;
    question = question2;
    solution2 = solution3;
    question2 = question3;
  }

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: question2,
    solution2: solution2 + ''
  };
}


export function askQuiz_addition_pair2() {

  const order = getRandom(0, 4);
  const secondNumber = getRandom(12, 90);
  const firstNumber = getRandom(300, 100);
  var solution = firstNumber + secondNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ?';
  var firstNumber2 = firstNumber + 10;
  var question2 = firstNumber2 + ' + ' + secondNumber + ' = ?';
  var solution2 = solution + 10;

  if (order >= 2) {
    var solution3 = solution;
    var question3 = question;
    solution = solution2;
    question = question2;
    solution2 = solution3;
    question2 = question3;
  }

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: question2,
    solution2: solution2 + ''
  };
}
export function askQuiz_addition_pair() {

  const order = getRandom(0, 4);
  const secondNumber = getRandom(1, 9);
  const firstNumber = getRandom(5, 80);
  var solution = firstNumber + secondNumber;
  var question = firstNumber + ' + ' + secondNumber + ' = ?';
  var firstNumber2 = firstNumber + 10;
  var question2 = firstNumber2 + ' + ' + secondNumber + ' = ?';
  var solution2 = solution + 10;

  if (order >= 2) {
    var solution3 = solution;
    var question3 = question;
    solution = solution2;
    question = question2;
    solution2 = solution3;
    question2 = question3;
  }

  console.log('askQuiz() ' + question + "==" + solution + " "+ firstNumber + " " + secondNumber + " " );

  return {
    question: question,
    solution: solution + '',
    question2: question2,
    solution2: solution2 + ''
  };
}



export function askQuiz_sum_100() {

  const firstNumber = getRandom(99, 1);
  const secondNumber = 100;
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

export function askQuiz_sum_10() {

  const firstNumber = getRandom(10, 1);
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

export function askQuiz_division() {

  const potenz1 = getRandom(2,0);
  const potenz2 = getRandom(1,0);
  const quotient = getRandom(2, 9) * Math.pow(10, potenz1);
  const divisor = getRandom(2, 9) * Math.pow(10, potenz2);
  const dividend = divisor * quotient;
  var question = dividend + ' : ' + divisor + ' = ?';

  return {
    question: question,
    solution: quotient + '',
    question2: undefined,
    solution2: undefined
  };
}
export function askQuiz_multiplication() {

  const factor1 = getRandom(9, 5);
  const factor2 = getRandom(2, 9);
  const product = factor1 * factor2;
  var question = factor1 + ' • ' + factor2 + ' = ?';

  return {
    question: question,
    solution: product + '',
    question2: undefined,
    solution2: undefined
  };
}
export function askQuiz_multiplication2() {

  const factor1 = getRandom(9, 2);
  const factor2 = getRandom(10, 99);
  const product = factor1 * factor2;
  var question = factor1 + ' • ' + factor2 + ' = ?';

  return {
    question: question,
    solution: product + '',
    question2: undefined,
    solution2: undefined
  };
}

export function askQuiz_fraction() {

  const nennerValues = [2, 4, 5, 8, 10, 20, 25, 50, 40, 100, 200, 250, 500, 1000];

  var nenner = nennerValues[getRandom(nennerValues.length - 1, 0)];
  var zaehler = getRandom(6, 1);

  if (zaehler === nenner) {
    zaehler += 1;
  }

  var solutionNum = zaehler / nenner;
  var solution = solutionNum.toLocaleString('de-DE', {maximumFractionDigits:5});
  var question = zaehler + ' / ' + nenner + ' = ? ';

  return {
    question: question,
    solution: solution,
    question2: undefined,
    solution2: undefined
  };
}


export function askQuiz_fraction_shorten() {

  const prim = [2, 3, 5, 7];
  const multValues = [6, 7, 8, 9, 12, 15, 16, 40, 50];

  var nenner = prim[getRandom(prim.length - 1, 0)];
  var zaehler = prim[getRandom(prim.length - 1, 0)];

  if (zaehler === nenner) {
    zaehler += 1;
  }

  var mult = multValues[getRandom(multValues.length - 1, 0)];
  var zaehler2 = zaehler * mult;
  var nenner2 = nenner * mult;

  return {
    question: zaehler2+" = ?",
    solution: zaehler + "",
    question2: nenner2+"     ?",
    solution2: nenner + ""
  };
}


export function askQuiz_komma() {

  const units = ['km', 'm', 'cm', 'mm'];
  const pots = [1000, 1, 0.01, 0.001];

  var unit1 = getRandom(2, 0);
  var unit2;
  if (unit1 == 0) { // km
    unit2 = 1; // m
  } else {
    unit2 = getRandom(3, unit1+1);
  }

  var value = getRandom(1, 250) * 4;
  value = value / power10(getRandom(2, 0));

  const reverse = getRandom(1, 0);
  var solutionNum;
  if (reverse == 1) {
    var unittmp = unit1;
    unit1 = unit2;
    unit2 = unittmp;
    solutionNum = value / pots[unit1] * pots[unit2];
  } else {
    solutionNum = value * pots[unit1] / pots[unit2];
  }

  var question = value.toLocaleString() + ' ' + units[unit1] + ' = ? ' + units[unit2]; // + 'u1'+unit1 + 'u2'+unit2
  var solutionNum = value * pots[unit1] / pots[unit2];
  var solution = solutionNum.toLocaleString('de-DE', {maximumFractionDigits:5}).replace('.','');

  return {
    question: question,
    solution: solution,
    question2: undefined,
    solution2: undefined
  };
}

export function power10(power) {
  return Math.pow(10, power)
}

export function askQuiz_cheat() {

  const firstNumber = 1;
  const secondNumber = 0;
  var solution = 1;
  var question = '1 + 0 = ?';

  console.log('askQuiz() ' + question + "==" + solution + " " + firstNumber + " " + secondNumber + " ");

  return {
    question: question,
    solution: solution + '',
    question2: undefined,
    solution2: undefined
  };
}



export function getRandom(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
