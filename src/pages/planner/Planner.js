import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Box, Grid, GridItem, Button } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { useFormik } from 'formik';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Month from './Month';
import Overlay from './Overlay';
import constants from '../../utils/constants.json';
import useEGcalc from '../../hooks/useEGcalc';
import Kontingent from './Kontingent';
// import { LargeTitle } from '../../components/styled/StyledText';
import PageTemplate from '../../components/PageTemplate';
import FormContext from '../../context/FormContext';
import NavigationButton from '../../components/ui/NavigationButton';

import {
  NormalTextBold,
  NormalText,
  LargeTextBold,
  SmallText,
  SmallTextGray,
  NormalTextSpan
} from '../../components/styled/StyledText';

const Planner = () => {
  const { activeStepIndex, formData, setFormData } = useContext(FormContext);
  const [
    egPlan,
    { updateMonth, updateAdditionalIncome, resetPlan, getSumParent, getTotalMonthsParent }
  ] = useEGcalc(formData.egPlan);
  const [monthSelected, setMonthSelected] = useState({ monthid: undefined, parentid: undefined });

  const [shownNrMonths, setShownNrMonths] = useState(constants.numberMonthsCollapsed);

  const [monthComponents, setMonthComponents] = useState();

  const updateMonthSelection = (parentid, monthid) => {
    setMonthSelected({ parentid, monthid });
  };

  const formik = useFormik({
    initialValues: {
      egPlan
    },
    onSubmit: () => {
      const data = { ...formData, egPlan };
      setFormData(data);
      // setActiveStepIndex(activeStepIndex + 1);
    }
  });

  useEffect(() => {
    const newMonthComponents = [];
    for (let i = 0; i < shownNrMonths; i += 1) {
      newMonthComponents.push(
        // TODO: column breite bei monat gleich machen wie bei überschrift
        <Grid key={i} templateColumns="repeat(22, 1fr)" marginBottom="5px">
          <GridItem colSpan={10}>
            <Month
              monthid={egPlan[0].months[i].monthid}
              variant={egPlan[0].months[i].variant}
              amount={egPlan[0].months[i].amount[egPlan[0].months[i].variant]}
              additionalIncomeSelected={egPlan[0].months[i].incomeChecked}
              updateMonthSelection={updateMonthSelection}
              parentId={0}
              selected={
                monthSelected.parentid === 0 &&
                monthSelected.monthid === egPlan[0].months[i].monthid
              }
            />
          </GridItem>
          <GridItem colSpan={2} className="d-flex align-items-center justify-content-center">
            <SmallTextGray>{i + 1}</SmallTextGray>
          </GridItem>
          <GridItem colSpan={10}>
            <Month
              monthid={egPlan[1].months[i].monthid}
              variant={egPlan[1].months[i].variant}
              amount={egPlan[1].months[i].amount[egPlan[1].months[i].variant]}
              additionalIncomeSelected={egPlan[1].months[i].incomeChecked}
              updateMonthSelection={updateMonthSelection}
              parentId={1}
              selected={
                monthSelected.parentid === 1 &&
                monthSelected.monthid === egPlan[1].months[i].monthid
              }
            />
          </GridItem>
        </Grid>
      );
    }

    setMonthComponents(newMonthComponents);
  }, [egPlan, monthSelected, shownNrMonths]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <PageTemplate
        pageTitle="Eure gemeinsame Planung"
        description={
          <>
            <NormalText>
              In diesem Planer könnt ihr euer gemeinsames Kontingent an Elterngeld auf die
              Lebensmonate nach der Geburt verteilen.
            </NormalText>
            <NormalText style={{ marginTop: '10px', display: 'inline-block' }}>
              Die drei Varianten{' '}
              <NormalTextSpan
                color={constants.varianten.basis.colorActivated}
                style={{ fontWeight: 'bold' }}>
                Basis
              </NormalTextSpan>
              elterngeld, Elterngeld
              <NormalTextSpan
                color={constants.varianten.plus.colorActivated}
                style={{ fontWeight: 'bold' }}>
                Plus
              </NormalTextSpan>{' '}
              und Partnerschafts
              <NormalTextSpan
                color={constants.varianten.bonus.colorActivated}
                style={{ fontWeight: 'bold' }}>
                bonus
              </NormalTextSpan>{' '}
              könnt ihr dabei miteinander kombinieren.
            </NormalText>
          </>
        }>
        <Row style={{ marginTop: '17px' }}>
          <LargeTextBold>Euer Kontingent an Elterngeld:</LargeTextBold>
        </Row>
        <Row
          className="d-flex justify-content-center bg-white sticky-top p-0"
          style={{ boxShadow: '0px 5px 5px -5px #808080' }}>
          <Row
            style={{
              borderBottom: '1px solid #C5C5C5',
              paddingBottom: '17px',
              paddingTop: '11px'
            }}>
            <Kontingent egPlan={egPlan} />
          </Row>
          <Row className="text-center" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
            <Col className="align-self-center" style={{ fontWeight: 'bold' }}>
              <NormalTextBold>{formData.names_parent['0']}</NormalTextBold>
            </Col>
            <Col className="align-self-center" xs="auto">
              <SmallTextGray style={{ lineHeight: '1.0', fontWeight: 'normal' }}>
                Lebens-
                <br />
                monat
              </SmallTextGray>
            </Col>
            <Col className="align-self-center" style={{ fontWeight: 600 }}>
              <NormalTextBold>{formData.names_parent['1']}</NormalTextBold>
            </Col>
          </Row>
        </Row>
        <Row style={{ height: '20px' }} />
        {monthComponents}
        <Button
          className="d-flex-row justify-content-center"
          width="100%"
          height="40px"
          _active={{
            bg: 'transparent'
          }}
          backgroundColor="transparent"
          onClick={() => {
            if (shownNrMonths === constants.numberMonths) {
              setShownNrMonths(constants.numberMonthsCollapsed);
            } else {
              setShownNrMonths(constants.numberMonths);
            }
          }}>
          {/* <div style={{ fontSize: '11pt', marginTop: '5px' }}> */}
          <IoIosArrowDown
            style={{
              width: '20px',
              height: 'auto',
              marginRight: '5px',
              color: constants.navigationButtonColor,
              transform:
                shownNrMonths === constants.numberMonths ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          />
          <NormalTextBold style={{ color: constants.navigationButtonColor }}>
            {shownNrMonths === constants.numberMonths
              ? 'weniger Monate anzeigen'
              : 'alle Monate anzeigen'}
          </NormalTextBold>
        </Button>
        <Row style={{ marginLeft: '-20px', marginRight: '-20px', marginTop: '10px' }}>
          <Box
            bg={constants.varianten.none.colorDeactivated}
            w="100%"
            style={{
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}>
            <Container>
              <Row style={{ paddingBottom: '10px' }}>
                <LargeTextBold style={{ padding: 0 }}>Gesamtsumme</LargeTextBold>
              </Row>
              <Row className="d-flex justify-content-around">
                <Col>
                  <Row>
                    <SmallText style={{ padding: 0, fontWeight: 'bold' }}>
                      {formData.names_parent[0]}
                    </SmallText>
                  </Row>
                  <Row className="text-left align-items-center">
                    <Col xs={5} style={{ padding: 0 }}>
                      <NormalTextBold>{getSumParent(0)} €</NormalTextBold>
                    </Col>
                    <Col xs={7} style={{ padding: 0 }}>
                      <SmallTextGray style={{ fontWeight: 'normal', textAlign: 'left' }}>
                        {getTotalMonthsParent(0)} Monate
                      </SmallTextGray>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <SmallText style={{ padding: 0, fontWeight: 'bold' }}>
                      {formData.names_parent[1]}
                    </SmallText>
                  </Row>
                  <Row className="text-left align-items-center">
                    <Col xs={5} style={{ padding: 0 }}>
                      <NormalTextBold>{getSumParent(1)} €</NormalTextBold>
                    </Col>
                    <Col xs={7} style={{ padding: 0 }}>
                      <SmallTextGray style={{ fontWeight: 'normal', textAlign: 'left' }}>
                        {getTotalMonthsParent(1)} Monate
                      </SmallTextGray>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Box>
        </Row>
        <Row xs="auto" className="justify-content-center">
          <Button
            variant="ghost"
            size="xs"
            color={constants.navigationButtonColor}
            style={{ marginBottom: '5px', marginTop: '15px' }}
            onClick={() => {
              resetPlan();
            }}>
            <RiArrowGoBackLine style={{ marginRight: '5px', width: '15px', height: 'auto' }} />
            <NormalTextBold style={{ color: constants.navigationButtonColor }}>
              Auswahl zurücksetzen
            </NormalTextBold>
          </Button>
        </Row>

        <Row className="d-flex justify-content-between">
          <Col>
            <NavigationButton buttonTitle="Zurück" nextPage={activeStepIndex - 1} isSecondary />
          </Col>
          <Col>
            <NavigationButton buttonTitle="Zur Zusammmenfassung" nextPage={activeStepIndex + 1} />
          </Col>
        </Row>

        <Row>
          <Box height="240px" />
        </Row>

        <Overlay
          monthSelected={monthSelected}
          setMonthSelected={setMonthSelected}
          egPlan={egPlan}
          updateMonth={updateMonth}
          updateAdditionalIncome={updateAdditionalIncome}
        />
      </PageTemplate>
    </Form>
  );
};

export default Planner;
