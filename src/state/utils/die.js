import flow from 'lodash/function/flow';

  import { playSound } from 'utils/sound';

import * as changeLevel from 'state/actions/changeLevel';


export default function die(state) {
  playSound('hit-shriek');
  playSound('hit');
  return changeLevel.setLevel(state, 1);
};
