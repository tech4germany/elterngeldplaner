import './App.css';
import { FormikContext } from 'formik';
import { useState, createContext, useContext, useEffect } from 'react';
import Planner from './pages/planner/Planner';
import Header from './components/ui/Header';
import NameInputPage from './pages/nameInputPage/NameInputPage';
import StartPage from './pages/startPage/StartPage';
import FormContext from './context/FormContext';
import BirthDatePage from './pages/birthDatePage/BirthDatePage';
import IncomePage from './pages/incomePage/IncomePage';
import EGOverviewPage from './pages/egOverview/EGOverviewPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(<StartPage />);
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  const pageNames = [
    'Start',
    'Wie heißt ihr?',
    'Geburtsdatum eures Kindes',
    'Euer Einkommen',
    'Planer'
  ];

  useEffect(() => {
    switch (activeStepIndex) {
      case 0:
        setCurrentPage(<StartPage />);
        break;
      case 1:
        setCurrentPage(<NameInputPage />);
        break;
      case 2:
        setCurrentPage(<BirthDatePage />);
        break;
      case 3:
        setCurrentPage(<IncomePage />);
        break;
      case 4:
        setCurrentPage(<EGOverviewPage />);
        break;
      case 5:
        setCurrentPage(<Planner />);
        break;
      default:
        setCurrentPage(<StartPage />);
        break;
    }
  }, [activeStepIndex]);

  return (
    <>
      <Header pageNames={pageNames} />
      {/* <Planer /> */}
      {/* <IntroductionPage /> */}
      {currentPage}
    </>
  );
};

export default App;
