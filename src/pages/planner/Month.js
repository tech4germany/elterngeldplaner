import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { BiCoinStack } from 'react-icons/bi';
import Overlay from './Overlay';
import constants from '../../utils/constants.json';
import colors from '../../utils/theme';

const Month = ({
  monthid,
  variant,
  amount,
  additionalIncomeSelected,
  updateMonthSelection,
  parentId,
  selected
}) => {
  const [monthButton, setMonthButton] = useState();
  useEffect(() => {
    setMonthButton(
      <Button
        colorScheme={constants.varianten[variant].colorScheme}
        border={selected ? '4px' : '0px'}
        borderColor="black"
        padding="5px"
        width="15vw"
        height="9vw"
        marginBottom="4px"
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
          <Col className="align-self-center" xs={1}>
            {/* // TODO: Padding wie unten */}
            {additionalIncomeSelected ? <BiCoinStack color="LightSlateGray" /> : []}
          </Col>
          <Col className="d-flex align-items-center justify-content-end p-0" xs={5}>
            {amount} €
          </Col>
          <Col className="d-flex align-self-center justify-content-center" xs={5}>
            {monthButton}
          </Col>
        </>
      ) : (
        <>
          <Col className="d-flex align-self-center justify-content-center" xs={5}>
            {monthButton}
          </Col>
          <Col className="d-flex align-items-center justify-content-start p-0" xs={5}>
            {amount} €
          </Col>
          <Col className="align-self-center p-0" xs={1}>
            {additionalIncomeSelected ? <BiCoinStack color="LightSlateGray" /> : []}
          </Col>
        </>
      )}
    </Row>
  );
};

export default Month;
