import React, { useContext } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { ExtraSmallText, LargeTextBold, NormalText } from '../../components/styled/StyledText';
import FormContext from '../../context/FormContext';
import constants from '../../utils/constants.json';
import calculateEG from '../../utils/calculateEG';
import DescriptionDrawer from './DescriptionDrawer';
import icons from '../../utils/icons';

const EGCard = ({ variant, title, shortDescription }) => {
  const { formData } = useContext(FormContext);

  const getHeaderColor = () => {
    return constants.varianten[variant].colorDeactivated;
  };

  const getOverviewOneParent = (parentid) => {
    return (
      <Col>
        <Row>
          <Col className="p-0">
            <NormalText>{formData.names_parent[parentid]}</NormalText>
          </Col>
        </Row>
        <Row>
          <Col className="p-0" xs={5}>
            <LargeTextBold>
              {calculateEG(formData.income_parent[parentid], variant, 0)} €
            </LargeTextBold>
          </Col>
          <Col className="p-0 align-items-center" xs={7}>
            <ExtraSmallText>pro Monat</ExtraSmallText>
          </Col>
        </Row>
      </Col>
    );
  };
  return (
    <Card style={{ padding: 0, marginTop: 15 }}>
      <Card.Header
        style={{
          backgroundColor: getHeaderColor(),
          paddingLeft: '15px',
          paddingTop: '5px',
          paddingBottom: '5px'
        }}>
        <Container className="p-0">
          <Row className="d-flex align-items-center justify-content-between">
            <Col xs={11} className="d-flex-row align-items-center">
              <img
                src={icons[variant]}
                alt="Basis Icon"
                width="14px"
                height="auto"
                style={{
                  float: 'left',
                  verticalAlign: 'bottom',
                  top: '5px',
                  marginRight: '5px',
                  position: 'relative'
                }}
              />
              {title}
              {shortDescription}
            </Col>
            <Col xs={1} className="d-flex justify-content-center">
              <DescriptionDrawer variant={variant} />
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <Container>
          <Row>
            {getOverviewOneParent(0)}
            {getOverviewOneParent(1)}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default EGCard;
