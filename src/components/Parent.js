import { Button, Card } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import Month from './Month';
import constants from '../utils/constants.json';

const Parent = ({ id, updateOverlay, monthsParent }) => {
  console.log(constants.parents[id].name);
  return (
    <Card>
      <Card.Header>{constants.parents[id].name}</Card.Header>
      <Card.Body>
        {monthsParent.map(({ monthid, variant, value }) => (
          <Fragment key={monthid}>
            <Month
              monthKey={monthid}
              variant={variant}
              value={value}
              updateOverlay={updateOverlay}
              parentId={id}
            />
          </Fragment>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Parent;
