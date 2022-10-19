import { useContext } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import {
  TextBasis,
  TextBold,
  TextPlus,
  TextNormal,
  TextBonus,
  TextSmall
} from '../../components/styled/StyledText';
import EGCard from './EGCard';
import constants from '../../utils/constants.json';

const EGOverviewPage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  return (
    <PageTemplate
      // pageTitle="Das könnt ihr an Elterngeld bekommen"
      pageTitle="Euer voraussichtliches Elterngeld"
      description="Diese Übersicht zeigt euch wieviel Elterngeld ihr pro Monat bekommen könnt. Das Elterngeld
          gibt es in drei Varianten, welche ihr individuell miteinander kombinieren könnt.">
      <Container>
        <Row>
          <EGCard
            variant={constants.varianten.basis.id}
            title={
              <>
                <TextBasis>Basis</TextBasis>
                <TextBold>elterngeld</TextBold>
                <div>
                  <TextSmall style={{ marginTop: '2px' }}>
                    Für bis zu 14 Monate, die die Eltern untereinander aufteilen können.
                  </TextSmall>
                </div>
              </>
            }
          />
          <EGCard
            variant={constants.varianten.plus.id}
            title={
              <>
                <TextBold>Elterngeld</TextBold>
                <TextPlus>Plus</TextPlus>
                <div>
                  <TextSmall style={{ marginTop: '2px' }}>
                    2 Monate ElterngeldPlus im Tausch gegen einen Monat Basiselterngeld.
                  </TextSmall>
                </div>
              </>
            }
          />
          <EGCard
            variant={constants.varianten.bonus.id}
            title={
              <>
                <TextBold>Partnerschafts</TextBold>
                <TextBonus>Bonus</TextBonus>
                <div>
                  <TextSmall style={{ marginTop: '2px' }}>
                    2, 3 oder 4 zusätzliche ElterngeldPlus-Monate für jedes Elternteil.
                  </TextSmall>
                </div>
              </>
            }
          />
        </Row>

        <Row className="d-flex justify-content-between">
          <Col>
            <NavigationButton // TODO: submit?
              buttonTitle="Zurück"
              nextPage={activeStepIndex - 1}
              buttonVariant="outline"
            />
          </Col>
          <Col>
            <NavigationButton buttonTitle="Weiter" nextPage={activeStepIndex + 1} />
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

export default EGOverviewPage;
