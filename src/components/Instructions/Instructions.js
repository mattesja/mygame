import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createPureComponent } from 'utils/createPureComponent';

export default createPureComponent({

    displayName: 'Instructions',

    render() {
        const { entity } = this.props;

        const initialText = 'Befreie die Prinzessin vom bösen Zauberer aus der Burg. Wenn Du alle Edelsteine gesammelt hast, kann Du die Prinzessin freikaufen.';

        return (
            <div>
            {entity && (entity.get('text') || ' ') || initialText}
            </div>
        );
    }

});
