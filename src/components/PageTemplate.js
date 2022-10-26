import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { LargeTitle, NormalText } from './styled/StyledText';

const PageTemplate = ({ pageTitle, description, children }) => {
  const paddingLeftRight = '18px';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      fluid
      className="justify-content-center"
      style={{ paddingLeft: paddingLeftRight, paddingRight: paddingLeftRight }}>
      <Row className="d-flex bg-white">
        <LargeTitle>{pageTitle}</LargeTitle>
      </Row>
      <Row className="d-flex bg-white">
        <NormalText> {description}</NormalText>
      </Row>
      <Row className="d-flex">
        <Container>{children}</Container>
      </Row>
    </Container>
  );
};

export default PageTemplate;
