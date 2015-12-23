import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import Instructions from 'components/Instructions/Instructions';

import { askQuiz } from 'state/actions/askQuiz';

function mapStateToProps(state) {
    return {
        entity: state.get('entity'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
      quizSolution(solution) {
        dispatch(askQuiz(solution));
      }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Instructions);
