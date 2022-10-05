import { Button, Container, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import SelectionOverlay from './SelectionOverlay';

const Month = ({ monthKey, variant, value, updateOverlay, parentId }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Container key={monthKey}>
      <Row>
        <Col>
          <Button
            variant="secondary"
            onClick={() => {
              setSelected(!selected);
              updateOverlay(monthKey, parentId, variant, true);
            }}>
            {variant}
          </Button>
        </Col>
        <Col>{value}</Col>
      </Row>
    </Container>
  );
};

export default Month;
