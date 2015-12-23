import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createPureComponent } from 'utils/createPureComponent';

const initialText = 'Befreie die Prinzessin vom bösen Zauberer aus der Burg. Wenn Du alle Edelsteine gesammelt hast, kann Du die Prinzessin freikaufen.';

function getQuiz() {
    return "1 + 2 = ?";
}

function displayText(entity) {
    if (entity && entity.get('type') === 'houseA') {
        return 'Löse die Aufgabe und Du bekommst ein Goldstück';
    }
    else {
        return entity && (entity.get('text') || ' ') || initialText;
    }

}
function displayQuiz(entity) {
    if (entity && entity.get('type') === 'houseA') {
        return getQuiz();
    }
}


export default createPureComponent({

    displayName: 'Instructions',

    render() {
        const { entity } = this.props;

        return (
            <div>
            {displayText(entity)}
            <br/>
            <br/>
            {displayQuiz(entity)}
            </div>
        );
    }

});
