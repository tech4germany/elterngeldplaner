import './App.css';
import { FormikContext } from 'formik';
import { useState, createContext, useMemo, useEffect } from 'react';
import Planner from './pages/planner/Planner';
import Header from './components/ui/Header';
import NameInputPage from './pages/nameInputPage/NameInputPage';
import StartPage from './pages/startPage/StartPage';

export const FormContext = createContext();

const App = () => {
  const [currentPage, setCurrentPage] = useState(<StartPage />);
  const [activeStepIndex, setActiveStepIndex] = useState(2);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    switch (activeStepIndex) {
      case 0:
        setCurrentPage(<StartPage />);
        break;
      case 1:
        setCurrentPage(<NameInputPage />);
        break;
      case 2:
        setCurrentPage(<Planner />);
        break;
      default:
        setCurrentPage(<StartPage />);
        break;
    }
  }, [activeStepIndex]);

  const formContextValue = useMemo(
    () => ({
      activeStepIndex,
      setActiveStepIndex,
      formData,
      setFormData
    }),
    [activeStepIndex, setActiveStepIndex, formData, setFormData]
  );

  return (
    <FormContext.Provider value={formContextValue}>
      <Header />
      {/* <Planer /> */}
      {/* <IntroductionPage /> */}
      {currentPage}
    </FormContext.Provider>
  );
};

export default App;
