import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import KontingentItem from './KontingentItem';
import constants from '../utils/constants.json';

const Kontingent = ({ egPlan }) => {
  const [kontingentItems, setKontingentItems] = useState({ basis: [], plus: [], bonus: [] });
  const [kontingentDisplay, setKontingentDisplay] = useState({ basis: [], plus: [], bonus: [] });
  const maxKontingent = {
    basis: constants.varianten.basis.maxMonths - 0.5, // because 0.5 months left cannot be used for another basis month
    plus: constants.varianten.plus.maxMonths,
    bonus: constants.varianten.bonus.maxMonths / 2 - 0.5 // because PB can only be taken two months at a time
  };

  const circleStyle = {
    display: 'flex',
    width: '10px',
    height: '10px',
    backgroundColor: 'green',
    borderRadius: '50%',
    marginRight: '3px'
  };

  useEffect(() => {
    const availableKontingent = {
      basis: maxKontingent.basis,
      plus: maxKontingent.plus,
      bonus: maxKontingent.bonus
    };
    // check how many months are available for each variant
    for (let i = 0; i < egPlan.length; i += 1) {
      for (let j = 0; j < egPlan[i].months.length; j += 1) {
        switch (egPlan[i].months[j].variant) {
          case 'basis':
            availableKontingent.basis -= 1;
            availableKontingent.plus -= 2;
            break;
          case 'plus':
            availableKontingent.plus -= 1;
            availableKontingent.basis -= 0.5;

            break;
          case 'bonus':
            availableKontingent.bonus -= 0.5;
            break;
          default:
            break;
        }
      }
    }

    // set up kontingent items
    const newKontingentItems = { basis: [], plus: [], bonus: [] };
    Object.keys(kontingentItems).forEach((key) => {
      for (let i = 0; i < availableKontingent[key]; i += 1) {
        newKontingentItems[key].push(
          <Col xs="auto" key={key + i}>
            <KontingentItem variant={key} isAvailable />
          </Col>
        );
      }
      for (let i = availableKontingent[key]; i < maxKontingent[key]; i += 1) {
        newKontingentItems[key].push(
          <Col xs="auto" key={key + i}>
            <KontingentItem variant={key} isAvailable={false} />
          </Col>
        );
      }
    });
    setKontingentItems(newKontingentItems);

    // set up kontingent display
    const newKontingentDisplay = { basis: [], plus: [], bonus: [] };
    Object.keys(newKontingentDisplay).forEach((key) => {
      newKontingentDisplay[key].push(
        <Col key={key} className="d-flex align-items-center justify-content-center p-0">
          <div
            style={{ ...circleStyle, backgroundColor: constants.varianten[key].colorActivated }}
          />
          {constants.varianten[key].abbrvOverlay}{' '}
          {key === 'bonus'
            ? Math.ceil(availableKontingent[key]) * 2
            : Math.ceil(availableKontingent[key])}
          /{key === 'bonus' ? Math.ceil(maxKontingent[key]) * 2 : Math.ceil(maxKontingent[key])}
        </Col>
      );
    });
    setKontingentDisplay(newKontingentDisplay);
  }, [egPlan]);
  return (
    <Container fluid className="d-flex-row align-items-center justify-content-center">
      <Row>
        {kontingentDisplay.basis}
        {kontingentDisplay.plus}
        {kontingentDisplay.bonus}
      </Row>
      <Row className="g-0 d-flex-row align-items-center justify-content-center">
        <Col xs="auto">
          <Row className="g-0">{kontingentItems.basis}</Row>
          <Row className="g-0"> {kontingentItems.plus}</Row>
        </Col>
        <Col xs="auto">
          <Row className="g-0">{kontingentItems.bonus}</Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Kontingent;
