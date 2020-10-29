import Immutable from 'immutable';

import { askQuiz } from 'state/actions/quiz';

export const initialState = Immutable.fromJS({
  editor: {
    activeEntity: null,
    activeGround: null,
  },
  router: null,
  gameLevel: 7,
  numTapes: 0,
  keybuffer: '',
  deaths: 0,
  time: 120 * 60,
  powerups: [],
  // powerups: ['speedboat', 'hammer', 'boots', 'sunglasses','silverware', 'key'],
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
