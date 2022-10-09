import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import SelectionOverlay from './SelectionOverlay';
import constants from '../utils/constants.json';
import colors from '../utils/theme';

const Month = ({ monthid, variant, amount, updateMonthSelection, parentId, selected }) => {
  const [monthButton, setMonthButton] = useState();

  useEffect(() => {
    setMonthButton(
      <Button
        colorScheme={constants.varianten[variant].colorScheme}
        border={selected ? '4px' : '0px'}
        // transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        borderColor="black"
        padding="5px"
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
