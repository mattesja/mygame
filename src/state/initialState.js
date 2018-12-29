import Immutable from 'immutable';

import { askQuiz } from 'state/actions/quiz';

export const initialState = Immutable.fromJS({
  editor: {
    activeEntity: null,
    activeGround: null,
  },
  router: null,
  gameLevel: 1,
  numTapes: 0,
  keybuffer: '',
  deaths: 0,
  time: 10 * 60,
  powerups: [],
  // powerups: ['speedboat', 'hammer', 'boots', 'sunglasses','silverware'],
  health: 2,
  hasWon: false,
  timeStopped: false,
  quiz: askQuiz(),
  player: {
    // row: null,
    // col: null,
    direction: 'left'
  }
});
