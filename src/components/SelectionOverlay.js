import { Toast, ToastContainer, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import constants from '../utils/constants.json';

const SelectionOverlay = ({ monthid, parentid, egPlan, isVisible, updateMonth }) => {
  const [buttons, setButtons] = useState();
  useEffect(() => {
    const newButtons = [];
    Object.values(constants.varianten).forEach((value) => {
      newButtons.push(
        <Button
          key={value.id}
          variant={
            egPlan[parentid].months[monthid].variant === value.id
              ? value.buttonVariantSelected
              : value.buttonVariantDefault
          }
          value={value.id}
          onClick={(e) =>
            updateMonth(
              parentid,
              monthid,
              e.currentTarget.value // variant
            )
          }>
          <div>
            {value.abbrv}
            <br />
            {egPlan[parentid].months[monthid].amount[value.id]} €
          </div>
        </Button>
      );
    });

    setButtons(newButtons);
  }, [monthid, parentid, egPlan, isVisible]);

  return (
    <ToastContainer position="bottom-center" containerPosition="fixed">
      <Toast show={isVisible}>
        <Toast.Header closeButton>
          <strong className="me-auto"> {constants.parents[parentid].name} </strong>
          <div> Lebensmonat {monthid + 1}</div>
        </Toast.Header>
        <Toast.Body>
          <ButtonGroup aria-label="Basic example">{buttons}</ButtonGroup>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SelectionOverlay;
