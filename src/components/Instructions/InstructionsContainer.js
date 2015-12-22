import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import Instructions from 'components/Instructions/Instructions';

function mapStateToProps(state) {
    return {
        entity: state.get('entity'),
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
