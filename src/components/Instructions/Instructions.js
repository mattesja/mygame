import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createPureComponent } from 'utils/createPureComponent';

export default createPureComponent({

    displayName: 'Instructions',

    render() {
        const { entity } = this.props;

        return (
            <div>
            {JSON.stringify(entity)}

            </div>
        );
    }

});
