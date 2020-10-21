import React, {PropTypes} from 'react';

import {createPureComponent} from 'utils/createPureComponent';
import {canKill} from 'state/definitions/abilities';

const defaultText = [
  'Befreie die Prinzessin vom bösen Zauberer aus der Burg. Wenn Du alle Edelsteine gesammelt hast, kannst Du die Prinzessin freikaufen. Im Haus des Zahlenmeisters kannst Du Geld für Werkzeuge verdienen. Passe auf, dass Du schnell bist, sonst ist die Zeit abgelaufen. Im Haus des Uhrmachers kannst Du neue Zeit kaufen.',
  'Leider hast Du die Prinzessin immer noch nicht gefunden. Dafür bist Du durch einen geheimen Tunnel in ein neues Land gekommen. Dabei hast Du alle Deine Werzeuge verloren. Sammle auch hier alle Edelsteine und gehe damit zur Burg.',
  'Leider hast Du die Prinzessin immer noch nicht gefunden. Du hast Dich jetzt in eine Großstadt verirrt. Kannst Du die Prinzession hier finden?',
  'Leider hast Du die Prinzessin immer noch nicht gefunden. Du befindest Dich jetzt in einem dichten Dschungel. Kannst Du die Prinzession hier finden?',
  'Leider hast Du die Prinzessin immer noch nicht gefunden. Du befindest Dich jetzt einer Burg. Suche den König. Er wird Dir weiterhelfen.',
  'Ich kann Dir leider nicht helfen.'
];

function getText(text, gameLevel) {
  if (typeof text === 'string' || text instanceof String) {
    return text;
  }
  else if (text instanceof Array) { // text is dependent on level => Array
    if (gameLevel <= text.length) {
      return text[gameLevel - 1];
    }
    else {
      return text[0];
    }
  }
  else if (!text) {
    return '';
  }
  else { // text is dependent on level => Immutable List
    if (gameLevel <= text.size) {
      return text.get(gameLevel - 1);
    }
    else {
      return text.get(0);
    }
  }
}

export default createPureComponent({

  displayName: 'Instructions',

  propTypes: {
  },

  getQuiz(quiz) {
    return quiz.get('question');
  },

  getQuiz2(quiz) {
    return quiz.get('question2');
  },

  displayText(entity, type, message, state) {
    if (!entity) {
      return getText(defaultText, state.get('gameLevel'));
    }
    else if (message) {
      return message;
    } else if (entity.get('type') === 'houseA') {
      return 'Löse die Aufgabe und Du bekommst ein Goldstück';
    }
    else if (type !== 'empty') {
      return ((!entity.get('canKill') || canKill(state, entity)) && getText(entity.get('text'), state.get('gameLevel'))) || ' '; // when powerup was collected do not display text
    }

  },

  displayQuiz(entity, quiz, state) {
    if (entity && entity.get('type') === 'houseA') {
      let quizText = this.getQuiz(quiz);
      let keybuffer = state.get('keybuffer');
      if (keybuffer) {
        quizText = quizText.replace("?", keybuffer + "?");
      }
      return quizText;
    }
  },

  displayQuiz2(entity, quiz, state) {
    if (entity && entity.get('type') === 'houseA') {
      return this.getQuiz2(quiz);
    }
  },

  render() {
    const { entity, type, quiz, message, state } = this.props;

    return (
        <div>
            {this.displayText(entity, type, message, state)}
          <br/>
          <br/>
            {this.displayQuiz(entity, quiz, state)} <br/>
            {this.displayQuiz2(entity, quiz, state)}
        </div>
    );
  }

});
