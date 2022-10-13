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
  const [incomeChecked, setIncomeChecked] = useState();
  const [additionalIncome, setAdditionalIncome] = useState();

  useEffect(() => {
    setIncomeChecked(egPlan[monthSelected.parentid].months[monthSelected.monthid].incomeChecked);
  }, [egPlan[monthSelected.parentid].months[monthSelected.monthid].incomeChecked]);

  useEffect(() => {
    setAdditionalIncome(
      egPlan[monthSelected.parentid].months[monthSelected.monthid].additionalIncome
    );
  }, [egPlan[monthSelected.parentid].months[monthSelected.monthid].additionalIncome]);

  const switchIncomeChecked = () => {
    const currentIncomeChecked =
      egPlan[monthSelected.parentid].months[monthSelected.monthid].incomeChecked;
    updateAdditionalIncome(
      monthSelected.parentid,
      monthSelected.monthid,
      undefined,
      !currentIncomeChecked
    );
  };

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
            switchIncomeChecked();
          }}
          isChecked={incomeChecked}
        />
      </GridItem>
      {egPlan[monthSelected.parentid].months[monthSelected.monthid].incomeChecked ? (
        <Grid templateRows="repeat(1, 1fr)" rowGap={1}>
          <GridItem rowSpan={1} colSpan={2}>
            <Form.Control
              className="d-flex"
              size="sm"
              type="number"
              placeholder="Bruttoeinkommen"
              value={additionalIncome}
              onChange={(e) => {
                updateAdditionalIncome(
                  monthSelected.parentid,
                  monthSelected.monthid,
                  e.currentTarget.value,
                  undefined
                );
              }}
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
