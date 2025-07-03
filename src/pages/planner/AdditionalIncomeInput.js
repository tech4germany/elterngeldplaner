import React, { useEffect, useState, useContext } from 'react';
import { FormLabel, Switch, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Form } from 'react-bootstrap';
import { NormalText } from '../../components/styled/StyledText';

import FormContext from '../../context/FormContext';

const AdditionalIncomeInput = ({ monthSelected, egPlan, updateAdditionalIncome }) => {
  const [incomeChecked, setIncomeChecked] = useState(false);
  const [additionalIncome, setAdditionalIncome] = useState(0);
  const { formData } = useContext(FormContext);

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
      additionalIncome, // TODO:
      !currentIncomeChecked
    );
  };

  const handleIncomeInputChange = (e) => {
    updateAdditionalIncome(
      monthSelected.parentid,
      monthSelected.monthid,
      parseInt(e.currentTarget.value === '' ? 0 : e.currentTarget.value, 10),
      incomeChecked // TODO:
    );
  };

  return (
    <Grid mt="20px" mb="10px" templateColumns="repeat(2, 1fr)" alignItems="center" rowGap={1}>
      <GridItem colSpan={2} marginBottom="5px" marginTop="5px">
        <Flex>
          <FormLabel mb="0">
            <NormalText style={{ lineHeight: '1.25' }}>
              {formData.names_parent[monthSelected.parentid]} hat in diesem Monat ein Einkommen
            </NormalText>
          </FormLabel>
          {/* <Spacer /> */}
          <Switch
            size="md"
            onChange={() => {
              switchIncomeChecked();
            }}
            isChecked={incomeChecked}
          />
        </Flex>
      </GridItem>
      {egPlan[monthSelected.parentid].months[monthSelected.monthid].incomeChecked ? (
        <>
          <GridItem colSpan={2}>
            <Form.Control
              className="d-flex"
              size="md"
              type="number"
              placeholder="Nettoeinkommen"
              value={additionalIncome === 0 ? '' : additionalIncome}
              onChange={(e) => handleIncomeInputChange(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
            />
          </GridItem>
          <GridItem colSpan={2} textAlign="left" lineHeight="1.15" marginTop="5px">
            <Form.Text>Trage das vsl. Einkommen für diesen Lebensmonat ein.</Form.Text>
          </GridItem>
        </>
      ) : (
        []
      )}
    </Grid>
  );
};

export default AdditionalIncomeInput;
