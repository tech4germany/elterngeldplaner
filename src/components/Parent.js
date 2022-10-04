import { Button, Card } from 'react-bootstrap';
import Month from './Month';
import constants from '../utils/constants.json';

const Parent = ({ id, name }) => {
  const months = [];

  for (let i = 0; i < 32; i += 1) {
    months.push({ monthid: i, variant: 'none', value: constants.none });
  }

  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        {months.map(({ monthid, variant, value }) => (
          <Month key={monthid} variant={variant} value={value} />
        ))}
      </Card.Body>
    </Card>
  );
};

export default Parent;
