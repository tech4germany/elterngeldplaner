import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import KontingentItem from './KontingentItem';
import constants from '../utils/constants.json';

const Kontingent = ({ egPlan }) => {
  const [kontingentItems, setKontingentItems] = useState({ basis: [], plus: [], bonus: [] });
  const maxKontingent = {
    basis: constants.varianten.basis.maxMonths - 0.5,
    plus: constants.varianten.plus.maxMonths,
    bonus: constants.varianten.bonus.maxMonths
  };

  useEffect(() => {
    const availableKontingent = {
      basis: maxKontingent.basis,
      plus: maxKontingent.plus,
      bonus: maxKontingent.bonus
    };
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
            availableKontingent.bonus -= 1;
            break;
          default:
            break;
        }
      }
    }
    const newKontingentItems = { basis: [], plus: [], bonus: [] };

    Object.keys(kontingentItems).forEach((key) => {
      for (let i = 0; i < availableKontingent[key]; i += 1) {
        newKontingentItems[key].push(
          <Col>
            <KontingentItem variant={key} isAvailable />
          </Col>
        );
      }
      for (let i = availableKontingent[key]; i < maxKontingent[key]; i += 1) {
        newKontingentItems[key].push(
          <Col>
            <KontingentItem variant={key} isAvailable={false} />
          </Col>
        );
      }
    });

    setKontingentItems(newKontingentItems);
  }, [egPlan]);
  return (
    <Container fluid className="d-flex align-items-center justify-content-center">
      <Row className="g-0">
        <Col xs="auto">
          <Row className="g-0"> {kontingentItems.basis}</Row>
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
