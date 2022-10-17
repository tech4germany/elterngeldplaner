import { useContext } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import { TextBold, TextNormal } from '../../components/styled/StyledText';
import EGCard from './EGCard';
import constants from '../../utils/constants.json';

const EGOverviewPage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  return (
    <PageTemplate
      pageTitle="Das könnt ihr an Elterngeld bekommen"
      description={
        <div>
          Diese Übersicht zeigt euch wieviel Elterngeld ihr pro Monat bekommen könnt. Das Elterngeld
          gibt es in drei Varianten, welche ihr individuell miteinander kombinieren.
          {/* Diese Übersicht zeigt euch wieviel Elterngeld ihr basierend auf euren vorherigen Eingaben
          erhalten könnt. In jedem Monat könnt ihr individuell entscheiden, welche der drei
          untenstehenden Elterngeld-Varianten ihr nutzen möchtet. */}
        </div>
      }>
      <Container>
        <Row>
          <EGCard variant={constants.varianten.basis.id} />
          <EGCard variant={constants.varianten.plus.id} />
          <EGCard variant={constants.varianten.bonus.id} />
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
