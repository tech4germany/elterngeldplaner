import { useState, useContext, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import checkEG from '../utils/checkEG';
import constants from '../utils/constants.json';
import errorStrings from '../utils/errorStrings.json';
import warningStrings from '../utils/warningStrings.json';
import calculateEG from '../utils/calculateEG';
import FormContext from '../context/FormContext';

const BASIS = constants.varianten.basis.id;
const PLUS = constants.varianten.plus.id;
const BONUS = constants.varianten.bonus.id;
const NONE = constants.varianten.none.id;

const useEGcalc = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  // TODO handle warning
  const initialPlan = []; // PATTERN: [{parentid: 1, months: [{monthid: 1, variant: xx, amount: {basis:xx, plus:xx, bonus:xx, none:xx}, selected: false},{...}}]

  for (let j = 0; j < 2; j += 1) {
    // TODO: verschieben in constants?
    const initialPlanOneParent = { parentid: j, months: [] };
    for (let i = 0; i < constants.numberMonths; i += 1) {
      const initialAmount = {
        [BASIS]: calculateEG(formData.income_parent[j], BASIS, 0),
        [PLUS]: calculateEG(formData.income_parent[j], PLUS, 0),
        [BONUS]: calculateEG(formData.income_parent[j], BONUS, 0),
        [NONE]: 0
      };
      // j === 0
      //   ? { basis: 1268, plus: 634, bonus: 634, none: 0 }
      //   : { basis: 745, plus: 372, bonus: 372, none: 0 }; // TODO constants verwenden für IDs?

      initialPlanOneParent.months.push({
        monthid: i,
        variant: constants.varianten.none.id, // default variant is "none"
        amount: initialAmount, // current amount,
        additionalIncome: 0,
        incomeChecked: false
      });
    }
    initialPlan.push(initialPlanOneParent);
  }

  const [egPlan, setEgPlan] = useState(initialPlan);

  // TODO: gibt es eine elegantere Lösung als nested try catch blocks?
  const handleErrors = (newEgPlan, parentid, monthid, variant, error) => {
    const updatedEgPlan = cloneDeep(newEgPlan);
    const otherParent = parentid === 0 ? 1 : 0;
    // TODO: wenn 13,5 ausgewählt und man möchte noch einen Basis wählen, hilfestellung "du kannst noch ein EG+ monat wählen"
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
      case warningStrings.partnerMonthsWarning:
        setEgPlan(newEgPlan);
        throw error;

      default:
        throw error;
    }

    return updatedEgPlan;
  };

  const updateEgPlan = (newEgPlan, parentid, monthid, variant) => {
    try {
      checkEG(newEgPlan, parentid, monthid, variant);
      setEgPlan(newEgPlan);
    } catch (e) {
      const updatedEgPlan = handleErrors(newEgPlan, parentid, monthid, variant, e);
      updateEgPlan(updatedEgPlan, parentid, monthid, variant);
    }
  };

  const updateAdditionalIncome = (parentid, monthid, additionalIncome, incomeChecked) => {
    const newEgPlan = [...egPlan];

    if (incomeChecked !== undefined) {
      newEgPlan[parentid].months[monthid].incomeChecked = incomeChecked;
    }

    if (additionalIncome !== undefined) {
      newEgPlan[parentid].months[monthid].additionalIncome = additionalIncome;

      const newAmount = {
        [BASIS]: calculateEG(
          formData.income_parent[parentid],
          BASIS,
          incomeChecked,
          additionalIncome
        ),
        [PLUS]: calculateEG(
          formData.income_parent[parentid],
          PLUS,
          incomeChecked,
          additionalIncome
        ),
        [BONUS]: calculateEG(
          formData.income_parent[parentid],
          BONUS,
          incomeChecked,
          additionalIncome
        ),
        [NONE]: 0
      };
      newEgPlan[parentid].months[monthid].amount = newAmount;
    }

    // amount === undefined ? currentMonth.amount : { ...currentMonth.amount, amount }; // TODO variant

    setEgPlan(newEgPlan);

    // const newEgPlan = cloneDeep(egPlan);
    // if (additionalIncome !== undefined) {
    //   newEgPlan[parentid].months[monthid].additionalIncome = additionalIncome;

    //   newEgPlan[parentid].months[monthid].amount[BASIS] = calculateEG(
    //     formData.income_parent[parentid],
    //     BASIS,
    //     additionalIncome
    //   );

    //   newEgPlan[parentid].months[monthid].amount[PLUS] = calculateEG(
    //     formData.income_parent[parentid],
    //     PLUS,
    //     additionalIncome
    //   );

    //   newEgPlan[parentid].months[monthid].amount[BONUS] = calculateEG(
    //     formData.income_parent[parentid],
    //     BONUS,
    //     additionalIncome
    //   );
    // }
    // if (incomeChecked !== undefined) {
    //   newEgPlan[parentid].months[monthid].incomeChecked = incomeChecked;
    // }

    // setEgPlan(newEgPlan);
  };

  const updateMonth = (parentid, monthid, variant) => {
    // todo change name to updateVariant
    if (parentid === undefined || monthid === undefined || variant === undefined) {
      throw new Error('missing required arguments in (updateMonth())'); // TODO
    }

    const newEgPlan = cloneDeep(egPlan);

    newEgPlan[parentid].months[monthid].variant = variant;
    updateEgPlan(newEgPlan, parentid, monthid, variant);
  };

  // const updateMonthAmounts = (parentid, monthid, incomeChecked, additionalIncome) => {
  //   const newEgPlan = [...egPlan];
  //   const newAmount = {
  //     [BASIS]: calculateEG(
  //       formData.income_parent[parentid],
  //       BASIS,
  //       incomeChecked,
  //       additionalIncome
  //     ),
  //     [PLUS]: calculateEG(formData.income_parent[parentid], PLUS, incomeChecked, additionalIncome),
  //     [BONUS]: calculateEG(
  //       formData.income_parent[parentid],
  //       BONUS,
  //       incomeChecked,
  //       additionalIncome
  //     ),
  //     [NONE]: 0
  //   };
  //   newEgPlan[parentid].months[monthid].amount = newAmount;
  //   setEgPlan(newEgPlan);
  // };

  const resetPlan = () => {
    setEgPlan(initialPlan);
  };

  const getSumParent = (parentid) => {
    let sum = 0;
    for (let i = 0; i < egPlan[parentid].months.length; i += 1) {
      sum += egPlan[parentid].months[i].amount[egPlan[parentid].months[i].variant];
    }
    return sum;
  };

  const getTotalMonthsParent = (parentid) => {
    let sum = 0;
    for (let i = 0; i < egPlan[parentid].months.length; i += 1) {
      if (egPlan[parentid].months[i].variant !== NONE) {
        sum += 1;
      }
    }
    return sum;
  };

  return [
    egPlan,
    { updateMonth, updateAdditionalIncome, resetPlan, getSumParent, getTotalMonthsParent }
  ];
};

export default useEGcalc;
