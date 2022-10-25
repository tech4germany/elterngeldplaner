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

const MenuDrawer = ({ pageNames }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  const [visitedPages, setVisitedPages] = useState(new Set()); // TODO: dynamisch machen

  useEffect(() => {
    const newVisitedPages = new Set(visitedPages);
    setVisitedPages(newVisitedPages.add(activeStepIndex));
  }, [activeStepIndex]);

  const getListGroupItems = () => {
    const listItems = [];
    for (let i = 0; i <= 6; i += 1) {
      listItems.push(
        <ListGroup.Item
          key={`listItem${i}`}
          disabled={!visitedPages.has(i)}
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
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>{getListGroupItems()} </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button onClick={onOpen} variant="ghost" padding="0px" marginTop="4px" marginBottom="2px">
        <VscMenu style={{ width: '22px', height: 'auto' }} />
      </Button>
    </>
  );
};

export default MenuDrawer;
