import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import Instructions from 'components/Instructions/Instructions';


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onWillMount() {
            dispatch(toChangeLevel(1));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Instructions);
