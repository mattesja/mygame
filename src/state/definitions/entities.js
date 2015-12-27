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
const isPowerup = returnTrue;
const canWin = (s) => s.get('numTapes') >= level.getNumTapesTotal(s);

const blockText = 'Hier geht es nicht weiter.';
const blockTextUnlessHammer = 'Hier geht es nicht weiter. Aber ein Hammer könnte Dir helfen.';
const blockTextUnlessSpeedboat = 'Hier geht es nicht weiter. Aber ein Boot könnte Dir helfen.';
const blockTextUnlessSilverware = 'Hier geht es nicht weiter. Aber ein Besteck könnte Dir helfen.';
const blockTextUnlessBoots = 'Hier geht es nicht weiter. Aber die Stiefel könnten Dir helfen.';
const canKillText = 'Aua! Das hat weh getan. Besser nicht mehr berühren.';

const blocksUnless = (hasAbility) => ({
  canBlock: not(hasAbility),
  canDie: hasAbility,
  text: getBlockText(hasAbility),
});

function getBlockText(hasAbility) {
    if (hasAbility === hasHammer) {
        return blockTextUnlessHammer;
    }
    else if (hasAbility === hasSilverware) {
        return blockTextUnlessSilverware;
    }
    else if (hasAbility === hasSpeedboat) {
        return blockTextUnlessSpeedboat;
    }
    else if (hasAbility === hasBoots) {
        return blockTextUnlessBoots;
    }
}

const is = curry((prop, val, entity) => entity[prop] === val);

export const typeIs = is('type');

