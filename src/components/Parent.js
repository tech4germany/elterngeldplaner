import { Button, Card } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import Month from './Month';
import constants from '../utils/constants.json';

const Parent = ({ id, name, setOverlay, monthsParent }) => {
  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        {monthsParent.map(({ monthid, variant, value }) => (
          <Fragment key={monthid}>
            <Month
              monthKey={monthid}
              variant={variant}
              value={value}
              setOverlay={setOverlay}
              parentName={name}
            />
          </Fragment>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Parent;
