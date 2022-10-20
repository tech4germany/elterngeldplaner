import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { BiCoinStack } from 'react-icons/bi';
import constants from '../../utils/constants.json';

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
        backgroundColor={constants.varianten[variant].colorActivated}
        color={constants.varianten[variant].textColor}
        _active={{
          bg: constants.varianten[variant].colorActivated
        }}
        _focus={{
          bg: constants.varianten[variant].colorActivated
        }}
        _hover={{
          bg: constants.varianten[variant].colorActivated
        }}
        // border={selected ? '4px' : '0px'}
        // borderColor="black"
        boxShadow={selected ? '0 0 0pt 2.5pt black' : 'none'}
        // outline={selected ? 'solid 3.7px black !important' : '0px !important'}
        padding="5px"
        width="15vw"
        height="9vw"
        marginTop="3px"
        marginBottom="3px"
        onClick={() => {
          updateMonthSelection(parentId, monthid);
        }}>
        {constants.varianten[variant].abbrv}
      </Button>
    );
  }, [variant, amount, selected]);

  return (
    <Row className="justify-content-center">
      {parentId === 0 ? (
        <>
          <Col
            className="d-flex align-items-center justify-content-end p-0"
            xs={6}
            style={{
              color: variant !== constants.varianten.none.id ? '#000000' : '#707070'
            }}>
            {additionalIncomeSelected ? (
              <BiCoinStack color="LightSlateGray" style={{ marginRight: '10px' }} />
            ) : (
              []
            )}
            {amount} €
          </Col>
          <Col className="d-flex align-self-center justify-content-center" xs={6}>
            {monthButton}
          </Col>
        </>
      ) : (
        <>
          <Col className="d-flex align-self-center justify-content-center" xs={6}>
            {monthButton}
          </Col>
          <Col
            className="d-flex align-items-center justify-content-start p-0"
            xs={6}
            style={{
              color: variant !== constants.varianten.none.id ? '#000000' : '#707070'
            }}>
            {amount} €
            {additionalIncomeSelected ? (
              <BiCoinStack color="LightSlateGray" style={{ marginLeft: '10px' }} />
            ) : (
              []
            )}
          </Col>
        </>
      )}
    </Row>
  );
};

export default Month;
