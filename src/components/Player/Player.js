import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import values from 'lodash/object/values';

import classNames from 'classnames';

import { createPureComponent } from 'utils/createPureComponent';

import Keyboard, { keyCodes } from 'components/Keyboard/Keyboard';
import Tile from 'components/Tile/Tile';

const arrowKeys = new Set(values(keyCodes));

export default createPureComponent({

  displayName: 'Player',

  propTypes: {
    type: PropTypes.string.isRequired,
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    onMove: PropTypes.func.isRequired,
    onSolve: PropTypes.func.isRequired
  },

  isNumberKey(key) {
    return !isNaN(key);
  },

  isMoveKey(key) {
    return arrowKeys.has(key);
  },

  isRelevantKey(key) {
      return this.isMoveKey(key) || this.isNumberKey(key);
  },

  onKeyDown(key, e) {
    e.preventDefault();
    if (this.isMoveKey(key)) {
      this.props.onMove(key);
    }
    else if (this.isNumberKey(key)) {
      this.props.onSolve(key);
    }
  },

  render() {
    const { col, row, direction, type } = this.props;
    const attrs = {
      row,
      col,
      type,
      block: 'entity',
      className: classNames({
        'flipped--x': direction === 'right'
      })
    };
    return (
      <Keyboard
        keyFilter={this.isRelevantKey}
        onKeyDown={this.onKeyDown}
      >
        <Tile {...attrs} />
      </Keyboard>
    );
  }

});
