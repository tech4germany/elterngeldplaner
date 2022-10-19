import { useContext, useEffect, useState } from 'react';

import { Button } from '@chakra-ui/react';
import { Card } from 'react-bootstrap';
import { IoLink } from 'react-icons/io5';
import FormContext from '../../context/FormContext';
import PageTemplate from '../../components/PageTemplate';
import { TextNormal, TextBold } from '../../components/styled/StyledText';
import NavigationButton from '../../components/ui/NavigationButton';
import constants from '../../utils/constants.json';

const BASIS = constants.varianten.basis.id;
const PLUS = constants.varianten.plus.id;
const BONUS = constants.varianten.bonus.id;
const NONE = constants.varianten.none.id;

const FinalSummeryPage = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  const [emojiText, setEmojiText] = useState('');
  const numberEmojis = [
    '0️⃣1️⃣',
    '0️⃣2️⃣',
    '0️⃣3️⃣',
    '0️⃣4️⃣',
    '0️⃣5️⃣',
    '0️⃣6️⃣',
    '0️⃣7️⃣',
    '0️⃣8️⃣',
    '0️⃣9️⃣',
    '1️⃣0️⃣',
    '1️⃣1️⃣',
    '1️⃣2️⃣',
    '1️⃣3️⃣',
    '1️⃣4️⃣',
    '1️⃣5️⃣',
    '1️⃣6️⃣',
    '1️⃣7️⃣',
    '1️⃣8️⃣',
    '1️⃣9️⃣',
    '2️⃣0️⃣',
    '2️⃣1️⃣',
    '2️⃣2️⃣',
    '2️⃣3️⃣',
    '2️⃣4️⃣',
    '2️⃣5️⃣',
    '2️⃣6️⃣',
    '2️⃣7️⃣',
    '2️⃣8️⃣',
    '2️⃣9️⃣',
    '3️⃣0️⃣',
    '3️⃣1️⃣',
    '3️⃣2️⃣'
  ];
  // 🟪🟩🟦⬛🟨🟥🟧⬜
  const getEmojiText = (lastMonth) => {
    let newEmojiText = [];
    const textBefore =
      `Hier ist unsere Planung für das Elterngeld: \n \n${formData.names_parent[0]} | ${formData.names_parent[1]}` +
      '\n';

    let newEmojis = [];
    for (let i = 0; i <= Math.max(lastMonth, 11); i += 1) {
      const newLine = [];
      for (let j = 0; j < formData.egPlan.length; j += 1) {
        switch (formData.egPlan[j].months[i].variant) {
          case BASIS:
            newLine.push('🟩');
            break;
          case PLUS:
            newLine.push('🟪');
            break;
          case BONUS:
            newLine.push('🟥');
            break;
          case NONE:
            newLine.push('⬜');
            break;
          default:
        }
      }
      newEmojis = [...newEmojis, newLine.join(numberEmojis[i])];
    }

    const textAfter = '';
    // const textAfter = '\nUnter diesem Link kann der Plan weiter bearbeitet werden: xxx';

    newEmojiText = textBefore + newEmojis.join('\n') + textAfter;

    return newEmojiText;
  };

  useEffect(() => {
    let lastMonth = 0;

    const getLastMonth = (parentid) => {
      for (let j = formData.egPlan[parentid].months.length - 1; j >= 0; j -= 1) {
        if (formData.egPlan[parentid].months[j].variant !== NONE) {
          return j;
        }
      }
      return 0;
    };

    for (let i = 0; i < formData.egPlan.length; i += 1) {
      const lastMonthParent = getLastMonth(i);
      if (lastMonth === undefined || lastMonthParent > lastMonth) {
        lastMonth = lastMonthParent;
      }
    }

    setEmojiText(getEmojiText(lastMonth));
  }, [formData.egPlan]);

  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      //   console.log('Congrats! Your browser supports Web Share API');
      navigator
        .share({
          text: emojiText
        })
        .then(() => {
          console.log(`Sharing successfull: ${emojiText}`);
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
      <Card style={{ backgroundColor: constants.varianten.none.colorDeactivated }} border="0">
        <Card.Body>
          <Card.Title>
            <TextBold> Planungsstand teilen und speichern </TextBold>
          </Card.Title>
          <TextNormal>
            <span
              role="presentation"
              onClick={handleShareButton}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '10.5pt',
                color: '#1E90FF',
                marginBottom: '10px'
              }}>
              <IoLink style={{ width: '25px', height: 'auto', marginRight: '10px' }} />
              Link zum Planungsstand
            </span>
            Mit dem Link kannst du diese Version deiner Planung jederzeit wieder öffnen oder deine
            Planung mit anderen Teilen.
          </TextNormal>
        </Card.Body>
      </Card>
      <NavigationButton
        buttonTitle="Zurück zur Planung"
        nextPage={activeStepIndex - 1}
        // buttonVariant="outline"
        isSecondary
      />
    </PageTemplate>
  );
};

export default FinalSummeryPage;
