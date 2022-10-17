import { useContext } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import { TextNormal } from '../../components/styled/StyledText';

const NameInputPage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      vornamen_elternteil: {
        0: formData.vornamen_elternteil ? formData.vornamen_elternteil['0'] : 'Elternteil 1',
        1: formData.vornamen_elternteil ? formData.vornamen_elternteil['1'] : 'Elternteil 2'
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
      pageTitle="Wie heißt ihr?"
      description="Tragt hier eure Vornamen oder Pseudonyme ein.">
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <TextNormal>Name von Elternteil 1</TextNormal>
            </Form.Label>

            <Form.Control
              // value={formik.values.vornamen_elternteil['0']}
              defaultValue={formData.vornamen_elternteil ? formData.vornamen_elternteil['0'] : ''}
              type="text"
              id="vornamen_elternteil['0']"
              name="vornamen_elternteil['0']"
              placeholder="Vorname"
              onChange={formik.handleChange}
              // value={formData.vornamen_elternteil ? formData.vornamen_elternteil['1'] : ''}
              // value={formik.values.vornamen_elternteil['1']} // TODO: standardmäßig elternteil 1 /2
            />
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Form.Label>
              <TextNormal>Elternteil 2</TextNormal>
            </Form.Label>
            <Form.Control
              // value={formik.values.vornamen_elternteil['1']}
              defaultValue={formData.vornamen_elternteil ? formData.vornamen_elternteil['1'] : ''}
              type="text"
              id="vornamen_elternteil['1']"
              name="vornamen_elternteil['1']"
              placeholder="Vorname"
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

export default NameInputPage;
