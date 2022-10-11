import React from 'react';
import constants from './constants.json';

const maxKontingent = 14; // partners can take 14 months basis maximum
const minPartnerBasis = 2; // 2nd partner has to take min. 2 months to get 14 basis in total
const maxMonthBasis = 14;
const maxKontingentBonus = 8;
const minKontingentBonus = 4;

const BASIS = constants.varianten.basis.id;
const PLUS = constants.varianten.plus.id;
const BONUS = constants.varianten.bonus.id;
const NONE = constants.varianten.none.id;

// calculate Kontingent for EG+ and Basis
const calculateBasisPlusKontingent = (newEgPlan) => {
  const kontingentTaken = [0, 0];
  for (let i = 0; i < newEgPlan.length; i += 1) {
    for (let j = 0; j < newEgPlan[i].months.length; j += 1) {
      if (newEgPlan[i].months[j].variant === BASIS) {
        kontingentTaken[i] += 1;
      } else if (newEgPlan[i].months[j].variant === PLUS) {
        kontingentTaken[i] += 0.5;
      }
    }
  }
  return kontingentTaken;
};

const checkPartnermonate = (kontingentTaken) => {
  // if more than 12 months total
  if (kontingentTaken[0] + kontingentTaken[1] > maxKontingent - 2) {
    if (kontingentTaken[1] < 2 || kontingentTaken[0] < 2) {
      throw new Error(
        'Um die Partnermonate beanspruchen zu können, müssen beide Elternteile mind. 2 Monate Basiselterngeld beziehen.'
      );
    }
  }
};

// <--- BASIS --->
// checks if kontingent for Basis is already used up
const checkKontingentBasis = (newEgPlan) => {
  const kontingentTaken = calculateBasisPlusKontingent(newEgPlan);
  const totalKontingentTaken = kontingentTaken[0] + kontingentTaken[1];

  if (totalKontingentTaken >= maxKontingent + 1) {
    throw new Error('Dein Kontingent für Basiselterngeld und Elterngeldplus ist aufgebraucht.');
  } else if (totalKontingentTaken === maxKontingent + 0.5) {
    // if Kontingent is 13.5 user can still take one EG+ month
    throw new Error(
      'Dein Kontingent für Basiselterngeld ist aufgebraucht. Du kannst noch 1 Monat ElterngeldPlus beziehen.'
    );
  }

  checkPartnermonate(kontingentTaken);
};

// check if month is possible for Basis
const checkBasisAssignment = (newEgPlan) => {
  for (let i = 0; i < newEgPlan.length; i += 1) {
    for (let j = maxMonthBasis; j < constants.numberMonths; j += 1) {
      if (newEgPlan[i].months[j].variant === BASIS) {
        throw new Error('Du kannst Basiselterngeld nur bis zum 14. Lebensmonat beziehen.');
      }
    }
  }
};

const checkBasis = (newEgPlan) => {
  checkKontingentBasis(newEgPlan);
  checkBasisAssignment(newEgPlan);
};

// <--- PLUS --->
const checkKontingentPlus = (newEgPlan) => {
  const kontingentTaken = calculateBasisPlusKontingent(newEgPlan);
  const totalKontingentTaken = kontingentTaken[0] + kontingentTaken[1];

  if (totalKontingentTaken >= maxKontingent + 0.5) {
    throw new Error('Dein Kontingent für Basiselterngeld und Elterngeldplus ist aufgebraucht.');
  }

  checkPartnermonate(newEgPlan, kontingentTaken);
};

const checkPlus = (newEgPlan) => {
  checkKontingentPlus(newEgPlan);
};

// <----BONUS---->

// checks if kontingent for PB months is used up
const checkKontingentBonus = (bonusMonths) => {
  const kontingentBoth = bonusMonths[0].months.length + bonusMonths[1].months.length;
  if (kontingentBoth > maxKontingentBonus) {
    throw new Error('Dein Kontingent für Partnerschaftsbonus ist aufgebraucht.');
  } else if (kontingentBoth < minKontingentBonus) {
    throw new Error(
      'Ihr müsst beide mindestens 2 Monate Partnerschaftsbonus beziehen um ihn beanspruchen zu können.'
    );
  }
};

// checks if PB months are taken in consecutive months
const checkBonusConsecutiveMonths = (bonusMonths) => {
  for (let i = 0; i < bonusMonths[0].months.length; i += 1) {
    if (i < bonusMonths[0].months.length - 1) {
      if (bonusMonths[0].months[i + 1].monthid - bonusMonths[1].months[i].monthid > 1) {
        throw new Error('Partnerschaftsbonus-Monate müssen am Stück genommen werden.');
      }
    }
  }
  // let lastAppearance;
  // for (let i = 0; i < newEgPlan[0].months.length; i += 1) {
  //   if (newEgPlan[0].months[i].variant === BONUS) {
  //     if (lastAppearance === undefined) {
  //       lastAppearance = i;
  //     } else if (i - lastAppearance > 1) {
  //       throw new Error('Partnerschaftsbonus-Monate müssen am Stück genommen werden.');
  //     }
  //     lastAppearance = i;
  //   }
  // }
};

// checks if PB is taken simulatenously by both partners
const checkBonusBothPartners = (bonusMonths) => {
  const errorMessage =
    'Partnerschaftsbonus-Monate müssen immer von beiden Elternteilen gleichzeitig genommen werden.';

  if (bonusMonths[0].months.length !== bonusMonths[1].months.length) {
    // if both don't take the same amount of PB months
    throw new Error(errorMessage);
  }
  for (let i = 0; i < bonusMonths[0].months.length; i += 1) {
    // if both take PB months in different months
    if (bonusMonths[1].months[i].monthid !== bonusMonths[0].months[i].monthid) {
      throw new Error(errorMessage);
    }
  }
};

const checkBonus = (newEgPlan) => {
  const bonusMonths = [];
  for (let i = 0; i < newEgPlan.length; i += 1) {
    bonusMonths.push({ parentid: i, months: [] });
    for (let j = 0; j < newEgPlan[i].months.length; j += 1) {
      if (newEgPlan[i].months[j].variant === BONUS) {
        bonusMonths[i].months.push(newEgPlan[i].months[j]); // [[{monthid: ..., variant: ...,..}, {....}, ....], [{monthid: ..., variant: ...,..},...]]
      }
    }
  }
  checkKontingentBonus(bonusMonths);
  checkBonusConsecutiveMonths(bonusMonths);
  checkBonusBothPartners(bonusMonths);
};

// <----NONE---->
const checkNone = (newEgPlan) => {
  checkBonusConsecutiveMonths(newEgPlan);
};

const checkEG = (newEgPlan, parentid, monthid, variant) => {
  if (variant === BASIS) {
    checkBasis(newEgPlan);
  } else if (variant === PLUS) {
    checkPlus(newEgPlan);
  } else if (variant === BONUS) {
    checkBonus(newEgPlan);
  } else if (variant === NONE) {
    checkNone(newEgPlan);
  }
};

export default checkEG;
