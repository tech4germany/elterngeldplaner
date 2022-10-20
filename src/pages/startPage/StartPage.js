import React, { useContext } from 'react';
import PageTemplate from '../../components/PageTemplate';
import {
  TextNormal,
  TextBasis,
  TextPlus,
  TextBonus,
  TextBold
} from '../../components/styled/StyledText';
import NavigationButton from '../../components/ui/NavigationButton';
import FormContext from '../../context/FormContext';

const StartPage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  return (
    <PageTemplate pageTitle="Der Elterngeldplaner">
      <TextBold>
        Dieser Elterngeldplaner ist ein Prototyp des Tech4Germany Fellowships 2022. Alle Angaben und
        Ergebnisse sind daher nicht auf Richtigkeit geprüft.
      </TextBold>
      <TextNormal style={{ marginTop: '10px' }}>
        <p>
          Mit dem Elterngeldplaner könnt ihr unverbindlich euer Elterngeld berechnen und planen,
          wann ihr welche Elterngeld-Variante bekommen möchtet.
        </p>
        <p style={{ marginTop: '10px' }}>
          Ihr könnt ausprobieren, wie sich <TextBasis>Basis</TextBasis>
          <TextBold>elterngeld</TextBold>, <TextBold>Elterngeld</TextBold>
          <TextPlus>Plus </TextPlus>
          und <TextBold>Partnerschafts</TextBold>
          <TextBonus>bonus</TextBonus> für euch am sinnvollsten kombinieren lässt und wie hoch die
          jeweiligen Beträge voraussichtlich sein werden.
        </p>
      </TextNormal>

      <NavigationButton buttonTitle="Start" type="submit" nextPage={activeStepIndex + 1} />
    </PageTemplate>
  );
};

export default StartPage;
