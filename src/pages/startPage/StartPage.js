import React, { useContext } from 'react';
import PageTemplate from '../../components/PageTemplate';
import { NormalText, NormalTextBold } from '../../components/styled/StyledText';
import NavigationButton from '../../components/ui/NavigationButton';
import FormContext from '../../context/FormContext';
import constants from '../../utils/constants.json';
import icons from '../../utils/icons';

const StartPage = () => {
  // const iconImgs = {
  //   basis: (
  //     <img
  //       src={icons.basis}
  //       alt="Basis Icon"
  //       width="14px"
  //       height="auto"
  //       style={{
  //         display: 'inline',
  //         // float: 'left',
  //         verticalAlign: 'baseline',
  //         marginRight: '5px',
  //         position: 'relative'
  //       }}
  //     />
  //   ),
  //   plus: (
  //     <img
  //       src={icons.plus}
  //       alt="Basis Icon"
  //       width="14px"
  //       height="auto"
  //       style={{
  //         float: 'left',
  //         verticalAlign: 'bottom',
  //         top: '5px',
  //         marginRight: '5px',
  //         position: 'relative'
  //       }}
  //     />
  //   ),
  //   bonus: (
  //     <img
  //       src={icons.bonus}
  //       alt="Basis Icon"
  //       width="14px"
  //       height="auto"
  //       style={{
  //         float: 'left',
  //         verticalAlign: 'bottom',
  //         top: '5px',
  //         marginRight: '5px',
  //         position: 'relative'
  //       }}
  //     />
  //   )
  // };
  const { activeStepIndex } = useContext(FormContext);
  return (
    <PageTemplate pageTitle="Der Elterngeldplaner">
      <NormalTextBold>
        Dieser Elterngeldplaner ist ein Prototyp des Tech4Germany Fellowships 2022. Alle Angaben und
        Ergebnisse sind daher nicht auf Richtigkeit geprüft.
      </NormalTextBold>
      <NormalText style={{ marginTop: '10px' }}>
        <p>
          Mit dem Elterngeldplaner könnt ihr unverbindlich euer Elterngeld berechnen und planen,
          wann ihr welche Elterngeld-Variante bekommen möchtet.
        </p>
        <p style={{ marginTop: '10px' }}>
          Ihr könnt ausprobieren, wie sich{' '}
          <NormalTextBold color={constants.varianten.basis.colorActivated}>Basis</NormalTextBold>
          <NormalTextBold>elterngeld</NormalTextBold>, <NormalTextBold>Elterngeld</NormalTextBold>
          <NormalTextBold color={constants.varianten.plus.colorActivated}>Plus </NormalTextBold>
          und <NormalTextBold>Partnerschafts</NormalTextBold>
          <NormalTextBold color={constants.varianten.bonus.colorActivated}>
            bonus
          </NormalTextBold>{' '}
          für euch am sinnvollsten kombinieren lässt und wie hoch die jeweiligen Beträge
          voraussichtlich sein werden.
        </p>
      </NormalText>

      <NavigationButton buttonTitle="Start" type="submit" nextPage={activeStepIndex + 1} />
    </PageTemplate>
  );
};

export default StartPage;
