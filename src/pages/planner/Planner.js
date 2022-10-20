import { Fragment, useEffect, useState, useRef, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Box, Grid, GridItem, Button } from '@chakra-ui/react';
import { AiFillDownCircle } from 'react-icons/ai';
import { GrPowerReset, VscRefresh, VscMenu } from 'react-icons/vsc';
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
  TextBold,
  TextNormal,
  LargeTextBold,
  TextExtraSmall,
  TextSmall,
  TextSmallGray,
  TextNormalSpan
} from '../../components/styled/StyledText';

const Planner = () => {
  const [
    egPlan,
    { updateMonth, updateAdditionalIncome, resetPlan, getSumParent, getTotalMonthsParent }
  ] = useEGcalc();
  const [monthSelected, setMonthSelected] = useState({ monthid: undefined, parentid: undefined });
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  const [shownNrMonths, setShownNrMonths] = useState(constants.numberMonthsCollapsed);
  const [selectionOverlayProps, setSelectionOverlayProps] = useState({
    isVisible: false
  });

  useEffect(() => {
    setSelectionOverlayProps({
      // monthid: monthSelected.monthid,
      // parentid: monthSelected.parentid,
      // egPlan,
      isVisible: true
    });
  }, [egPlan, monthSelected]);

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
            <TextSmallGray>{i + 1}</TextSmallGray>
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
            <TextNormal>
              In diesem Planer könnt ihr euer gemeinsames Kontingent an Elterngeld auf die
              Lebensmonate nach der Geburt verteilen.
            </TextNormal>
            <TextNormal style={{ marginTop: '10px' }}>
              Die drei Varianten{' '}
              <TextNormalSpan
                color={constants.varianten.basis.colorActivated}
                style={{ fontWeight: 'bold' }}>
                Basis
              </TextNormalSpan>
              elterngeld, Elterngeld
              <TextNormalSpan
                color={constants.varianten.plus.colorActivated}
                style={{ fontWeight: 'bold' }}>
                Plus
              </TextNormalSpan>{' '}
              und Partnerschafts
              <TextNormalSpan
                color={constants.varianten.bonus.colorActivated}
                style={{ fontWeight: 'bold' }}>
                bonus
              </TextNormalSpan>{' '}
              könnt ihr dabei miteinander kombinieren.
            </TextNormal>
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
              <TextBold>{formData.names_parent['0']}</TextBold>
            </Col>
            <Col className="align-self-center" xs="auto">
              <TextSmallGray style={{ lineHeight: '1.0', fontWeight: 'normal' }}>
                Lebens-
                <br />
                monat
              </TextSmallGray>
            </Col>
            <Col className="align-self-center" style={{ fontWeight: 600 }}>
              <TextBold>{formData.names_parent['1']}</TextBold>
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
          <TextBold style={{ color: constants.navigationButtonColor }}>
            {shownNrMonths === constants.numberMonths
              ? 'weniger Monate anzeigen'
              : 'alle Monate anzeigen'}
          </TextBold>
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
                    <TextSmall style={{ padding: 0, fontWeight: 'bold' }}>
                      {formData.names_parent[0]}
                    </TextSmall>
                  </Row>
                  <Row className="text-left align-items-center">
                    <Col xs={5} style={{ padding: 0 }}>
                      <TextBold>{getSumParent(0)} €</TextBold>
                    </Col>
                    <Col xs={7} style={{ padding: 0 }}>
                      <TextSmallGray style={{ fontWeight: 'normal', textAlign: 'left' }}>
                        {getTotalMonthsParent(0)} Monate
                      </TextSmallGray>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <TextSmall style={{ padding: 0, fontWeight: 'bold' }}>
                      {formData.names_parent[1]}
                    </TextSmall>
                  </Row>
                  <Row className="text-left align-items-center">
                    <Col xs={5} style={{ padding: 0 }}>
                      <TextBold>{getSumParent(1)} €</TextBold>
                    </Col>
                    <Col xs={7} style={{ padding: 0 }}>
                      <TextSmallGray style={{ fontWeight: 'normal', textAlign: 'left' }}>
                        {getTotalMonthsParent(1)} Monate
                      </TextSmallGray>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Box>
        </Row>
        <Row xs="auto" className="justify-content-center">
          <Button
            // color="gray"
            variant="ghost"
            size="xs"
            color={constants.navigationButtonColor}
            style={{ marginBottom: '5px', marginTop: '15px' }}
            onClick={() => {
              resetPlan();
            }}>
            <RiArrowGoBackLine style={{ marginRight: '5px', width: '15px', height: 'auto' }} />
            <TextBold style={{ color: constants.navigationButtonColor }}>
              Auswahl zurücksetzen
            </TextBold>
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
          {...selectionOverlayProps}
          updateMonth={updateMonth}
          updateAdditionalIncome={updateAdditionalIncome}
        />
      </PageTemplate>
    </Form>
  );
};

export default Planner;
