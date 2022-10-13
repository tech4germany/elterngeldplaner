import React, { useRef } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { Container, Row, Col } from 'react-bootstrap';
import { VscMenu } from 'react-icons/vsc';
import logo from '../../images/fpo-logo.jpg';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menü</DrawerHeader>
          <DrawerBody>Nothing to see yet...</DrawerBody>
        </DrawerContent>
      </Drawer>
      <Container className="justify-content-center text-center">
        <Row xs="auto" className="justify-content-between text-center align-items-center">
          <Col>
            <Button onClick={onOpen} variant="ghost" padding="0px">
              <VscMenu style={{ width: '25px', height: 'auto' }} />
            </Button>
          </Col>
          <Col>
            <img src={logo} alt="Familienportal-Logo" width="70px" height="auto" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
