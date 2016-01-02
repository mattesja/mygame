import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import Instructions from 'components/Instructions/Instructions';

function mapStateToProps(state) {
    return {
        entity: state.get('entity'),
        type: state.get('type'),
        quiz: state.get('quiz'),
        message: state.get('message'),
        state: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Instructions);
