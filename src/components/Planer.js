import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
        <Fragment key={i}>
          <Row>
            <Col>
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
            </Col>
            <Col className="d-flex align-items-center justify-content-center" xs={1}>
              {i + 1}
            </Col>
            <Col>
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
            </Col>
          </Row>
        </Fragment>
      );
    }

    setMonthComponents(newMonthComponents);
  }, [egPlan, monthSelected]);

  return (
    <Container className="justify-content-center text-center">
      <Kontingent />
      <Row>
        <Col className="align-self-center"> {constants.parents[0].name}</Col>
        <Col className="align-self-center" xs="auto">
          Lebens
          <br />
          monat
        </Col>
        <Col className="align-self-center">{constants.parents[1].name}</Col>
      </Row>
      {monthComponents}
      <SelectionOverlay
        monthSelected={monthSelected}
        egPlan={egPlan}
        {...selectionOverlayProps}
        updateMonth={updateMonth}
      />
    </Container>
  );
};

export default Planer;
