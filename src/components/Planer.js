import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Month from './Month';
import Parent from './Parent';
import SelectionOverlay from './SelectionOverlay';
import constants from '../utils/constants.json';

const Planer = () => {
  const initialMonths = []; // PATTERN: [{parentid: 1, months: [{monthid: 1, variant: xx, value: xx},{monthid: 2, variant: xx, value: xx},{...}]}, {parentid: 2, months: [...]}]

  for (let j = 0; j < 2; j += 1) {
    const initialMonthsOneParent = { parentid: j, months: [] };
    for (let i = 0; i < constants.months; i += 1) {
      initialMonthsOneParent.months.push({
        monthid: i,
        variant: constants.varianten[3].id, // default variant is "none"
        value: constants.varianten[3].amount // TODO: kann evtl weg da oben bereits weitergegeben
      });
    }
    initialMonths.push(initialMonthsOneParent);
  }

  const [months, setMonths] = useState(initialMonths);

  const updateMonth = (parentid, monthid, variant, value) => {
    const newMonths = [...months];
    const updatedValue = { monthid, variant, value };
    newMonths[parentid].months[monthid] = updatedValue;

    setMonths(newMonths);
  };

  const [selectionOverlay, setSelectionOverlay] = useState(
    <SelectionOverlay
      monthid={0}
      parentid={0}
      selectedVariant="none"
      isVisible={false}
      updateMonth={updateMonth}
    />
  );

  const updateOverlay = (monthid, parentid, selectedVariant, isVisible) => {
    setSelectionOverlay(
      <SelectionOverlay
        monthid={monthid}
        parentid={parentid}
        selectedVariant={selectedVariant}
        isVisible={isVisible}
        updateMonth={updateMonth}
      />
    );
  };

  return (
    <Container className="justify-content-md-center">
      <Row>
        <Col>
          <Parent id={0} updateOverlay={updateOverlay} monthsParent={months[0].months} />
        </Col>
        <Col>
          <Parent id={1} updateOverlay={updateOverlay} monthsParent={months[1].months} />
        </Col>
      </Row>
      {selectionOverlay}
    </Container>
  );
};

export default Planer;
