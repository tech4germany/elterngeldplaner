import {
  Toast,
  ToastContainer,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Button } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import constants from '../utils/constants.json';

const SelectionOverlay = ({ monthSelected, egPlan, isVisible, updateMonth }) => {
  const [buttons, setButtons] = useState([]);
  const [show, setShow] = useState(false);

  const getDateText = (monthid) => {
    const initialDate = DateTime.now();
    const dateTextStart = initialDate
      .plus({ months: monthid })
      .setLocale('ge')
      .toFormat('d LLL yy');
    const dateTextEnd = initialDate
      .plus({ months: monthid + 1 })
      .setLocale('ge')
      .toFormat('d LLL yy');
    return `${dateTextStart} - ${dateTextEnd}`;
  };

  useEffect(() => {
    const newButtons = [];

    const isSelected = monthSelected.monthid !== undefined && monthSelected.parentid !== undefined;
    setShow(isSelected);

    if (isSelected) {
      Object.values(constants.varianten).forEach((value) => {
        newButtons.push(
          <Button
            key={value.id}
            // variant={
            //   egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
            //     ? value.buttonVariantSelected
            //     : value.buttonVariantDefault
            // }
            colorScheme={value.colorScheme}
            border={
              egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
                ? '4px'
                : '0px'
            }
            // margin="0.2px"
            // transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            borderColor="black"
            fontSize="11pt"
            fontWeight="semibold"
            width="20vw"
            value={value.id}
            onClick={(e) =>
              updateMonth(
                monthSelected.parentid,
                monthSelected.monthid,
                e.currentTarget.value // variant
              )
            }>
            <div>
              {value.abbrvOverlay}
              <br />
              {egPlan[monthSelected.parentid].months[monthSelected.monthid].amount[value.id]} €
            </div>
          </Button>
        );
      });
    }

    setButtons(newButtons);
  }, [monthSelected, egPlan]);

  return (
    <ToastContainer position="bottom-center" containerPosition="fixed">
      <Toast show={show} onClose={() => setShow(false)}>
        {show ? (
          <>
            <Toast.Header closeButton>
              <Container>
                <Row>
                  <strong className="me-auto">
                    {constants.parents[monthSelected.parentid].name}
                  </strong>
                </Row>
              </Container>
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
              <ButtonToolbar className="d-flex-row justify-content-between">
                {buttons}
              </ButtonToolbar>
            </Toast.Body>
          </>
        ) : (
          <div />
        )}
      </Toast>
    </ToastContainer>
  );
};

export default SelectionOverlay;
