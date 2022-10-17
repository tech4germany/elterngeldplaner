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
import { useRef, useContext } from 'react';
import { VscMenu } from 'react-icons/vsc';
import { ListGroup } from 'react-bootstrap';
import FormContext from '../../context/FormContext';

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menü</DrawerHeader>
          <DrawerBody>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                onClick={() => {
                  setActiveStepIndex(0);
                  onClose();
                }}>
                Start
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => {
                  setActiveStepIndex(1);
                  onClose();
                }}>
                Wie heißt ihr?
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => {
                  setActiveStepIndex(2);
                  onClose();
                }}>
                Planer
              </ListGroup.Item>
            </ListGroup>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button onClick={onOpen} variant="ghost" padding="0px">
        <VscMenu style={{ width: '25px', height: 'auto' }} />
      </Button>
    </>
  );
};

export default MenuDrawer;
