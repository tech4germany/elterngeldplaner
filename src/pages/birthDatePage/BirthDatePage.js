import { useContext } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { DateTime } from 'luxon';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import { TextNormal } from '../../components/styled/StyledText';

const BirthDatePage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      birthDate: formData.birthDate || DateTime.now().toISODate()
    },
    onSubmit: (values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      // setActiveStepIndex(activeStepIndex + 1);
    }
  });

  return (
    <PageTemplate
      pageTitle="Wann wird euer Kind voraussichtlich geboren?"
      description="Tragt hier den voraussichtlichen Geburtstermin eures Kindes ein.">
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginTop: '10px' }}>
            <Form.Control
              defaultValue={formData.birthDate ? formData.birthDate : ''}
              type="date"
              id="birthDate"
              name="birthDate"
              onChange={formik.handleChange}
            />
          </Row>

          <Row className="d-flex justify-content-between">
            <Col>
              <NavigationButton // TODO: submit?
                buttonTitle="Zurück"
                nextPage={activeStepIndex - 1}
                isSecondary
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

export default BirthDatePage;
