import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { UnorderedList, ListItem, List } from '@chakra-ui/react';
import { LargeTitle, TextBold, TextNormal } from '../../components/styled/StyledText';
import constants from '../../utils/constants.json';

const PlusDescription = () => {
  return (
    <Container className="p-2">
      <Row style={{ marginBottom: '20px' }}>
        <Card style={{ backgroundColor: constants.varianten.plus.colorDeactivated }} border="0">
          <Card.Body>
            <Card.Title>
              <TextBold> Zusammenfassung </TextBold>
            </Card.Title>
            <TextNormal>
              <UnorderedList spacing={2}>
                <ListItem>
                  Ein Basiselterngeldmonat kann in zwei ElterngeldPlus-Monate umgewandelt werden
                </ListItem>
                <ListItem>
                  Dadurch könnt ihr bis zu 28 Monate ElterngeldPlus-Monate beziehen
                </ListItem>
                <ListItem>
                  Die Höhe von ElterngeldPlus entspricht der Hälfte eines Basiselterngeldmonats ohne
                  zusätzlichem Einkommen
                </ListItem>
                <ListItem>
                  Ihr könnt, müsst aber nicht, in Teilzeit arbeiten (max. 32 Std.).
                </ListItem>
                <ListItem>
                  <TextBold>
                    Nach dem 14. Lebensmonat könnt ihr Elterngeld nur noch ohne gemeinsame
                    Unterbrechungen beziehen. Entweder in Form von ElterngeldPlus oder
                    Partnerschaftsbonus.
                  </TextBold>
                </ListItem>
              </UnorderedList>
            </TextNormal>
          </Card.Body>
        </Card>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <TextBold>Bezugsdauer und -zeitpunkt</TextBold>
        <TextNormal>tbd</TextNormal>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <TextBold>Berechnung</TextBold>
        <TextNormal>tbd</TextNormal>
      </Row>
    </Container>
  );
};

export default PlusDescription;
