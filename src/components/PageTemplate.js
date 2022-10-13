import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { LargeTitle, TextNormal } from './styled/StyledText';

const PageTemplate = ({ pageTitle, description, children }) => {
  return (
    <Container style={{ paddingLeft: '18px', paddingRight: '18px' }}>
      <Row className="bg-white">
        <LargeTitle>{pageTitle}</LargeTitle>
      </Row>
      <Row>
        <TextNormal> {description}</TextNormal>
      </Row>
      <Row>{children}</Row>
    </Container>
  );
};

export default PageTemplate;
