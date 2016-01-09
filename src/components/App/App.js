import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

import { createPureComponent } from 'utils/createPureComponent';

export default createPureComponent({

  displayName: 'App',

  renderLink() {
    const isEditing = this.props.location.pathname === '/editor';
    const to = isEditing ? '/' : '/editor';
    const text = isEditing ? 'Play this level' : 'Edit this level';
    return (<Link to={to}>{text}</Link>);
  },

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }

});
