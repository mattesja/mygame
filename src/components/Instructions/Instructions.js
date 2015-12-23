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

  displayText(entity, type, message) {
    if (!entity) {
      return 'Befreie die Prinzessin vom bösen Zauberer aus der Burg. Wenn Du alle Edelsteine gesammelt hast, kann Du die Prinzessin freikaufen. Im Haus des Zahlenmeisters kannst Du Geld für Werkzeuge verdienen.';
    }
    else if (message) {
      return message;
    } else if (entity.get('type') === 'houseA') {
      return 'Löse die Aufgabe und Du bekommst ein Goldstück';
    }
    else if (type !== 'empty') {
      return entity.get('text') || ' ';
    }

  },

  displayQuiz(entity, quiz) {
    if (entity && entity.get('type') === 'houseA') {
      return this.getQuiz(quiz);
    }
  },

  render() {
    const { entity, type, quiz, message } = this.props;

    return (
        <div>
            {this.displayText(entity, type, message)}
          <br/>
          <br/>
            {this.displayQuiz(entity, quiz)}
        </div>
    );
  }

});
