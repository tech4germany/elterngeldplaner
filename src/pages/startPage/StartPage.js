import React, { useContext } from 'react';
import PageTemplate from '../../components/PageTemplate';
import { TextNormal } from '../../components/styled/StyledText';
import NextButton from '../../components/ui/NextButton';
// import { FormContext } from '../../App';

const IntroductionPage = () => {
  // const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  return (
    <PageTemplate pageTitle="Der Elterngeldplaner">
      <TextNormal>
        Mit dem Elterngeldplaner könnt ihr unverbindlich euer Elterngeld berechnen und planen.
        <br />
        Er hilft euch bei der Planung der Elterngeldmonate und der Kombination von Elterngeld,
        ElterngeldPlus und dem Partnerschaftsbonus.
      </TextNormal>
      <NextButton buttonTitle="Weiter" />
    </PageTemplate>
  );
};

export default IntroductionPage;
