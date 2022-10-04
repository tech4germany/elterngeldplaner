import { Button, Container, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import SelectionOverlay from './SelectionOverlay';

const Month = ({ monthKey, variant, value, setOverlay, parentName }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Container key={monthKey}>
      <Row>
        <Col>
          <Button
            variant="secondary"
            onClick={() => {
              setSelected(!selected);
              setOverlay(
                <SelectionOverlay
                  monthid={monthKey}
                  parentName={parentName}
                  selectedVariant={variant}
                  isVisible
                />
              );
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
