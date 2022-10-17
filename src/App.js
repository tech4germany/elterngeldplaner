import './App.css';
import { FormikContext } from 'formik';
import { useState, createContext, useContext, useEffect } from 'react';
import Planner from './pages/planner/Planner';
import Header from './components/ui/Header';
import NameInputPage from './pages/nameInputPage/NameInputPage';
import StartPage from './pages/startPage/StartPage';
import FormContext from './context/FormContext';

const App = () => {
  const [currentPage, setCurrentPage] = useState(<StartPage />);
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

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

  return (
    <>
      <Header />
      {/* <Planer /> */}
      {/* <IntroductionPage /> */}
      {currentPage}
    </>
  );
};

export default App;
