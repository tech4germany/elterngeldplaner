import {
  Toast,
  ToastContainer,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Button, Alert, AlertIcon, useToast, GridItem, Grid } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import constants from '../utils/constants.json';
import IncomeInput from './IncomeInput';

const Overlay = ({ monthSelected, setMonthSelected, egPlan, isVisible, updateMonth }) => {
  const [buttons, setButtons] = useState([]);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const getDateText = (monthid) => {
    const initialDate = DateTime.now();
    const dateTextStart = initialDate
      .plus({ months: monthid })
      .setLocale('ge')
      .toFormat('d. LLL yy');
    const dateTextEnd = initialDate
      .plus({ months: monthid + 1 })
      .setLocale('ge')
      .toFormat('d. LLL yy');
    return `${dateTextStart} - ${dateTextEnd}`;
  };

  useEffect(() => {
    const newButtons = [];

    const isSelected = monthSelected.monthid !== undefined && monthSelected.parentid !== undefined;
    setShow(isSelected);

    if (isSelected) {
      Object.values(constants.varianten).forEach((value) => {
        // const buttonColor = value.colorActivated;
        // try {
        //   updateMonth(monthSelected.parentid, monthSelected.monthid, value.id);
        // } catch {
        //   buttonColor = value.colorDeactivated;
        // }
        newButtons.push(
          <GridItem colSpan={1} key={value.id}>
            <Button
              colorScheme={value.colorScheme}
              border={
                egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
                  ? '4px'
                  : '0px'
              }
              borderColor="black"
              fontSize="11pt"
              fontWeight="semibold"
              width="92%"
              height="100%"
              value={value.id}
              onClick={(e) => {
                try {
                  updateMonth(
                    monthSelected.parentid,
                    monthSelected.monthid,
                    e.currentTarget.value // variant
                  );
                } catch (error) {
                  toast({
                    title: error.message,
                    variant: 'solid',
                    isClosable: true,
                    position: 'top'
                  });
                }
              }}>
              <div>
                {value.abbrvOverlay}
                <br />
                {egPlan[monthSelected.parentid].months[monthSelected.monthid].amount[value.id]} €
              </div>
            </Button>
          </GridItem>
        );
      });
    }

    setButtons(newButtons);
  }, [monthSelected, egPlan]);

  return (
    <ToastContainer position="bottom-center" containerPosition="fixed">
      <Toast
        show={show}
        className="shadow-lg"
        onClose={() => {
          setShow(false);
          setMonthSelected(false);
        }}
        style={{ minHeight: '160px', backgroundColor: 'white' }}>
        {show ? (
          <>
            <Toast.Header closeButton>
              <strong className="me-auto">{constants.parents[monthSelected.parentid].name}</strong>
            </Toast.Header>
            <Toast.Body>
              <Row className="pb-2">
                <Col className="d-flex justify-content-left">
                  <span style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    {monthSelected.monthid + 1}. Lebensmonat
                  </span>
                  <span>{getDateText(monthSelected.monthid)}</span>
                </Col>
              </Row>
              <Row>
                <Grid templateColumns="repeat(4, 25%)">{buttons}</Grid>
              </Row>
              <Row>
                <IncomeInput />
              </Row>
            </Toast.Body>
          </>
        ) : (
          <div />
        )}
      </Toast>
    </ToastContainer>
  );
};

export default Overlay;
