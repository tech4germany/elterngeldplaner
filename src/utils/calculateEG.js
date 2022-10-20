import constants from './constants.json';

const BASIS = constants.varianten.basis.id;
const PLUS = constants.varianten.plus.id;
const BONUS = constants.varianten.bonus.id;
const NONE = constants.varianten.none.id;

const calculateEG = (income, variant, incomeChecked, additionalIncome) => {
  let elterngeld;
  let currentAdditionalIncome = 0;
  const percentage = 0.65;

  // if (income >= 1000 && income <= 1200) {
  //   percentage = 0.67;
  // }

  if (additionalIncome !== undefined && incomeChecked === true) {
    currentAdditionalIncome = additionalIncome;
  }
  switch (variant) {
    case BASIS:
      elterngeld = (income - currentAdditionalIncome) * percentage;
      if (elterngeld > 1800) {
        elterngeld = 1800;
      } else if (elterngeld < 300) {
        elterngeld = 300;
      }
      break;
    case BONUS:
    case PLUS:
      elterngeld = (income - currentAdditionalIncome) * percentage;
      if (elterngeld > income * percentage * 0.5) {
        elterngeld = income * percentage * 0.5;
      }
      if (elterngeld > 900) {
        elterngeld = 900;
      } else if (elterngeld < 150) {
        elterngeld = 150;
      }

      // if ()
      // if (elterngeld + currentAdditionalIncome > income) {
      //   elterngeld = Math.max(income - currentAdditionalIncome, 150);
      // }

      break;
    case NONE:
      elterngeld = 0;
      break;
    default:
      elterngeld = 0;
      break;
  }
  return Math.round(elterngeld);
};

export default calculateEG;
