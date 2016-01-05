import flow from 'lodash/function/flow';

import die from 'state/utils/die';
import reset from 'state/utils/reset';

export const type = 'UPDATE_TIME';

export function reduce(state, action) {
  const timeStopped = state.get('timeStopped');
  if (timeStopped) { // time is stopped
    const entity = state.get('entity');
    if (entity && entity.get('type') == 'musichall') { // -> do not change time in house of watch maker
      return state;
    }
    else { // reset flag in other positions
      return state.set('timeStopped', false);
    }
  }

  const newTime = Math.max(0, state.get('time') - 1);
  return (
    newTime === 0 ?
    flow(die, reset)(state) :
    state.set('time', newTime)
  );
};

export function toUpdateTime() {
  return { type };
};
