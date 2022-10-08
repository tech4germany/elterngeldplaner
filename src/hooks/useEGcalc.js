import { useState } from 'react';
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

    const currentMonth = egPlan[parentid].months[monthid];

    const newVariant = variant === undefined ? currentMonth.variant : variant;
    const newEgPlan = [...egPlan];

    newEgPlan[parentid].months[monthid] = {
      monthid,
      variant: newVariant,
      amount: currentMonth.amount
    };

    setEgPlan(newEgPlan);
  };

  const updateMonthAmount = (parentid, monthid, amount) => {
    const currentMonth = egPlan[parentid].months[monthid];
    const newEgPlan = [...egPlan];
    const newAmount =
      amount === undefined ? currentMonth.amount : { ...currentMonth.amount, amount }; // TODO variant
    newEgPlan[parentid].months[monthid] = {
      monthid,
      variant: currentMonth.variant,
      amount: newAmount
    };
  };

  //   const checkSelection = (parentid, monthid, variant) => {
  //     if (variant === constants.basis.id && monthid > 14) {
  //       return false;
  //     }
  //     return true;
  //   };

  return [egPlan, { updateMonth, updateMonthAmount }];
};

export default useEGcalc;
