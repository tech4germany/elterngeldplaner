import { useContext } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import { TextBold, TextNormal } from '../../components/styled/StyledText';

const IncomePage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      income_parent: {
        0: '0',
        1: '0'
      }
    },
    onSubmit: (values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      // setActiveStepIndex(activeStepIndex + 1);
    }
  });

  return (
    <PageTemplate
      pageTitle="Was war euer Einkommen?"
      description={
        <>
          <p>Die Höhe eures Elterngelds richtet sich nach eurem individuellen Einkommen. </p>{' '}
          <p style={{ marginTop: '10px' }}>
            Gebt euer durchschnittliches monatliches Bruttoeinkommen aus den letzten 12 Monaten vor
            der Geburt (bei nicht-selbstständiger Arbeit) bzw. aus dem letzten Kalenderjahr (bei
            selbständiger Arbeit) an.
          </p>
        </>
      }>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <TextBold>Einkommen von {formData.vornamen_elternteil['0']}</TextBold>
              {/* <TextNormal>Durchschnittliches Bruttoeinkommen pro Monat</TextNormal> */}
            </Form.Label>

            <Form.Control
              defaultValue={formData.income_parent ? formData.income_parent['0'] : ''}
              type="number"
              id="income_parent['0']"
              name="income_parent['0']"
              placeholder="Monatl. Bruttoeinkommen in €"
              onChange={formik.handleChange}
              // value={formData.vornamen_elternteil ? formData.vornamen_elternteil['1'] : ''}
              // value={formik.values.vornamen_elternteil['1']} // TODO: standardmäßig elternteil 1 /2
            />
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <TextBold>Einkommen von {formData.vornamen_elternteil['1']}</TextBold>
            </Form.Label>
            <Form.Control
              defaultValue={formData.income_parent ? formData.income_parent['1'] : ''}
              type="number"
              id="income_parent['1']"
              name="income_parent['1']"
              placeholder="Monatl. Bruttoeinkommen in €"
              onChange={formik.handleChange}
              // value={formData.vornamen_elternteil ? formData.vornamen_elternteil['2'] : ''}
              // value={formik.values.vornamen_elternteil['2']} // TODO: formData vornamen (wenn vorher schon eingegeben und dann auf zurück geklickt wird)
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
        </Form>
      </Container>
    </PageTemplate>
  );
};

export default IncomePage;
