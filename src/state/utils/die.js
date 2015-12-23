import flow from 'lodash/function/flow';

export default function die(state) {
    setTimeout(function() {window.location.reload(false)}, 10);
    return state.set('deaths', state.get('deaths') + 1);
};
