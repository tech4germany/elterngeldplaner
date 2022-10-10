import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Month from './Month';
import SelectionOverlay from './SelectionOverlay';
import constants from '../utils/constants.json';
import useEGcalc from '../hooks/useEGcalc';
import Kontingent from './Kontingent';

const Planer = () => {
  const [egPlan, { updateMonth }] = useEGcalc();
  const [monthSelected, setMonthSelected] = useState({ monthid: undefined, parentid: undefined });

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
    for (let i = 0; i < constants.numberMonths; i += 1) {
      newMonthComponents.push(
        // TODO: column breite bei monat gleich machen wie bei überschrift
        <Grid key={i} templateColumns="repeat(22, 1fr)">
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
  }, [egPlan, monthSelected]);

  return (
    <Container className="justify-content-center text-center">
      <Row className="d-flex justify-content-center bg-light sticky-top">
        {/* <Row>
        <p>Elterngeld-Planer</p>
      </Row> */}
        <Row style={{ marginBottom: '15px', marginTop: '20px' }}>
          <div style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px' }}>
            Euer Elterngeld-Kontingent:
          </div>
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

      {monthComponents}
      {/* <Box h="200px" bg="red" position="absolute" top={50} zIndex={2} /> */}
      <Row>
        <Box height="180px" />
      </Row>

      <SelectionOverlay
        monthSelected={monthSelected}
        egPlan={egPlan}
        {...selectionOverlayProps}
        updateMonth={updateMonth}
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
