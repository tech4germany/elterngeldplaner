import { Button, Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SelectionOverlay from './SelectionOverlay';
import constants from '../utils/constants.json';

const Month = ({ monthid, variant, amount, updateMonthSelection, parentId, selected }) => {
  const [monthButton, setMonthButton] = useState();

  useEffect(() => {
    setMonthButton(
      <Button
        variant={
          selected
            ? constants.varianten[variant].buttonVariantSelected
            : constants.varianten[variant].buttonVariantDefault
        }
        onClick={() => {
          updateMonthSelection(monthid, parentId);
        }}>
        {variant}
      </Button>
    );
  }, [variant, amount, selected]);

  return (
    <Container key={monthid}>
      <Row>
        <Col>{monthButton}</Col>
        <Col>{amount}</Col>
      </Row>
    </Container>
  );
};

export default Month;
