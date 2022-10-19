import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { Row, Container } from 'react-bootstrap';
import FormContext from '../../context/FormContext';
import constants from '../../utils/constants.json';

const NavigationButton = ({
  buttonTitle,
  nextPage,
  // buttonVariant = 'solid',
  isSecondary = false
}) => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  return (
    <Container fluid>
      <Row className="justify-content-center p-0">
        <Button
          // colorScheme="messenger"
          // color="white"
          color={isSecondary ? constants.navigationButtonColor : 'white'}
          backgroundColor={isSecondary ? 'white' : constants.navigationButtonColor}
          _active={{
            bg: isSecondary ? 'white' : constants.navigationButtonColor
          }}
          _focus={{
            bg: isSecondary ? 'white' : constants.navigationButtonColor
          }}
          _hover={{
            bg: isSecondary ? 'white' : constants.navigationButtonColor
          }}
          border="2px"
          borderColor={constants.navigationButtonColor}
          size="sm"
          height="40px"
          type="submit"
          width="100%"
          // variant={buttonVariant}
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
