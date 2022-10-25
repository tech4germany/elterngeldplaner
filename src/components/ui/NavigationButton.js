import { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { Row, Container } from 'react-bootstrap';
import FormContext from '../../context/FormContext';
import constants from '../../utils/constants.json';

const NavigationButton = ({ buttonTitle, nextPage, isSecondary = false }) => {
  const { setActiveStepIndex } = useContext(FormContext);

  return (
    <Container fluid>
      <Row className="justify-content-center p-0">
        <Button
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
          style={{ marginTop: '20px', marginBottom: '20px' }}
          onClick={() => {
            setActiveStepIndex(nextPage); // TODO: evtl. eher bei onsubmit aufrufen?
          }}>
          {buttonTitle}
        </Button>
      </Row>
    </Container>
  );
};

export default NavigationButton;
