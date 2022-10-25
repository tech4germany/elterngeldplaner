import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { UnorderedList, ListItem } from '@chakra-ui/react';
import { NormalTextBold, NormalText } from '../../components/styled/StyledText';
import constants from '../../utils/constants.json';

const PlusDescription = () => {
  return (
    <Container className="p-2">
      <Row style={{ marginBottom: '20px' }}>
        <Card style={{ backgroundColor: constants.varianten.plus.colorDeactivated }} border="0">
          <Card.Body>
            <Card.Title>
              <NormalTextBold> Zusammenfassung </NormalTextBold>
            </Card.Title>
            <NormalText>
              <UnorderedList spacing={2}>
                <ListItem>
                  Ein Basiselterngeldmonat kann in zwei ElterngeldPlus-Monate umgewandelt werden
                </ListItem>
                <ListItem>
                  Dadurch könnt ihr bis zu 28 Monate ElterngeldPlus-Monate beziehen
                </ListItem>
                <ListItem>
                  Die Höhe von ElterngeldPlus ist gedeckelt auf die Hälfte eines
                  Basiselterngeldmonats ohne zusätzlichem Einkommen
                </ListItem>
                <ListItem>
                  Ihr könnt, müsst aber nicht, in Teilzeit arbeiten (max. 32 Std.).
                </ListItem>
                <ListItem>
                  <NormalTextBold>
                    Nach dem 14. Lebensmonat könnt ihr Elterngeld nur noch ohne gemeinsame
                    Unterbrechungen beziehen. Entweder in Form von ElterngeldPlus oder
                    Partnerschaftsbonus.
                  </NormalTextBold>
                </ListItem>
              </UnorderedList>
            </NormalText>
          </Card.Body>
        </Card>
      </Row>
      {/* <Row style={{ marginBottom: '20px' }}>
        <TextBold>Bezugsdauer und -zeitpunkt</TextBold>
        <TextNormal>tbd</TextNormal>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <TextBold>Berechnung</TextBold>
        <TextNormal>tbd</TextNormal>
      </Row> */}
    </Container>
  );
};

export default PlusDescription;
