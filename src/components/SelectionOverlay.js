import { Toast, ToastContainer, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import constants from '../utils/constants.json';

const SelectionOverlay = ({ monthid, parentid, months, isVisible, updateMonth }) => {
  const [buttons, setButtons] = useState();
  useEffect(() => {
    const newButtons = [];
    Object.values(constants.varianten).forEach((value) => {
      newButtons.push(
        <Button
          key={value.id}
          variant={
            months[parentid].months[monthid].variant === value.id
              ? value.buttonVariantSelected
              : value.buttonVariantDefault
          }
          value={value.id}
          onClick={(e) =>
            updateMonth(
              parentid,
              monthid,
              e.currentTarget.value, // variant
              // constants.parents[parentid].amount[e.currentTarget.value], //TODO: calculate individual month amount
              undefined,
              undefined
            )
          }>
          <div>
            {value.abbrv}
            <br />
            {value.amount}
          </div>
        </Button>
      );
    });

    setButtons(newButtons);
  }, [monthid, parentid, months, isVisible]);

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
