import React from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import PageTemplate from '../../components/PageTemplate';

const nameInputPage = () => {
  return (
    <PageTemplate
      pageTitle="Wie heißt ihr?"
      description="Tragt hier eure Vornamen oder Pseudonyme ein.">
      <Container>
        <Row style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '10px' }}>
          <Form.Control
            type="text"
            placeholder="Vorname"
            // value={additionalIncome}
            // onChange={(e) => {
            //   updateAdditionalIncome(
            //     monthSelected.parentid,
            //     monthSelected.monthid,
            //     e.currentTarget.value,
            //     undefined
            //   );
            // }}
          />
        </Row>
      </Container>
    </PageTemplate>
  );
};

export default nameInputPage;
