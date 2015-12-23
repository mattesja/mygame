import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createPureComponent } from 'utils/createPureComponent';

export default createPureComponent({

  displayName: 'Instructions',

  propTypes: {
    quizSolution: PropTypes.func.isRequired
  },

    getQuiz() {
      this.props.quizSolution(3);
      return "1 + 2 = ?";
    },

  displayText(entity) {
    if (entity && entity.get('type') === 'houseA') {
      return 'Löse die Aufgabe und Du bekommst ein Goldstück';
    }
    else {
      return entity && (entity.get('text') || ' ') || 'Befreie die Prinzessin vom bösen Zauberer aus der Burg. Wenn Du alle Edelsteine gesammelt hast, kann Du die Prinzessin freikaufen.';
    }

  },

  displayQuiz(entity) {
    if (entity && entity.get('type') === 'houseA') {
      return this.getQuiz();
    }
  },

  render() {
    const { entity } = this.props;

    return (
        <div>
            {this.displayText(entity)}
          <br/>
          <br/>
            {this.displayQuiz(entity)}
        </div>
    );
  }

});
