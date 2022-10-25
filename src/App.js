import './App.css';
import { useState, useContext, useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import Planner from './pages/planner/Planner';
import Header from './components/ui/Header';
import NameInputPage from './pages/nameInputPage/NameInputPage';
import StartPage from './pages/startPage/StartPage';
import FormContext from './context/FormContext';
import BirthDatePage from './pages/birthDatePage/BirthDatePage';
import IncomePage from './pages/incomePage/IncomePage';
import EGOverviewPage from './pages/egOverview/EGOverviewPage';
import FinalSummeryPage from './pages/finalSummeryPage/FinalSummeryPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(<StartPage />);
  const { activeStepIndex } = useContext(FormContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const pageNames = [
    'Start',
    'Wie heißt ihr?',
    'Geburtsdatum eures Kindes',
    'Euer Einkommen',
    'Berechnetes Elterngeld',
    'Planer',
    'Zusammenfassung eurer Planung'
  ];

  const desktopAlertDialog = (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Das ist eine mobile Anwendung</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Dieser Prototyp wurde bisher nur für Mobilgeräte umgesetzt. <br /> Bitte besuche die Seite
          auf deinem Mobilgerät für die beste User Experience :)
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="red" ml={3} ref={cancelRef} onClick={onClose}>
            Okay
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const handleResize = () => {
    if (window.innerWidth > 768) {
      // open alert dialog when user is on desktop
      onOpen();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize());
    return () => {
      window.removeEventListener('resize', handleResize());
    };
  }, []);

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
      case 6:
        setCurrentPage(<FinalSummeryPage />);
        break;
      default:
        setCurrentPage(<StartPage />);
        break;
    }
  }, [activeStepIndex]);

  return (
    <>
      {desktopAlertDialog}
      <Header pageNames={pageNames} />
      {currentPage}
    </>
  );
};

export default App;
