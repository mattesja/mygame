import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createPureComponent } from 'utils/createPureComponent';

export default createPureComponent({

  displayName: 'Instructions',

  propTypes: {
  },

  getQuiz(quiz) {
    return quiz.get('question');
  },

  displayText(entity) {
    if (entity && entity.get('type') === 'houseA') {
      return 'Löse die Aufgabe und Du bekommst ein Goldstück';
    }
    else {
      return entity && (entity.get('text') || ' ') || 'Befreie die Prinzessin vom bösen Zauberer aus der Burg. Wenn Du alle Edelsteine gesammelt hast, kann Du die Prinzessin freikaufen. Im Haus des Zahlenmeisters kannst Du Geld für Werkzeuge verdienen.';
    }

  },

  displayQuiz(entity, quiz) {
    if (entity && entity.get('type') === 'houseA') {
      return this.getQuiz(quiz);
    }
  },

  render() {
    const { entity, quiz } = this.props;

    return (
        <div>
            {this.displayText(entity)}
          <br/>
          <br/>
            {this.displayQuiz(entity, quiz)}
        </div>
    );
  }

});
