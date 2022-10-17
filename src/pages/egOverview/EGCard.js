import React, { useContext } from 'react';
import { Card, Container, ListGroup, Row, Col } from 'react-bootstrap';
import { green } from '@mui/material/colors';
import { Button } from '@chakra-ui/react';
import { AiFillDownCircle } from 'react-icons/ai';
import {
  LargeTitle,
  TextBold,
  TextNormal,
  TextExtraSmall
} from '../../components/styled/StyledText';
import FormContext from '../../context/FormContext';
import constants from '../../utils/constants.json';
import calculateEG from '../../utils/calculateEG';
import DescriptionDrawer from './DescriptionDrawer';

const EGCard = ({ variant }) => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  const getHeaderColor = () => {
    return constants.varianten[variant].colorDeactivated;
  };

  const getOverviewOneParent = (parentid) => {
    return (
      <Col>
        <Row>
          <Col className="p-0">
            <TextNormal>{formData.names_parent[parentid]}</TextNormal>
          </Col>
        </Row>
        <Row>
          <Col className="p-0">
            <LargeTitle>{calculateEG(formData.income_parent[parentid], variant)} €</LargeTitle>
          </Col>
          <Col className="p-0 align-items-center">
            <TextExtraSmall>monatl.</TextExtraSmall>
          </Col>
        </Row>
      </Col>
    );
  };
  return (
    <Card style={{ padding: 0, marginTop: 15 }}>
      <Card.Header style={{ backgroundColor: getHeaderColor() }}>
        <Container className="p-0">
          <Row className="d-flex align-items-center justify-content-between">
            <Col xs="auto">
              <TextBold>{constants.varianten[variant].fullname}</TextBold>
            </Col>
            <Col xs="auto" className="p-0">
              {/* <Button
                height="20px"
                color="gray.600" // TODO
                backgroundColor="transparent" onClick={}>
                <AiFillDownCircle
                  style={{
                    marginRight: '5px',
                    transform: 'rotate(-90deg)'
                  }}
                />
              </Button> */}
              <DescriptionDrawer variant={variant} />
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        {/* <Card.Text> */}
        <Container>
          <Row>
            {getOverviewOneParent(0)}
            {getOverviewOneParent(1)}
          </Row>
        </Container>
        {/* </Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default EGCard;
