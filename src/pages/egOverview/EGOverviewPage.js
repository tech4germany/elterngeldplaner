import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import NavigationButton from '../../components/ui/NavigationButton';
import { NormalTextBold, SmallText } from '../../components/styled/StyledText';
import EGCard from './EGCard';
import icons from '../../utils/icons';
import constants from '../../utils/constants.json';

const EGOverviewPage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  return (
    <PageTemplate
      pageTitle="Euer voraussichtliches Elterngeld"
      description="Diese Übersicht zeigt euch wieviel Elterngeld ihr pro Monat bekommen könnt. Das Elterngeld
          gibt es in drei Varianten, welche ihr individuell miteinander kombinieren könnt.">
      <Container>
        <Row>
          <EGCard
            variant={constants.varianten.basis.id}
            title={
              <>
                {/* <img
                  src={icons.basis}
                  alt="Basis Icon"
                  width="14px"
                  height="auto"
                  style={{
                    float: 'left',
                    verticalAlign: 'bottom',
                    top: '5px',
                    marginRight: '5px',
                    position: 'relative'
                  }}
                /> */}
                <NormalTextBold color={constants.varianten.basis.colorActivated}>
                  Basis
                </NormalTextBold>
                <NormalTextBold>elterngeld</NormalTextBold>
              </>
            }
            shortDescription={
              <div>
                <SmallText style={{ marginTop: '2px' }}>
                  Für bis zu 14 Monate, die die Eltern untereinander aufteilen können.
                </SmallText>
              </div>
            }
          />
          <EGCard
            variant={constants.varianten.plus.id}
            title={
              <>
                <NormalTextBold>Elterngeld</NormalTextBold>
                <NormalTextBold color={constants.varianten.plus.colorActivated}>
                  Plus
                </NormalTextBold>
                <div>
                  <SmallText style={{ marginTop: '2px' }}>
                    2 Monate ElterngeldPlus im Tausch gegen einen Monat Basiselterngeld.
                  </SmallText>
                </div>
              </>
            }
          />
          <EGCard
            variant={constants.varianten.bonus.id}
            title={
              <>
                <NormalTextBold>Partnerschafts</NormalTextBold>
                <NormalTextBold color={constants.varianten.bonus.colorActivated}>
                  bonus
                </NormalTextBold>
                <div>
                  <SmallText style={{ marginTop: '2px' }}>
                    2, 3 oder 4 zusätzliche ElterngeldPlus-Monate für jedes Elternteil.
                  </SmallText>
                </div>
              </>
            }
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
      </Container>
    </PageTemplate>
  );
};

export default EGOverviewPage;
