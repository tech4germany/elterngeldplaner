import { useContext } from 'react';

import { Button } from '@chakra-ui/react';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import { TextNormal, TextBold } from '../../components/styled/StyledText';
import NavigationButton from '../../components/ui/NavigationButton';

const FinalSummeryPage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      //   console.log('Congrats! Your browser supports Web Share API');
      navigator
        .share({
          url: `https://share.toogoodtogo.com/store/1006/milestones/meals-saved/`
        })
        .then(() => {
          console.log('Sharing successfull');
        })
        .catch(() => {
          console.log('Sharing failed');
        });
    } else {
      console.log('Sorry! Your browser does not support Web Share API');
    }
  };
  return (
    <PageTemplate pageTitle="Zusammenfassung eurer Planung">
      <Button onClick={handleShareButton}>Teilen</Button>

      <NavigationButton
        buttonTitle="Zurück zur Planung"
        nextPage={activeStepIndex - 1}
        buttonVariant="outline"
      />
    </PageTemplate>
  );
};

export default FinalSummeryPage;
