import constants from './constants.json';

const BASIS = constants.varianten.basis.id;
const PLUS = constants.varianten.plus.id;
const BONUS = constants.varianten.bonus.id;
const NONE = constants.varianten.none.id;

const calculateEG = (income, variant, additionalIncome) => {
  let elterngeld;
  switch (variant) {
    case BASIS:
      elterngeld = Math.round(income * 0.65);
      if (elterngeld > 1800) {
        elterngeld = 1800;
      } else if (elterngeld < 300) {
        elterngeld = 300;
      }
      break;
    case PLUS:
      elterngeld = Math.round(income * 0.33);
      if (elterngeld > 900) {
        elterngeld = 900;
      } else if (elterngeld < 150) {
        elterngeld = 150;
      }
      break;
    case BONUS:
      elterngeld = Math.round(income * 0.33);
      if (elterngeld > 900) {
        elterngeld = 900;
      } else if (elterngeld < 150) {
        elterngeld = 150;
      }
      break;
    case NONE:
      elterngeld = 0;
      break;
    default:
      elterngeld = 0;
  }
  return elterngeld;
};

export default calculateEG;
