import curry from 'lodash/function/curry';

import level from 'state/models/level';

import {
  not,
  hasBoots,
  hasHammer,
  hasSilverware,
  hasSpeedboat,
  hasSunglasses,
  returnTrue
} from 'state/definitions/abilities';

const canBlock = returnTrue;
const canCollect = returnTrue;
const canDestroy = returnTrue;
const canKill = returnTrue;
const canHeal = returnTrue;
const canWin = (s) => s.get('numTapes') >= level.getNumTapesTotal(s);

const blocksUnless = (hasAbility) => ({
  canBlock: not(hasAbility),
  canDie: hasAbility
});

const is = curry((prop, val, entity) => entity[prop] === val);

export const typeIs = is('type');

const blockText = 'Hier geht es nicht weiter.';
const blockTextUnlessHammer = 'Hier geht es nicht weiter. Aber ein Hammer könnte Dir helfen.';
const blockTextUnlessBoat = 'Hier geht es nicht weiter. Aber ein Boot könnte Dir helfen.';

export const entities = {
  '00': { type: 'empty', text: '' },
  '01': { type: 'start' },
  // Special
  SA: { type: 'tape', canCollect, text: 'Toll! Du hast einen Edelstein gefunden.' },
  SB: { type: 'door', canWin, canDestroy: canWin, canBlock: not(canWin) },
  SC: { type: 'person' },
  SD: { type: 'invisible', canBlock },
  SE: { type: 'ghost' },
  // Powerups
  PA: { type: 'sunglasses', canCollect },
  PB: { type: 'silverware', canCollect },
  PC: { type: 'speedboat',  canCollect },
  PD: { type: 'boots',      canCollect },
  PE: { type: 'hammer',     canCollect },
  // Bounds
  BA: { type: 'treeA',    canBlock, text: blockText },
  BB: { type: 'treeB',    canBlock },
  BC: { type: 'building', canBlock },
  BD: { type: 'rabbit',   ...blocksUnless(hasHammer) },
  BE: { type: 'chicken',  ...blocksUnless(hasHammer) },
  BF: { type: 'fishA',    ...blocksUnless(hasSpeedboat) },
  BG: { type: 'fishB',    ...blocksUnless(hasSpeedboat) },
  BH: { type: 'turtle',   ...blocksUnless(hasBoots) },
  BI: { type: 'camel',    ...blocksUnless(hasHammer) },
  BJ: { type: 'cloud',    canBlock },
  BK: { type: 'creepsun', ...blocksUnless(hasHammer) },
  BL: { type: 'palm',     canBlock },
  BM: { type: 'flowerA',  ...blocksUnless(hasBoots) },
  BN: { type: 'flowerB',  ...blocksUnless(hasBoots) },
  BO: { type: 'flowerC',  ...blocksUnless(hasBoots) },
  BP: { type: 'treeC',    canBlock },
  BQ: { type: 'leavesA',  canBlock },
  BR: { type: 'leavesB',  canBlock },
  BS: { type: 'leavesC',  canBlock },
  BT: { type: 'willows',  canBlock },
  BU: { type: 'shell',    ...blocksUnless(hasBoots) },
  BV: { type: 'snowflake', canBlock },
  BW: { type: 'banana',    canDestroy: hasSilverware },
  BX: { type: 'monkey',    ...blocksUnless(hasHammer) },
  BY: { type: 'elephant',  ...blocksUnless(hasHammer) },
  BZ: { type: 'houseA',    canBlock },
  CA: { type: 'houseB',    canBlock },
  CB: { type: 'mart',      canBlock },
  CC: { type: 'musichall', canBlock },
  CD: { type: 'moai',      ...blocksUnless(hasHammer) },
  // The sign
  ZI: { type: 'storesign--b', canBlock },
  ZJ: { type: 'storesign--u', canBlock },
  ZK: { type: 'storesign--g', canBlock },
  ZL: { type: 'storesign--v', canBlock },
  ZM: { type: 'storesign--i', canBlock },
  ZN: { type: 'storesign--d', canBlock },
  ZO: { type: 'storesign--e', canBlock },
  ZP: { type: 'storesign--o', canBlock },
  ZQ: { type: 'storesign--s', canBlock },
  ZR: { type: 'storesign--t', canBlock },
  ZS: { type: 'storesign--r', canBlock },
  // Killers without items
  DA: { type: 'sun',     canHeal: not(hasSunglasses) },
  DB: { type: 'corn',    canBlock: not(hasSilverware), canDestroy: hasSilverware },
  DC: { type: 'wave',    canBlock: not(hasSpeedboat) },
  DD: { type: 'fire',    canKill: not(hasBoots), canDestroy: hasBoots },
  DE: { type: 'snowman', canKill: not(hasHammer), canDie: hasHammer },
  DF: { type: 'santa',   canKill: not(hasHammer), canDie: hasHammer },
  DG: { type: 'shit',    canKill: not(hasBoots),  canDie: hasBoots },
  // Killers always
  KA: { type: 'bee',       canKill },
  KB: { type: 'gator',     canKill },
  KC: { type: 'snake',     canKill },
  KD: { type: 'carA',      canKill },
  KE: { type: 'carB',      canKill },
  KF: { type: 'taxi',      canKill },
  KG: { type: 'firetruck', canKill },
  KH: { type: 'police',    canKill },
  KI: { type: 'ambulance', canKill },
  KJ: { type: 'cactus',    canKill },
  KK: { type: 'tornado',   canKill },
};

export const powerupTypes = [
  entities.PA.type,
  entities.PB.type,
  entities.PC.type,
  entities.PD.type,
  entities.PE.type
];
