import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure
} from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import { LargeTitleSpan } from '../../components/styled/StyledText';
import constants from '../../utils/constants.json';
import BasisDescription from './BasisDescription';
import PlusDescription from './PlusDescription';
import BonusDescription from './BonusDescription';
import icons from '../../utils/icons';

const DescriptionDrawer = ({ variant, children }) => {
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
      {children}
      <Button
        style={{ padding: '0px' }}
        color="gray.600" // TODO
        backgroundColor="transparent"
        onClick={() => handleClick()}>
        <IoIosArrowForward
          style={{
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
            <img
              src={icons[variant]}
              alt="Basis Icon"
              width="21px"
              height="auto"
              style={{
                float: 'left',
                verticalAlign: 'bottom',
                top: '7px',
                marginRight: '10px',
                position: 'relative'
              }}
            />
            {getVariantTitle()}
          </DrawerHeader>
          <DrawerBody>{getVariantDescription()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DescriptionDrawer;
