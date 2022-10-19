import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { AiFillDownCircle } from 'react-icons/ai';
import { Card } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import {
  LargeTitle,
  LargeTitleSpan,
  TextBold,
  TextNormal
} from '../../components/styled/StyledText';
import constants from '../../utils/constants.json';
import BasisDescription from './BasisDescription';
import PlusDescription from './PlusDescription';
import BonusDescription from './BonusDescription';

const DescriptionDrawer = ({ variant }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  const getVariantDescription = () => {
    switch (variant) {
      case constants.varianten.basis.id:
        return <BasisDescription />;
      case constants.varianten.plus.id:
        return <PlusDescription />;
      case constants.varianten.bonus.id:
        return <BonusDescription />;
      default:
        return [];
    }
  };

  const getVariantTitle = () => {
    switch (variant) {
      case constants.varianten.basis.id:
        return (
          <>
            <LargeTitleSpan color={constants.varianten.basis.colorActivated}>Basis</LargeTitleSpan>
            <LargeTitleSpan>elterngeld</LargeTitleSpan>
          </>
        );
      case constants.varianten.plus.id:
        return (
          <>
            <LargeTitleSpan>Elterngeld</LargeTitleSpan>
            <LargeTitleSpan color={constants.varianten.plus.colorActivated}>Plus</LargeTitleSpan>
          </>
        );
      case constants.varianten.bonus.id:
        return (
          <>
            <LargeTitleSpan>Partnerschafts</LargeTitleSpan>
            <LargeTitleSpan color={constants.varianten.bonus.colorActivated}>bonus</LargeTitleSpan>
          </>
        );
      default:
        return [];
    }
  };

  return (
    <>
      <Button
        // height="20px"
        style={{ padding: '0px' }}
        color="gray.600" // TODO
        backgroundColor="transparent"
        onClick={() => handleClick()}>
        <IoIosArrowForward
          style={{
            // marginRight: '5px',
            // transform: 'rotate(-90deg)',
            width: '20px',
            height: 'auto'
          }}
        />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {getVariantTitle()}
            {/* <LargeTitle>{constants.varianten[variant].fullname}</LargeTitle> */}
          </DrawerHeader>
          <DrawerBody>
            {getVariantDescription()}
            {/* <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>
                  <TextBold> Zusammenfassung </TextBold>
                </Card.Title>
                <Card.Text>
                  <TextNormal>
                    <UnorderedList>
                      <ListItem>Euch stehen gemeinsam bis zu 14 Monate Basiselterngeld zu</ListItem>
                      <ListItem>
                        Ein Elternteil kann mind. 2 Monate und max. 12 Monate in Anspruch nehmen
                      </ListItem>
                      <ListItem>
                        Basiselterngeld kann nur bis zum 14. Lebensmonat genutzt werden
                      </ListItem>
                    </UnorderedList>
                  </TextNormal>
                </Card.Text>
              </Card.Body>
            </Card>
            <TextBold>Bezugsdauer und -zeitpunkt</TextBold>
            <TextNormal>
              Wenn beide Elternteile mind. 2 Monate Elterngeld beziehen, bekommt ihr ein gemeinsames
              Kontingent an 14 Monaten Basiselterngeld, andernfalls sind es 12 Monate.
              Basiselterngeld kann nur in den ersten 14 Lebensmonaten bezogen werden, danach ist nur
              noch ElterngeldPlus und PartnerschaftsBonus möglich.
            </TextNormal>
            <TextBold>Berechnung</TextBold>
            <TextNormal>tbd</TextNormal> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DescriptionDrawer;
