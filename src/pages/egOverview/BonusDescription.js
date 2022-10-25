import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { UnorderedList, ListItem } from '@chakra-ui/react';
import { NormalTextBold, NormalText } from '../../components/styled/StyledText';
import constants from '../../utils/constants.json';

const BonusDescription = () => {
  return (
    <Container className="p-2">
      <Row style={{ marginBottom: '20px' }}>
        <Card style={{ backgroundColor: constants.varianten.bonus.colorDeactivated }} border="0">
          <Card.Body>
            <Card.Title>
              <NormalTextBold> Zusammenfassung </NormalTextBold>
            </Card.Title>
            <NormalText>
              <UnorderedList spacing={2}>
                <ListItem>
                  Ihr könnt jeweils bis zu 4 zusätzliche ElterngeldPlus-Monate bekommen, wenn beide
                  Elternteile während dieser Zeit in Teilzeit arbeiten.
                </ListItem>
                <ListItem>
                  Beide Elternteile arbeiten hierbei mindestens 24 und höchstens 32 Stunden pro
                  Woche.
                </ListItem>
                <ListItem>
                  Die Höhe des Partnerschaftsbonus entspricht der des ElterngeldPlus
                </ListItem>
                <ListItem>
                  <NormalTextBold>
                    Um den Partnerschaftsbonus nutzen zu können, müsst ihr diesen mindestens 2 und
                    höchstens 4 Lebensmonate gemeinsam beziehen. Diese Monate müssen direkt
                    aufeinander folgen.
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

export default BonusDescription;
