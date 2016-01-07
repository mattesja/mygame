import flow from 'lodash/function/flow';

import die from 'state/utils/die';
import reset from 'state/utils/reset';

export const type = 'UPDATE_TIME';

export function reduce(state, action) {
  const entity = state.get('entity');
  if (entity && (entity.get('type') == 'musichall' || entity.get('type') == 'houseA')) { // -> do not change time in house of watch maker
    return state;
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
