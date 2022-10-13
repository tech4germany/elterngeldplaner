import { Fragment, useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Box, Grid, GridItem, Icon, IconButton, Button } from '@chakra-ui/react';
import { AiFillDownCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Month from './Month';
import Overlay from './Overlay';
import constants from '../utils/constants.json';
import useEGcalc from '../hooks/useEGcalc';
import Kontingent from './Kontingent';
import useSticky from '../hooks/useSticky';

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
    <Container className="justify-content-center text-center">
      <Row className="bg-white p-2">
        <div style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '16px', marginTop: '20px' }}>
          Eure gemeinsame Planung
        </div>
        <div style={{ textAlign: 'left', fontSize: '10pt', lineHeight: '1.5' }}>
          In diesem Planer könnt ihr euer gemeinsames Kontingent an Elterngeld auf die Lebensmonate
          verteilen und die Zeit nach der Geburt partnerschaftlich planen.
        </div>
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
        className="d-flex bg-white sticky-top p-2"
        style={{ boxShadow: '0px 5px 5px -5px #808080' }}>
        <Row style={{ marginBottom: '15px' }}>
          <Kontingent egPlan={egPlan} />
        </Row>
        <Row>
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
          : 'mehr Monate anzeigen'}
        {/* </div> */}
      </Button>

      {/* <div style={{ fontSize: '11pt', marginTop: '5px' }}>mehr Monate anzeigen</div>
      <Icon as={AiFillDownCircle} w={6} h={6} color="gray" /> */}

      {/* <Box h="200px" bg="red" position="absolute" top={50} zIndex={2} /> */}

      <Button
        color="gray"
        variant="outline"
        size="xs"
        marginTop="20px"
        onClick={() => {
          resetPlan();
        }}>
        Auswahl zurücksetzen
      </Button>
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
    </Container>
    // <Container className="justify-content-center text-center">
    //   <Row className="d-flex justify-content-center bg-light sticky-top">
    //     {/* <Row>
    //       <p>Elterngeld-Planer</p>
    //     </Row> */}
    //     <Row style={{ marginBottom: '15px', marginTop: '20px' }}>
    //       <div style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px' }}>
    //         Euer Elterngeld-Kontingent:
    //       </div>
    //       <Kontingent egPlan={egPlan} />
    //     </Row>
    //     <Row>
    //       <Col className="align-self-center" style={{ fontWeight: 'bold' }}>
    //         {constants.parents[0].name}
    //       </Col>
    //       <Col className="align-self-center" xs="auto">
    //         <div style={{ fontSize: '10pt', lineHeight: '1.0' }}>
    //           Lebens
    //           <br />
    //           monat
    //         </div>
    //       </Col>
    //       <Col className="align-self-center" style={{ fontWeight: 600 }}>
    //         {constants.parents[1].name}
    //       </Col>
    //     </Row>
    //   </Row>
    //   {/* <Row style={{ marginBottom: '15px', marginTop: '10px' }}>
    //     <div style={{ textAlign: 'left' }}>Euer Elterngeld-Kontingent</div>
    //     <Kontingent egPlan={egPlan} />
    //   </Row> */}

    //   {monthComponents}
    //   {/* <Box h="200px" bg="red" position="absolute" top={50} zIndex={2} /> */}
    //   <Row>
    //     <Box height="180px" />
    //   </Row>

    //   <SelectionOverlay
    //     monthSelected={monthSelected}
    //     egPlan={egPlan}
    //     {...selectionOverlayProps}
    //     updateMonth={updateMonth}
    //   />
    // </Container>
  );
};

export default Planer;
