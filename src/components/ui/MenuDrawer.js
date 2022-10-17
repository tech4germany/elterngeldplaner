import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import { useRef, useContext, useEffect, useState } from 'react';
import { VscMenu } from 'react-icons/vsc';
import { ListGroup } from 'react-bootstrap';
import FormContext from '../../context/FormContext';

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  const [visitedPages, setVisitedPages] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
  });

  const pageNames = ['Start', 'Wie heißt ihr?', 'Planer'];

  useEffect(() => {
    setVisitedPages({ ...visitedPages, [activeStepIndex]: true });
  }, [activeStepIndex]);

  const getListGroupItems = () => {
    const listItems = [];
    for (let i = 0; i <= 2; i += 1) {
      listItems.push(
        <ListGroup.Item
          key={`listItem${i}`}
          disabled={!visitedPages[i]}
          style={{ fontWeight: activeStepIndex === i ? 'bold' : 'normal' }}
          action
          onClick={() => {
            setActiveStepIndex(i);
            onClose();
          }}>
          {pageNames[i]}
        </ListGroup.Item>
      );
    }

    return <ListGroup variant="flush">{listItems}</ListGroup>;
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menü</DrawerHeader>
          <DrawerBody>{getListGroupItems()} </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button onClick={onOpen} variant="ghost" padding="0px">
        <VscMenu style={{ width: '25px', height: 'auto' }} />
      </Button>
    </>
  );
};

export default MenuDrawer;
