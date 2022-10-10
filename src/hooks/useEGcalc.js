import { useState } from 'react';
import { cloneDeep } from 'lodash';
import checkEG from '../utils/checkEG';
import constants from '../utils/constants.json';

const useEGcalc = (handleWarning) => {
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

  const updateMonth = (parentid, monthid, variant) => {
    if (parentid === undefined || monthid === undefined) {
      throw new Error('parentid and monthid are required arguments');
    }

    const newEgPlan = cloneDeep(egPlan);

    const currentMonth = newEgPlan[parentid].months[monthid];

    const newVariant = variant === undefined ? currentMonth.variant : variant;

    newEgPlan[parentid].months[monthid] = {
      monthid,
      variant: newVariant,
      amount: currentMonth.amount
    };

    // TODO: wenn fehler geworfen, dann handeln, nicht davor
    if (newVariant === constants.varianten.bonus.id) {
      // Bonus needs to be taken by both and min 2 months
      for (let i = 0; i < 2; i += 1) {
        newEgPlan[i].months[monthid] = {
          monthid,
          variant: newVariant,
          amount: currentMonth.amount
        };
      }

      if (monthid === 0) {
        for (let i = 0; i < 2; i += 1) {
          newEgPlan[i].months[monthid + 1] = {
            monthid: monthid + 1,
            variant: newVariant,
            amount: currentMonth.amount
          };
        }
      } else if (
        newEgPlan[parentid].months[monthid - 1].variant !== newVariant &&
        newEgPlan[parentid].months[monthid + 1].variant !== newVariant &&
        monthid < constants.numberMonths - 1
      ) {
        for (let i = 0; i < 2; i += 1) {
          newEgPlan[i].months[monthid + 1] = {
            monthid: monthid + 1,
            variant: newVariant,
            amount: currentMonth.amount
          };
        }
      }
    }

    if (
      newVariant !== constants.varianten.bonus.id &&
      egPlan[parentid].months[monthid].variant === constants.varianten.bonus.id
    ) {
      for (let i = 0; i < 2; i += 1) {
        if (parentid !== i) {
          newEgPlan[i].months[monthid] = {
            monthid,
            variant: constants.varianten.none.id,
            amount: currentMonth.amount
          };
        }
      }

      // switch from bonus to none
      // check if before and after are at least 2 months

      let twoMonthsBefore = false;
      let twoMonthsAfter = false;
      if (monthid === 1) {
        // TODO
        twoMonthsBefore = false;
      }
      if (monthid >= 2) {
        if (
          egPlan[parentid].months[monthid - 1].variant === constants.varianten.bonus.id &&
          egPlan[parentid].months[monthid - 2].variant === constants.varianten.bonus.id
        ) {
          twoMonthsBefore = true;
        }
      }

      if (monthid < constants.numberMonths - 3) {
        if (
          egPlan[parentid].months[monthid + 1].variant === constants.varianten.bonus.id &&
          egPlan[parentid].months[monthid + 2].variant === constants.varianten.bonus.id
        ) {
          twoMonthsAfter = true;
        }
      }
      if (!twoMonthsAfter && !twoMonthsBefore) {
        if (monthid >= 1) {
          if (egPlan[parentid].months[monthid - 1].variant === constants.varianten.bonus.id) {
            for (let i = 0; i < 2; i += 1) {
              newEgPlan[i].months[monthid - 1].variant = constants.varianten.none.id;
            }
          }
        }
        if (monthid < constants.numberMonths - 3) {
          if (egPlan[parentid].months[monthid + 1].variant === constants.varianten.bonus.id) {
            for (let i = 0; i < 2; i += 1) {
              newEgPlan[i].months[monthid + 1].variant = constants.varianten.none.id;
            }
          }
        }
      }
    }
    checkEG(newEgPlan, parentid, monthid, variant); // TODO : Neuer Plan davor, diesen dann checken
    setEgPlan(newEgPlan);
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
