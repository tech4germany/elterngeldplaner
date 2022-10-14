import { Fragment, useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Box,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody
} from '@chakra-ui/react';
import { AiFillDownCircle } from 'react-icons/ai';
import { GrPowerReset, VscRefresh, VscMenu } from 'react-icons/vsc';
import logo from '../../images/fpo-logo.jpg';
import Month from './Month';
import Overlay from './Overlay';
import constants from '../../utils/constants.json';
import useEGcalc from '../../hooks/useEGcalc';
import Kontingent from './Kontingent';
import useSticky from '../../hooks/useSticky';
// import { LargeTitle } from '../../components/styled/StyledText';
import PageTemplate from '../../components/PageTemplate';
import NextButton from '../../components/ui/NextButton';

const Planer = () => {
  const [egPlan, { updateMonth, updateAdditionalIncome, resetPlan }] = useEGcalc();
  const [monthSelected, setMonthSelected] = useState({ monthid: undefined, parentid: undefined });
  const [shownNrMonths, setShownNrMonths] = useState(constants.numberMonthsCollapsed);
  const [selectionOverlayProps, setSelectionOverlayProps] = useState({
    // TODO unnötig
    // monthid: 0,
    // parentid: 0,
    // egPlan,
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
              updateMonthSelection={updateMonthSelection}
              parentId={0}
              selected={
                monthSelected.parentid === 0 &&
                monthSelected.monthid === egPlan[0].months[i].monthid
              }
            />
          </GridItem>
          <GridItem colSpan={2} className="d-flex align-items-center justify-content-center">
            {i + 1}
          </GridItem>
          <GridItem colSpan={10}>
            <Month
              monthid={egPlan[1].months[i].monthid}
              variant={egPlan[1].months[i].variant}
              amount={egPlan[1].months[i].amount[egPlan[1].months[i].variant]}
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
    <PageTemplate
      pageTitle="Eure gemeinsame Planung"
      description="In diesem Planer könnt ihr euer gemeinsames Kontingent an Elterngeld auf die Lebensmonate
    nach der Geburt verteilen.">
      <Row>
        <div
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '11pt',
            marginTop: '10px'
          }}>
          Euer Kontingent an Elterngeld:
        </div>
      </Row>
      <Row
        className="d-flex justify-content-center bg-white sticky-top p-0"
        style={{ boxShadow: '0px 5px 5px -5px #808080' }}>
        <Row
          style={{
            width: '100%',
            borderBottom: '1px solid #C5C5C5',
            paddingBottom: '15px',
            paddingTop: '10px'
          }}>
          <Kontingent egPlan={egPlan} />
        </Row>
        <Row className="p-1 text-center">
          <Col className="align-self-center" style={{ fontWeight: 'bold' }}>
            {constants.parents[0].name}
          </Col>
          <Col className="align-self-center" xs="auto">
            <div style={{ fontSize: '10pt', lineHeight: '1.0' }}>
              Lebens
              <br />
              monat
            </div>
          </Col>
          <Col className="align-self-center" style={{ fontWeight: 600 }}>
            {constants.parents[1].name}
          </Col>
        </Row>
      </Row>
      <Row style={{ height: '20px' }} />
      {monthComponents}
      <Button
        className="d-flex-row justify-content-center"
        width="100%"
        height="35px"
        fontSize="11pt"
        fontWeight="semibold"
        textDecoration="underline"
        color="gray.600" // TODO
        backgroundColor="transparent"
        marginTop="5px"
        onClick={() => {
          if (shownNrMonths === constants.numberMonths) {
            setShownNrMonths(constants.numberMonthsCollapsed);
          } else {
            setShownNrMonths(constants.numberMonths);
          }
        }}>
        {/* <div style={{ fontSize: '11pt', marginTop: '5px' }}> */}
        <AiFillDownCircle
          style={{
            marginRight: '5px',
            transform: shownNrMonths === constants.numberMonths ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
        {shownNrMonths === constants.numberMonths
          ? 'weniger Monate anzeigen'
          : 'alle Monate anzeigen'}
      </Button>
      <a href="https://www.figma.com/proto/QUIZHKR0ymzKn9jSNqDYMT/EGR_MoodTracker_221004?page-id=860%3A65726&node-id=1048%3A70780&viewport=526%2C467%2C0.38&scaling=min-zoom">
        <NextButton
          buttonTitle="Zur Zusammmenfassung"
          // onClick="window.location.href='https://www.figma.com/proto/QUIZHKR0ymzKn9jSNqDYMT/EGR_MoodTracker_221004?page-id=860%3A65726&node-id=1048%3A70780&viewport=526%2C467%2C0.38&scaling=min-zoom';"
        />
      </a>

      <Row xs="auto" className="justify-content-center">
        <Button
          color="gray"
          variant="ghost"
          size="xs"
          onClick={() => {
            resetPlan();
          }}>
          <VscRefresh style={{ marginRight: '5px' }} />
          Auswahl zurücksetzen
        </Button>
      </Row>
      <Row>
        <Box height="170px" />
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
  );
};

export default Planer;