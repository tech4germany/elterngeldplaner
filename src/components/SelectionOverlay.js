import { Toast, ToastContainer, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import constants from '../utils/constants.json';

const SelectionOverlay = ({ monthid, parentid, selectedVariant, isVisible, updateMonth }) => {
  const getButtons = () => {
    const buttons = constants.varianten.map((item) => (
      <Button
        key={item.id}
        variant={
          item.id === selectedVariant ? item.buttonVariantSelected : item.buttonVariantDefault
        }>
        {item.abbrv}
      </Button>
    ));
    return buttons;
  };

  return (
    <ToastContainer position="bottom-center" containerPosition="fixed">
      <Toast show={isVisible}>
        <Toast.Header closeButton>
          <strong className="me-auto"> {constants.parents[parentid].name} </strong>
          <div> Lebensmonat {monthid}</div>
        </Toast.Header>
        <Toast.Body>
          <ButtonGroup aria-label="Basic example">{getButtons()}</ButtonGroup>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SelectionOverlay;
