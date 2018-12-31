import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import isFunction from 'lodash/lang/isFunction';

import { createPureComponent } from 'utils/createPureComponent';

export const keyCodes = Object.freeze({
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
});

export const commandKeyCodes = Object.freeze({
  10: 'J',
  11: 'Z',
  12: 'S',
  21: 'A',
  22: 'B',
  23: 'C',
  24: 'D',
  25: 'E',
  26: 'F',
  27: 'M',
  28: 'V',
  29: 'Q'
});

const eventToProp = Object.freeze({
  keydown: 'onKeyDown',
  keyup: 'onKeyUp',
  keypress: 'onKeyPress'
});

export default createPureComponent({

  displayName: 'Keyboard',

  propTypes: {
    children: PropTypes.element.isRequired,
    keyFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    activeElementFilter: PropTypes.func,
    filter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func
  },

  getDefaultProps() {
    const returnTrue = () => true;
    const noop = () => {};
    return {
      keyFilter: returnTrue,
      activeElementFilter: returnTrue,
      filter: returnTrue,
      onKeyDown: noop,
      onKeyUp: noop
    };
  },

  toggleKeyboardBindings(turnOn) {
    // TODO: better to do this outside of component so
    // we don't get a ton of bindings.
    const method = `${turnOn ? 'add' : 'remove'}EventListener`;
    Object.keys(eventToProp).forEach((event) => {
      window[method](event, this.onKeyEvent);
    });
  },

  getEventKey(e) {
    const key = e.keyCode;
    return keyCodes[key] || String.fromCharCode(key);
  },

  onKeyEvent(e) {
    const handler = this.props[eventToProp[e.type]]; /// !!!
    if (handler) {
      if (this.matchesAllFilters(e)) {
        handler(this.getEventKey(e), e);
      }
    } else {
      // console.log("no handler found for " + e.type + " prop " + eventToProp[e.type]);
    }
  },

  matchesKey(key) {
    const { keyFilter } = this.props;
    return (
      isFunction(keyFilter) ?
      keyFilter(key) :
      key.toLowerCase() === keyFilter.toLowerCase()
    );
  },

  matchesActiveElement(target) {
    const { activeElement, body } = document;
    const { activeElementFilter } = this.props;
    return (
      (activeElement === body) ||
      activeElementFilter(activeElement, target)
    );
  },

  matchesFilter(key, modifiers, e) {
    return this.props.filter(key, modifiers, e);
  },

  matchesAllFilters(e) {
    const key = this.getEventKey(e);
    return (
      this.matchesKey(key) &&
      this.matchesActiveElement(e.target) &&
      this.matchesFilter(key, e)
    );
  },

  componentDidMount() {
    this.toggleKeyboardBindings(true);
  },

  componentWillUnmount() {
    this.toggleKeyboardBindings(false);
  },

  render() {
    return this.props.children;
  }

});
