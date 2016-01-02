import Immutable from 'immutable';

import flatten from 'lodash/array/flatten';
import curry from 'lodash/function/curry';
import flow from 'lodash/function/flow';

import { typeIs } from 'state/definitions/entities';

import player from 'state/models/player';
import level from 'state/models/level';

import * as level1 from 'state/levels/level-01';
import * as level2 from 'state/levels/level-02';

import reset from 'state/utils/reset';

import {
  parseGrounds,
  parseEntities
} from 'state/utils/parseLevel';

const levels = Object.freeze([
  level1,
  level2
]);

const dataFor = curry((key, level) => {
  return (
    JSON.parse(localStorage.getItem(key)) ||
    level[key]
  );
});

const entitiesFor = dataFor('entities');
const groundsFor = dataFor('grounds');

export const type = 'CHANGE_LEVEL';

export function reduce(state, action) {
  return setLevel(state, action.level);
};

export function setNextLevel(state) {
  const incLevel = (s) => s.update('gameLevel', (l) => l + 1);
  return flow(incLevel, setLevelByState)(state);
}

export function setLevelByState(state) {
  return setLevel(state, state.get('gameLevel'));
}

export function setLevel(state, level) {
  return setLevelData(state, levels[level - 1])
}

export function setLevelData(state, levelData) {
  const entities = parseEntities(entitiesFor(levelData));
  const grounds = parseGrounds(groundsFor(levelData));
  const flatEntities = flatten(entities);
  const numTapesTotal = flatEntities.filter(typeIs('tape')).length;
  const start = flatEntities.filter(typeIs('start'))[0];
  return flow(
      player.setCoords(start.col, start.row),
      level.setPlayerStart([start.col, start.row]),
      level.setEntities(Immutable.fromJS(entities)),
      level.setGrounds(Immutable.fromJS(grounds)),
      level.setNumTapesTotal(numTapesTotal),
      reset
  )(state);
}

export function toChangeLevel(level) {
  return { type, level };
};
