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
        size="sm"
        onClick={() => {
          updateMonthSelection(parentId, monthid);
        }}>
        {constants.varianten[variant].abbrv}
      </Button>
    );
  }, [variant, amount, selected]);

  return (
    <Row>
      {parentId === 0 ? (
        <>
          <Col className="d-flex align-items-center justify-content-end" xs={8}>
            {amount} €
          </Col>
          <Col className="align-self-center" xs={4}>
            {monthButton}
          </Col>
        </>
      ) : (
        <>
          <Col className="align-self-center" xs={4}>
            {monthButton}
          </Col>
          <Col className="d-flex align-items-center justify-content-start" xs={8}>
            {amount} €
          </Col>
        </>
      )}
    </Row>
  );
};

export default Month;
