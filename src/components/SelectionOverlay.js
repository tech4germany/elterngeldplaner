import { Toast, ToastContainer, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import constants from '../utils/constants.json';

const SelectionOverlay = ({ monthid, parentid, selectedVariant, isVisible, updateMonth }) => {
  const [buttons, setButtons] = useState([]);
  useEffect(() => {
    const newButtons = [];
    Object.values(constants.varianten).forEach((value) => {
      newButtons.push(
        <Button
          key={value.id}
          variant={
            value.id === selectedVariant ? value.buttonVariantSelected : value.buttonVariantDefault
          }
          value={value.id}
          onClick={(e) =>
            updateMonth(
              parentid,
              monthid,
              e.currentTarget.value, // variant
              value.amount,
              undefined
            )
          }>
          {value.abbrv}
        </Button>
      );
    });
    // for (let i = 0; i < Object.keys(constants.varianten).length; i += 1) {
    //   const variantObj = Object.values(constants.varianten)[i]; // TODO!
    //   newButtons.push(
    //     <Button
    //       key={i}
    //       variant={
    //         variantObj.id === selectedVariant
    //           ? variantObj.buttonVariantSelected
    //           : variantObj.buttonVariantDefault
    //       }
    //       value={Object.values(constants.varianten)[i].id}
    //       onClick={(e) =>
    //         updateMonth(
    //           parentid,
    //           monthid,
    //           e.currentTarget.value, // variant
    //           Object.values(constants.varianten)[i].amount,
    //           undefined
    //         )
    //       }>
    //       {Object.values(constants.varianten)[i].abbrv}
    //     </Button>
    //   );
    // }
    setButtons(newButtons);
  }, [monthid, parentid, selectedVariant, isVisible]);

  return (
    <ToastContainer position="bottom-center" containerPosition="fixed">
      <Toast show={isVisible}>
        <Toast.Header closeButton>
          <strong className="me-auto"> {constants.parents[parentid].name} </strong>
          <div> Lebensmonat {monthid}</div>
        </Toast.Header>
        <Toast.Body>
          <ButtonGroup aria-label="Basic example">{buttons}</ButtonGroup>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SelectionOverlay;
