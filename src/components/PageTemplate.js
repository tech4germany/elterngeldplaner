import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { LargeTitle, TextNormal } from './styled/StyledText';

const PageTemplate = ({ pageTitle, description, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // TODO: save padding as constant
    <Container
      fluid
      className="justify-content-center"
      style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Row className="d-flex bg-white">
        <LargeTitle>{pageTitle}</LargeTitle>
      </Row>
      <Row className="d-flex bg-white">
        <TextNormal> {description}</TextNormal>
      </Row>
      <Row className="d-flex">
        <Container>{children}</Container>
      </Row>
    </Container>
  );
};

export default PageTemplate;
