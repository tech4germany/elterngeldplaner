import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { Row, Container } from 'react-bootstrap';
import FormContext from '../../context/FormContext';

const NavigationButton = ({ buttonTitle, nextPage, buttonVariant = 'solid' }) => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  return (
    <Container fluid>
      <Row className="justify-content-center p-0">
        <Button
          colorScheme="teal"
          size="sm"
          type="submit"
          width="100%"
          variant={buttonVariant}
          style={{ marginTop: '15px', marginBottom: '20px' }}
          onClick={() => {
            setActiveStepIndex(nextPage);
          }}>
          {buttonTitle}
        </Button>
      </Row>
    </Container>
  );
};

export default NavigationButton;
