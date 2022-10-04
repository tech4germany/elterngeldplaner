import { Button, Container, Col, Row } from 'react-bootstrap';

const Month = ({ key, variant, value }) => {
  return (
    <Container key={key}>
      <Row>
        <Col>
          <Button>{variant}</Button>
        </Col>
        <Col>{value}</Col>
      </Row>
    </Container>
  );
};

export default Month;
