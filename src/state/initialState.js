import Immutable from 'immutable';

import { askQuiz } from 'state/actions/quiz';

export const initialState = Immutable.fromJS({
  editor: {
    activeEntity: null,
    activeGround: null,
  },
  router: null,
  gameLevel: 1,
  numTapes: 20,
  keybuffer: '',
  deaths: 0,
  time: 10 * 60,
  //powerups: [], // 'speedboat', 'hammer', 'boots', 'sunglasses','silverware'
  powerups: ['speedboat', 'hammer', 'boots', 'sunglasses','silverware'],
  health: 200,
  hasWon: false,
  quiz: askQuiz(),
  player: {
    // row: null,
    // col: null,
    direction: 'left'
  }
});
