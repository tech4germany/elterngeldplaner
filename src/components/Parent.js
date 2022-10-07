import { Col, Row, Container, Button, Card } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import Month from './Month';
import constants from '../utils/constants.json';

const Parent = ({ id, updateMonthSelection, months }) => {
  const [monthComponents, setMonthComponents] = useState();

  useEffect(() => {
    const newMonthComponents = months[id].months.map(({ monthid, variant, amount, selected }) => (
      <Fragment key={monthid}>
        <Month
          monthid={monthid}
          variant={variant}
          amount={amount}
          updateMonthSelection={updateMonthSelection}
          parentId={id}
          selected={selected}
        />
      </Fragment>
    ));
    setMonthComponents(newMonthComponents);
  }, [months]);

  return (
    <Card>
      <Card.Header>
        <Col>{constants.parents[id].name}</Col>
      </Card.Header>
      <Card.Body>{monthComponents}</Card.Body>
    </Card>
  );
};

export default Parent;