export const entities = {
  '00': { type: 'empty', text: '' },
  '01': { type: 'start' },
  // Special
  SA: { type: 'tape', canCollect, text: 'Toll! Du hast einen Edelstein gefunden.' },
  SB: { type: 'door', canWin, canDestroy: canWin, canBlock: not(canWin) },
  SC: { type: 'person' },
  SD: { type: 'invisible', canWin, canDestroy: canWin, canBlock: not(canWin) },
  SE: { type: 'ghost' },
  // Powerups
  PA: { type: 'sunglasses', isPowerup, text: 'Toll! Du hast die Sonnenbrille gefunden. Möchtest Du diese für 5 Goldstücke kaufen? Tippe J' },
  PB: { type: 'silverware', isPowerup, text: 'Toll! Du hast das Besteck gefunden. Möchtest Du dieses für 5 Goldstücke kaufen? Tippe J' },
  PC: { type: 'speedboat',  isPowerup, text: 'Toll! Du hast das Boot gefunden. Möchtest Du dieses für 5 Goldstücke kaufen? Tippe J' },
  PD: { type: 'boots',      isPowerup, text: 'Toll! Du hast die Stiefel gefunden. Möchtest Du diese für 5 Goldstücke kaufen? Tippe J' },
  PE: { type: 'hammer',     isPowerup, text: 'Toll! Du hast den Hammer gefunden. Möchtest Du diesen für 5 Goldstücke kaufen? Tippe J' },
  // Bounds
  BA: { type: 'treeA',    canBlock, text: blockText },
  BB: { type: 'treeB',    canBlock, text: blockText },
  BC: { type: 'building', canBlock, text: blockText },
  BD: { type: 'rabbit',   ...blocksUnless(hasHammer) },
  BE: { type: 'chicken',  ...blocksUnless(hasHammer) },
  BF: { type: 'fishA',    ...blocksUnless(hasSpeedboat) },
  BG: { type: 'fishB',    ...blocksUnless(hasSpeedboat) },
  BH: { type: 'turtle',   ...blocksUnless(hasBoots) },
  BI: { type: 'camel',    ...blocksUnless(hasHammer) },
  BJ: { type: 'cloud',    canBlock, text: blockText },
  BK: { type: 'creepsun', ...blocksUnless(hasHammer) },
  BL: { type: 'palm',     canBlock, text: blockText },
  BM: { type: 'flowerA',  ...blocksUnless(hasBoots) },
  BN: { type: 'flowerB',  ...blocksUnless(hasBoots) },
  BO: { type: 'flowerC',  ...blocksUnless(hasBoots) },
  BP: { type: 'treeC',    canBlock, text: blockText },
  BQ: { type: 'leavesA',  canBlock, text: blockText },
  BR: { type: 'leavesB',  canBlock, text: blockText },
  BS: { type: 'leavesC',  canBlock, text: blockText },
  BT: { type: 'willows',  canBlock, text: blockText },
  BU: { type: 'shell',    ...blocksUnless(hasBoots) },
  BV: { type: 'snowflake', canBlock, text: blockText },
  BW: { type: 'banana',    canDestroy: hasSilverware },
  BX: { type: 'monkey',    ...blocksUnless(hasHammer) },
  BY: { type: 'elephant',  ...blocksUnless(hasHammer) },
  BZ: { type: 'houseA' },
  CA: { type: 'houseB',    canBlock, text: blockText },
  CB: { type: 'mart',      canBlock, text: blockText },
  CC: { type: 'musichall', canBlock, text: blockText },
  CD: { type: 'moai',      ...blocksUnless(hasHammer) },
  // The sign
  ZI: { type: 'storesign--b', canBlock, text: blockText },
  ZJ: { type: 'storesign--u', canBlock, text: blockText },
  ZK: { type: 'storesign--g', canBlock, text: blockText },
  ZL: { type: 'storesign--v', canBlock, text: blockText },
  ZM: { type: 'storesign--i', canBlock, text: blockText },
  ZN: { type: 'storesign--d', canBlock, text: blockText },
  ZO: { type: 'storesign--e', canBlock, text: blockText },
  ZP: { type: 'storesign--o', canBlock, text: blockText },
  ZQ: { type: 'storesign--s', canBlock, text: blockText },
  ZR: { type: 'storesign--t', canBlock, text: blockText },
  ZS: { type: 'storesign--r', canBlock, text: blockText },
  // Killers without items
  DA: { type: 'sun',     canKill: not(hasSunglasses), text: 'Aua! Hier hilft eine Sonnenbrille.' },
  DB: { type: 'corn',    ...blocksUnless(hasSilverware) },
  DC: { type: 'wave',    ...blocksUnless(hasSpeedboat) },
  DD: { type: 'fire',    canKill: not(hasBoots), canDestroy: hasBoots, text: 'Aua! Hier helfen die Stiefel.'  },
  DE: { type: 'snowman', canKill: not(hasHammer), canDie: hasHammer, text: 'Aua! Hier hilft der Hammer.' },
  DF: { type: 'santa', text: 'Wenn Du die Prinzessin befreien möchtest, musst Du ein gefährliches Abenteuer bestehen. Die Prinzessin befindet sich im Urwald der Schlangen.' },
  DG: { type: 'shit',    canKill: not(hasBoots),  canDie: hasBoots, text: 'Aua! Hier helfen die Stiefel.'  },
  // Killers always
  KA: { type: 'bee',       canKill, text: canKillText},
  KB: { type: 'gator',     canKill, text: canKillText},
  KC: { type: 'snake',     canKill, text: canKillText},
  KD: { type: 'carA',      canKill, text: canKillText},
  KE: { type: 'carB',      canKill, text: canKillText},
  KF: { type: 'taxi',      canKill, text: canKillText},
  KG: { type: 'firetruck', canKill, text: canKillText},
  KH: { type: 'police',    canKill, text: canKillText},
  KI: { type: 'ambulance', canKill, text: canKillText},
  KJ: { type: 'cactus',    canKill, text: canKillText},
  KK: { type: 'tornado',   canKill, text: canKillText},
  // Cards
  LA: { type: 'door2',    text: "Der böse Zauberer ist vor wenigen Tagen auf seinem Kamel mit der Prinzessin fortgeritten. Vielleicht kann Dir das Kamel weiterhelfen. Suche das Kamel in den Kakteen in der Wüste." },
  LB: { type: 'camel2',    text: "Der Zauberer sprach mit der bösen Hexe. Er sagt, dass er die Prinzessin auf einer Insel verstecken möchte. Suche den Affen auf der Insel im See. Vielleicht kann er dir weiterhelfen."},
  LC: { type: 'monkey2',  text: "Der Zauberer ist zum Nordpol aufgebrochen. Vielleicht kann Dir der Schneemann weiterhelfen. Suche den Schneeman am Nordpol."},
  LD: { type: 'snowman2',  text: "Gestern habe ich mit dem Weihnachtsmann gesprochen. Er ist mit seinem Schlitten schon durch die ganze Welt gereist. Er kann Dir bestimmt helfen."},
};

export const powerupTypes = [
  entities.PA.type,
  entities.PB.type,
  entities.PC.type,
  entities.PD.type,
  entities.PE.type
];
