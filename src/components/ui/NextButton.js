import React from 'react';
import { Button } from '@chakra-ui/react';
import { Row, Container } from 'react-bootstrap';

const NextButton = ({ buttonTitle, nextPage }) => {
  return (
    <Container fluid>
      <Row xs="auto" className="justify-content-center p-3">
        <Button colorScheme="teal" size="md">
          {buttonTitle}
        </Button>
      </Row>
    </Container>
  );
};

export default NextButton;
