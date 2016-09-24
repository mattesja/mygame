import * as quiz  from 'state/actions/quiz';

import {List, Map} from 'immutable';


//import assert from 'assert';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import {expect} from 'chai';
import {assert} from 'chai';
//assert();

chai.use(chaiImmutable);

describe('quiz', function () {
  describe('#quiz()', function () {
    it('should generate quiz', function (done) {
      // given
      console.log(quiz);

      // when
      //const nextState = quiz.askNewQuiz(Map());
      //
      //console.log(nextState);

      // then
      //const expectedState = Map({question: '11 - 9 = ?',
      //  solution: '2',
      //  question2: undefined,
      //  solution2: undefined});
      //assert.deepEqual(expectedState, nextState);

      //console.log(assert);
      //console.log(nextState);
      //console.log(nextState.get);
      //console.log(expectedState.get);

      //assert.ok(expectedState.get('solution'));
      //expect(nextState).to.equal(expectedState);

      done();
    });
  });
});
