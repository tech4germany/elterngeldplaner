import { useContext } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import { NormalText } from '../../components/styled/StyledText';

const NameInputPage = () => {
  const { activeStepIndex, formData, setFormData } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      names_parent: {
        0: formData.names_parent ? formData.names_parent['0'] : 'Elternteil 1',
        1: formData.names_parent ? formData.names_parent['1'] : 'Elternteil 2'
      }
    },
    onSubmit: (values) => {
      const data = { ...formData, ...values };
      setFormData(data);
    }
  });

  return (
    <PageTemplate
      pageTitle="Wie heißt ihr?"
      description="Tragt hier eure Vornamen oder Pseudonyme ein.">
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <NormalText>Name von Elternteil 1</NormalText>
            </Form.Label>

            <Form.Control
              defaultValue={formData.names_parent ? formData.names_parent['0'] : ''}
              type="text"
              id="names_parent['0']"
              name="names_parent['0']"
              placeholder="Vorname"
              onChange={formik.handleChange}
            />
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <NormalText>Name von Elternteil 2</NormalText>
            </Form.Label>
            <Form.Control
              defaultValue={formData.names_parent ? formData.names_parent['1'] : ''}
              type="text"
              id="names_parent['1']"
              name="names_parent['1']"
              placeholder="Vorname"
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

export default NameInputPage;
