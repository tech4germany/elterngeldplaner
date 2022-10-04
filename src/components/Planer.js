import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Month from './Month';
import Parent from './Parent';
import SelectionOverlay from './SelectionOverlay';
import constants from '../utils/constants.json';

const Planer = () => {
  const initialMonths = [];
  for (let j = 1; j <= 2; j += 1) {
    const initialMonthsOneParent = [];
    for (let i = 1; i <= constants.months; i += 1) {
      initialMonthsOneParent.push({
        parentid: j,
        monthid: i,
        variant: 'none',
        value: constants.none
      });
    }
    initialMonths.push(initialMonthsOneParent);
  }

  const [months, setMonths] = useState(initialMonths);

  const [selectionOverlay, setSelectionOverlay] = useState(
    <SelectionOverlay
      monthid={0}
      parentName={constants.parent1}
      selectedVariant=""
      isVisible={false}
    />
  );

  return (
    <Container className="justify-content-md-center">
      <Row>
        <Col>
          <Parent
            parentId={1}
            name={constants.parent1}
            setOverlay={setSelectionOverlay}
            monthsParent={months[0]}
          />
        </Col>
        <Col>
          <Parent
            parentId={2}
            name={constants.parent2}
            setOverlay={setSelectionOverlay}
            monthsParent={months[1]}
          />
        </Col>
      </Row>
      {selectionOverlay}
    </Container>
  );
};

export default Planer;
