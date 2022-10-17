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
import MenuDrawer from './MenuDrawer';

const Header = ({ pageNames }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Container className="justify-content-center text-center">
      <Row xs="auto" className="justify-content-between text-center align-items-center">
        <Col>
          <MenuDrawer pageNames={pageNames} />
        </Col>
        <Col>
          <img src={logo} alt="Familienportal-Logo" width="70px" height="auto" />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
