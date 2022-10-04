import { Container, Row, Col, Button } from 'react-bootstrap';
import Parent from './Parent';

const Planer = () => (
  <Container className="justify-content-md-center">
    <Row>
      <Col>
        <Parent parentId={1} name="Charlotte" />
      </Col>
      <Col>
        <Parent parentId={2} name="Pete" />
      </Col>
    </Row>
  </Container>
);

export default Planer;
