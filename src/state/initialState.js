import Immutable from 'immutable';

import { askQuiz } from 'state/actions/quiz';

export const initialState = Immutable.fromJS({
  editor: {
    activeEntity: null,
    activeGround: null,
  },
  router: null,
  // level: null,
  numTapes: 0,
  deaths: 0,
  time: 30 * 60,
  powerups: [], // 'speedboat', 'hammer', 'boots', 'sunglasses','silverware'
  //powerups: ['speedboat', 'hammer', 'boots', 'sunglasses','silverware'],
  health: 2,
  hasWon: false,
  quiz: askQuiz(),
  player: {
    // row: null,
    // col: null,
    direction: 'left'
  }
});
