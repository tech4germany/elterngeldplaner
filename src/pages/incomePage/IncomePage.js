import { useContext } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import { NormalTextBold } from '../../components/styled/StyledText';

const IncomePage = () => {
  const { activeStepIndex, formData, setFormData } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      income_parent: {
        0: formData.income_parent ? formData.income_parent['0'] : 0,
        1: formData.income_parent ? formData.income_parent['1'] : 0
      }
    },
    onSubmit: (values) => {
      const data = { ...formData, ...values };
      setFormData(data);
    }
  });

  return (
    <PageTemplate
      pageTitle="Was war euer Einkommen?"
      description={
        <>
          <p>Die Höhe eures Elterngelds richtet sich nach eurem individuellen Einkommen. </p>{' '}
          <p style={{ marginTop: '10px' }}>
            Gebt euer durchschnittliches monatliches Nettoeinkommen aus den letzten 12 Monaten vor
            der Geburt (bei nicht-selbstständiger Arbeit) bzw. aus dem letzten Kalenderjahr (bei
            selbstständiger Arbeit) an.
          </p>
        </>
      }>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <NormalTextBold>Einkommen von {formData.names_parent['0']}</NormalTextBold>
            </Form.Label>

            <Form.Control
              defaultValue={formData.income_parent ? formData.income_parent['0'] : ''}
              type="number"
              id="income_parent['0']"
              name="income_parent['0']"
              placeholder="Monatl. Nettoeinkommen in €"
              onChange={formik.handleChange}
            />
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <NormalTextBold>Einkommen von {formData.names_parent['1']}</NormalTextBold>
            </Form.Label>
            <Form.Control
              defaultValue={formData.income_parent ? formData.income_parent['1'] : ''}
              type="number"
              id="income_parent['1']"
              name="income_parent['1']"
              placeholder="Monatl. Nettoeinkommen in €"
              onChange={formik.handleChange}
            />
          </Row>
          <Row className="d-flex justify-content-between">
            <Col>
              <NavigationButton buttonTitle="Zurück" nextPage={activeStepIndex - 1} isSecondary />
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
