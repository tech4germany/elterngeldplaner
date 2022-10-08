import { Col, Row, Container, Button, Card } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import Month from './Month';
import constants from '../utils/constants.json';

const Parent = ({ id, updateMonthSelection, months, monthSelected }) => {
  const [monthComponents, setMonthComponents] = useState();

  useEffect(() => {
    const newMonthComponents = months[id].months.map(({ monthid, variant, amount, selected }) => (
      <Row key={monthid}>
        <Month
          monthid={monthid}
          variant={variant}
          amount={amount[variant]}
          updateMonthSelection={updateMonthSelection}
          parentId={id}
          selected={monthSelected.parentid === id && monthSelected.monthid === monthid}
        />
      </Row>
    ));
    setMonthComponents(newMonthComponents);
  }, [months, monthSelected]);

  return (
    <Card>
      <Card.Header>
        <Col>{constants.parents[id].name}</Col>
      </Card.Header>
      <Card.Body>
        <Container>{monthComponents}</Container>
      </Card.Body>
    </Card>
  );
};

export default Parent;
