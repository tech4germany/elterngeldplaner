import { Toast, ToastContainer, Row, Col } from 'react-bootstrap';
import { Button, Alert, AlertIcon, useToast, GridItem, Grid } from '@chakra-ui/react';
import { Fragment, useEffect, useState, useContext } from 'react';
import { DateTime } from 'luxon';
import constants from '../../utils/constants.json';
import AdditionalIncomeInput from './AdditionalIncomeInput';
import FormContext from '../../context/FormContext';
import { TextBold } from '../../components/styled/StyledText';

const Overlay = ({
  monthSelected,
  setMonthSelected,
  egPlan,
  updateMonth,
  updateAdditionalIncome
}) => {
  const [buttons, setButtons] = useState([]);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  const getDateText = (monthid) => {
    // const initialDate = DateTime.now();
    const initialDate = DateTime.fromISO(formData.birthDate);
    const dateTextStart = initialDate
      .plus({ months: monthid })
      .setLocale('ge')
      .toFormat('d. LLL yy');
    const dateTextEnd = initialDate
      .plus({ months: monthid + 1 })
      .minus({ days: 1 })
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
        newButtons.push(
          <GridItem colSpan={1} key={value.id} className="d-flex justify-content-center">
            <Button
              backgroundColor={value.colorActivated}
              color={value.textColor}
              boxShadow={
                egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
                  ? '0 0 0pt 2.5pt black'
                  : 'none'
              }
              style={{
                margin: '0px',
                padding: '3px',
                // boxShadow:
                //   egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
                //     ? '0 0 0pt 2.5pt black'
                //     : 'none',
                backgroundColor: `${value.colorActivated} !important`
                // outline:
                //   egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
                //     ? 'solid 4px black !important'
                //     : '0px !important'
              }}
              // outline={
              //   egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
              //     ? 'solid 3.7px black !important'
              //     : '0px !important'
              // }
              // border={
              //   egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
              //     ? '4px'
              //     : '0px'
              // }
              // borderColor="black"
              _active={{
                bg: value.colorActivated
              }}
              _focus={{
                bg: value.colorActivated
              }}
              _hover={{
                bg: value.colorActivated
              }}
              fontSize="11pt"
              fontWeight="semibold"
              width="90%"
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
              <TextBold className="me-auto">
                {formData.names_parent[monthSelected.parentid]}
              </TextBold>
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
              <Row style={{ marginTop: '5px' }}>
                <Grid templateColumns="repeat(4, 25%)">{buttons}</Grid>
              </Row>
              <Row>
                <AdditionalIncomeInput
                  monthSelected={monthSelected}
                  egPlan={egPlan}
                  updateAdditionalIncome={updateAdditionalIncome}
                />
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
