import React from 'react';
import constants from './constants.json';

const maxKontingent = 14; // partners can take 14 months basis maximum
const minPartnerBasis = 2; // 2nd partner has to take min. 2 months to get 14 basis in total
const maxMonthBasis = 14;
const maxKontingentBonus = 8;

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
        'Um die Partnermonate beanspruchen zu können, müssen beide Elternteile mindestens 2 Monate Basiselterngeld oder 4 Monate ElterngeldPlus beziehen'
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

  checkPartnermonate(newEgPlan, kontingentTaken);
};

// check if month is possible for Basis
const checkBasisAssignment = (newEgPlan) => {
  for (let i = 0; i < newEgPlan.length; i += 1) {
    for (let j = maxMonthBasis; j < constants.numberMonths; j += 1) {
      if (newEgPlan[i].months[j].variant === BASIS) {
        throw new Error('Du kannst Basiselterngeld nur bis zum 14. Lebensmonat beziehen,');
      }
    }
  }
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

const checkKontingentBonus = (newEgPlan) => {
  let kontingentTaken = 0;
  for (let i = 0; i < newEgPlan.length; i += 1) {
    for (let j = 0; j < newEgPlan[i].months.length; j += 1) {
      if (newEgPlan[i].months[j].variant === BONUS) {
        kontingentTaken += 1;
      }
    }
  }
  if (kontingentTaken > maxKontingentBonus) {
    throw new Error('Dein Kontingent für Partnerschaftsbonus ist aufgebraucht.');
  }
};

const checkEG = (newEgPlan, parentid, monthid, variant) => {
  if (variant === BASIS) {
    checkKontingentBasis(newEgPlan);
    checkBasisAssignment(newEgPlan);
  } else if (variant === PLUS) {
    checkKontingentPlus(newEgPlan);
  } else if (variant === BONUS) {
    checkKontingentBonus(newEgPlan);
  }
};

export default checkEG;
