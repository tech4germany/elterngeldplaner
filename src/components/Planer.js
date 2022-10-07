import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Month from './Month';
import Parent from './Parent';
import SelectionOverlay from './SelectionOverlay';
import constants from '../utils/constants.json';

const Planer = () => {
  const initialMonths = []; // PATTERN: [{parentid: 1, months: [{monthid: 1, variant: xx, value: xx, selected: false},{monthid: 2, variant: xx, value: xx, selected: true},{...}]}, {parentid: 2, months: [...]}]

  for (let j = 0; j < 2; j += 1) {
    const initialMonthsOneParent = { parentid: j, months: [] };
    for (let i = 0; i < constants.months; i += 1) {
      initialMonthsOneParent.months.push({
        monthid: i,
        variant: constants.varianten.none.id, // default variant is "none"
        amount: constants.varianten.none.amount, // TODO: kann evtl weg da oben bereits weitergegeben
        selected: false
      });
    }
    initialMonths.push(initialMonthsOneParent);
  }

  const [months, setMonths] = useState(initialMonths);

  const [selectionOverlayProps, setSelectionOverlayProps] = useState({
    // TODO unnötig
    monthid: 0,
    parentid: 0,
    selectedVariant: 'none',
    isVisible: false
  });

  const updateMonth = (parentid, monthid, variant, amount, selected) => {
    if (parentid === undefined || monthid === undefined) {
      throw new Error('parentid and monthid are required arguments');
    }

    const currentMonth = months[parentid].months[monthid];

    const newVariant = variant === undefined ? currentMonth.variant : variant;
    const newAmount = amount === undefined ? currentMonth.amount : amount;
    const newSelected = selected === undefined ? currentMonth.selected : selected; // selected || currentMonth.selected;
    const newMonths = [...months];

    newMonths[parentid].months[monthid] = {
      monthid,
      variant: newVariant,
      amount: newAmount,
      selected: newSelected
    };

    setMonths(newMonths); // TODO
  };

  const updateMonthSelection = (monthid, parentid) => {
    // reset selection for all months
    for (let i = 0; i < months.length; i += 1) {
      for (let j = 0; j < months[i].months.length; j += 1) {
        updateMonth(i, j, undefined, undefined, false);
      }
    }
    // set selection for selected month
    updateMonth(parentid, monthid, undefined, undefined, true);

    setSelectionOverlayProps({
      monthid,
      parentid,
      selectedVariant: months[parentid].months.variant,
      isVisible: true
    });
  };

  return (
    <Container className="justify-content-md-center">
      <Row>
        <Col>
          <Parent
            id={0}
            updateMonthSelection={updateMonthSelection}
            // monthsParent={months[0].months}
            months={months}
          />
        </Col>
        <Col>
          <Parent
            id={1}
            updateMonthSelection={updateMonthSelection}
            // monthsParent={months[1].months}
            months={months}
          />
        </Col>
      </Row>
      <SelectionOverlay {...selectionOverlayProps} updateMonth={updateMonth} />
    </Container>
  );
};

export default Planer;
