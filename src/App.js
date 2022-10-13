import './App.css';
import Planer from './pages/planner/Planer';
import Header from './components/ui/Header';
import IntroductionPage from './pages/startPage/IntroductionPage';

const App = () => {
  return (
    <>
      <Header />
      <Planer />
      {/* <IntroductionPage /> */}
    </>
  );
};

export default App;
