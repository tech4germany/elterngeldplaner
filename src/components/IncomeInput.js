import React, { useEffect, useState } from 'react';
import {
  //   FormControl,
  FormLabel,
  Switch,
  Editable,
  EditablePreview,
  EditableInput,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Form } from 'react-bootstrap';

const IncomeInput = ({ monthSelected, egPlan, updateAdditionalIncome }) => {
  const [incomeChecked, setIncomeChecked] = useState(false);

  // TODO:
  useEffect(() => {
    // updateAdditionalIncome();
  }, [incomeChecked, monthSelected]);
  return (
    <Grid
      mt="20px"
      mb="10px"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(2, auto)"
      alignItems="center"
      rowGap={2}>
      <GridItem rowSpan={1} colSpan={1}>
        <FormLabel mb="0" fontSize="10pt" lineHeight="1.15">
          Ich habe in diesem Monat ein Einkommen
        </FormLabel>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Switch
          onChange={() => {
            setIncomeChecked(!incomeChecked);
          }}
          isChecked={incomeChecked}
        />
      </GridItem>
      {incomeChecked ? (
        <Grid templateRows="repeat(1, 1fr)" rowGap={1}>
          <GridItem rowSpan={1} colSpan={2}>
            <Form.Control
              className="d-flex"
              size="sm"
              type="number"
              placeholder="Bruttoeinkommen"
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={2} textAlign="left" lineHeight="1.15">
            <Form.Text>
              Trage dein voraussichtliches Bruttoeinkommen im ausgewählten Lebensmonat ein.
            </Form.Text>
          </GridItem>
        </Grid>
      ) : (
        <div />
      )}
    </Grid>
  );
};

export default IncomeInput;
