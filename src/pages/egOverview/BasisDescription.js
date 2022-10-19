import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { UnorderedList, ListItem } from '@chakra-ui/react';
import { LargeTitle, TextBold, TextNormal } from '../../components/styled/StyledText';
import constants from '../../utils/constants.json';

const BasisDescription = () => {
  return (
    <Container className="p-2">
      <Row style={{ marginBottom: '20px' }}>
        <Card style={{ backgroundColor: constants.varianten.basis.colorDeactivated }} border="0">
          <Card.Body>
            <Card.Title>
              <TextBold> Zusammenfassung </TextBold>
            </Card.Title>
            <TextNormal>
              <UnorderedList spacing={2}>
                <ListItem>Euch stehen gemeinsam bis zu 14 Monate Basiselterngeld zu</ListItem>
                <ListItem>
                  Ein Elternteil kann mind. 2 Monate und max. 12 Monate in Anspruch nehmen
                </ListItem>
                <ListItem>Basiselterngeld kann nur bis zum 14. Lebensmonat genutzt werden</ListItem>
                <ListItem>
                  <TextBold>
                    Wichtig: Wenn die Mutter in den ersten zwei Monaten Mutterschaftsgeld bezieht,
                    werden diese automatisch als Basiselterngeld-Monate gezählt.
                  </TextBold>
                </ListItem>
              </UnorderedList>
            </TextNormal>
          </Card.Body>
        </Card>
      </Row>
      {/* <Row style={{ marginBottom: '20px' }}>
        <TextBold>Bezugsdauer und -zeitpunkt</TextBold>
        <TextNormal>
          Wenn beide Elternteile mind. 2 Monate Elterngeld beziehen, bekommt ihr ein gemeinsames
          Kontingent an 14 Monaten Basiselterngeld, andernfalls sind es 12 Monate. Basiselterngeld
          kann nur in den ersten 14 Lebensmonaten bezogen werden, danach ist nur noch ElterngeldPlus
          und PartnerschaftsBonus möglich.
        </TextNormal>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <TextBold>Berechnung</TextBold>
        <TextNormal>tbd</TextNormal>
      </Row> */}
    </Container>
  );
};

export default BasisDescription;
