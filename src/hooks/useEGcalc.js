import { useState } from 'react';
import { cloneDeep } from 'lodash';
import checkEG from '../utils/checkEG';
import constants from '../utils/constants.json';
import errorStrings from '../utils/errorStrings.json';

const useEGcalc = (handleWarning) => {
  const BASIS = constants.varianten.basis.id;
  const PLUS = constants.varianten.plus.id;
  const BONUS = constants.varianten.bonus.id;
  const NONE = constants.varianten.none.id;

  // TODO handle warning
  const initialPlan = []; // PATTERN: [{parentid: 1, months: [{monthid: 1, variant: xx, amount: {basis:xx, plus:xx, bonus:xx, none:xx}, selected: false},{...}}]

  for (let j = 0; j < 2; j += 1) {
    // TODO: verschieben in constants?
    const initialPlanOneParent = { parentid: j, months: [] };
    for (let i = 0; i < constants.numberMonths; i += 1) {
      const initialAmount =
        j === 0
          ? { basis: 1268, plus: 634, bonus: 634, none: 0 }
          : { basis: 745, plus: 372, bonus: 372, none: 0 }; // TODO constants verwenden für IDs?

      initialPlanOneParent.months.push({
        monthid: i,
        variant: constants.varianten.none.id, // default variant is "none"
        amount: initialAmount // current amount
      });
    }
    initialPlan.push(initialPlanOneParent);
  }

  const [egPlan, setEgPlan] = useState(initialPlan);

  // TODO: gibt es eine elegantere Lösung als nested try catch blocks?
  const handleBonusError = (newEgPlan, parentid, monthid, variant, error) => {
    const updatedEgPlan = cloneDeep(newEgPlan);
    const otherParent = parentid === 0 ? 1 : 0;
    switch (error.message) {
      // if error is because not both partners have PB, select PB for both partners
      case errorStrings.bonusBothPartners:
        if (variant === BONUS) {
          updatedEgPlan[otherParent].months[monthid].variant = BONUS;
        } else {
          updatedEgPlan[otherParent].months[monthid].variant = NONE;
        }
        break;
      case errorStrings.bonusKontingentMin:
        if (variant === BONUS) {
          if (monthid < constants.numberMonths - 1) {
            for (let i = 0; i < egPlan.length; i += 1) {
              updatedEgPlan[i].months[monthid + 1].variant = BONUS;
            }
          }
        } else {
          for (let i = monthid - 1; i <= monthid + 1; i += 1) {
            if (updatedEgPlan[parentid].months[i]) {
              if (updatedEgPlan[parentid].months[i].variant === BONUS) {
                for (let j = 0; j < egPlan.length; j += 1) {
                  updatedEgPlan[j].months[i].variant = NONE;
                }
              }
            }
          }
        }

        break;

      default:
        throw error;
    }

    return updatedEgPlan;
  };

  const updateEgPlan = (newEgPlan, parentid, monthid, variant) => {
    try {
      checkEG(newEgPlan, variant); // TODO : Neuer Plan davor, diesen dann checken
      setEgPlan(newEgPlan);
    } catch (e) {
      // if (variant === BONUS) {
      // TODO: if variant was anderes, aber daneben bonus
      const updatedEgPlan = handleBonusError(newEgPlan, parentid, monthid, variant, e);
      updateEgPlan(updatedEgPlan, parentid, monthid, variant);
      // }
    }
  };

  const updateMonth = (parentid, monthid, variant) => {
    if (parentid === undefined || monthid === undefined || variant === undefined) {
      throw new Error('missing required arguments in (updateMonth())'); // TODO
    }

    const newEgPlan = cloneDeep(egPlan);

    newEgPlan[parentid].months[monthid].variant = variant;

    // if (variant === BONUS) {
    //   handleBonusError(newEgPlan, parentid, monthid, error);
    // }

    // TODO: wenn fehler geworfen, dann handeln, nicht davor
    // if (variant === constants.varianten.bonus.id) {
    //   // Bonus needs to be taken by both and min 2 months

    //   let previousBonusKontingent = 0;

    //   for (let i = 0; i < 2; i += 1) {
    //     for (let j = 0; j < egPlan[i].months.length; j += 1) {
    //       if (egPlan[i].months[j].variant === variant) {
    //         previousBonusKontingent += 1;
    //       }
    //     }
    //   }

    //   for (let i = 0; i < 2; i += 1) {
    //     newEgPlan[i].months[monthid].variant = variant;
    //   }

    //   if (monthid === 0) {
    //     for (let i = 0; i < 2; i += 1) {
    //       newEgPlan[i].months[monthid + 1].variant = variant;
    //     }
    //   } else if (
    //     // newEgPlan[parentid].months[monthid - 1].variant !== newVariant &&
    //     // newEgPlan[parentid].months[monthid + 1].variant !== newVariant &&
    //     monthid < constants.numberMonths - 1 &&
    //     previousBonusKontingent === 0
    //   ) {
    //     for (let i = 0; i < 2; i += 1) {
    //       newEgPlan[i].months[monthid + 1].variant = variant; // both
    //     }
    //   }
    // }

    // if (
    //   variant !== constants.varianten.bonus.id &&
    //   egPlan[parentid].months[monthid].variant === constants.varianten.bonus.id
    // ) {
    //   for (let i = 0; i < 2; i += 1) {
    //     if (parentid !== i) {
    //       newEgPlan[i].months[monthid].variant = constants.varianten.none.id;
    //     }
    //   }

    //   // switch from bonus to none
    //   // check if before and after are at least 2 months

    //   let twoMonthsBefore = false;
    //   let twoMonthsAfter = false;
    //   if (monthid === 1) {
    //     // TODO
    //     twoMonthsBefore = false;
    //   }
    //   if (monthid >= 2) {
    //     if (
    //       egPlan[parentid].months[monthid - 1].variant === constants.varianten.bonus.id &&
    //       egPlan[parentid].months[monthid - 2].variant === constants.varianten.bonus.id
    //     ) {
    //       twoMonthsBefore = true;
    //     }
    //   }

    //   if (monthid < constants.numberMonths - 3) {
    //     if (
    //       egPlan[parentid].months[monthid + 1].variant === constants.varianten.bonus.id &&
    //       egPlan[parentid].months[monthid + 2].variant === constants.varianten.bonus.id
    //     ) {
    //       twoMonthsAfter = true;
    //     }
    //   }
    //   if (!twoMonthsAfter && !twoMonthsBefore) {
    //     if (monthid >= 1) {
    //       if (egPlan[parentid].months[monthid - 1].variant === constants.varianten.bonus.id) {
    //         for (let i = 0; i < 2; i += 1) {
    //           newEgPlan[i].months[monthid - 1].variant = constants.varianten.none.id;
    //         }
    //       }
    //     }
    //     if (monthid < constants.numberMonths - 3) {
    //       if (egPlan[parentid].months[monthid + 1].variant === constants.varianten.bonus.id) {
    //         for (let i = 0; i < 2; i += 1) {
    //           newEgPlan[i].months[monthid + 1].variant = constants.varianten.none.id;
    //         }
    //       }
    //     }
    //   }
    // }
    updateEgPlan(newEgPlan, parentid, monthid, variant);
  };

  //   const updateMonthAmount = (parentid, monthid, amount) => {
  //     const currentMonth = egPlan[parentid].months[monthid];
  //     const newEgPlan = [...egPlan];
  //     const newAmount =
  //       amount === undefined ? currentMonth.amount : { ...currentMonth.amount, amount }; // TODO variant
  //     newEgPlan[parentid].months[monthid] = {
  //       monthid,
  //       variant: currentMonth.variant,
  //       amount: newAmount
  //     };
  //     setEgPlan(newEgPlan);
  //   };

  return [egPlan, { updateMonth }];
};

export default useEGcalc;
