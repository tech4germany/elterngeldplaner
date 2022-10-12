import React from 'react';
import {
  FormControl,
  FormLabel,
  Switch,
  Editable,
  EditablePreview,
  EditableInput,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Form } from 'react-bootstrap';

const IncomeInput = () => {
  return (
    <Grid
      mt="20px"
      mb="10px"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(2, auto)"
      alignItems="center"
      rowGap={2}>
      <GridItem rowSpan={1} colSpan={1}>
        <FormLabel mb="0" fontSize="10pt" lineHeight="1.15">
          Ich habe in diesem Monat ein Einkommen
        </FormLabel>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Switch id="email-alerts" />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Form.Control className="d-flex" size="sm" type="text" placeholder="Bruttoeinkommen" />
        {/* <div>Trage dein voraussichtliches Bruttoeinkommen im ausgewählten Lebensmonat ein.</div> */}
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} textAlign="left" lineHeight="1.15">
        <Form.Text>
          Trage dein voraussichtliches Bruttoeinkommen im ausgewählten Lebensmonat ein.
        </Form.Text>
      </GridItem>
    </Grid>
  );
};

export default IncomeInput;
