import { Toast, ToastContainer, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import constants from '../utils/constants.json';

const SelectionOverlay = ({ monthSelected, egPlan, isVisible, updateMonth }) => {
  const [buttons, setButtons] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const newButtons = [];

    const isSelected = monthSelected.monthid !== undefined && monthSelected.parentid !== undefined;
    setShow(isSelected);

    if (isSelected) {
      Object.values(constants.varianten).forEach((value) => {
        newButtons.push(
          <Button
            key={value.id}
            variant={
              egPlan[monthSelected.parentid].months[monthSelected.monthid].variant === value.id
                ? value.buttonVariantSelected
                : value.buttonVariantDefault
            }
            value={value.id}
            onClick={(e) =>
              updateMonth(
                monthSelected.parentid,
                monthSelected.monthid,
                e.currentTarget.value // variant
              )
            }>
            <div>
              {value.abbrvOverlay}
              <br />
              {egPlan[monthSelected.parentid].months[monthSelected.monthid].amount[value.id]} €
            </div>
          </Button>
        );
      });
    }

    setButtons(newButtons);
  }, [monthSelected, egPlan]);

  return (
    <ToastContainer position="bottom-center" containerPosition="fixed">
      <Toast show={show} onClose={() => setShow(false)}>
        {show ? (
          <>
            <Toast.Header closeButton>
              <strong className="me-auto">{constants.parents[monthSelected.parentid].name}</strong>
              <div> Lebensmonat {monthSelected.monthid + 1}</div>
            </Toast.Header>
            <Toast.Body>
              <ButtonToolbar className="justify-content-center">{buttons}</ButtonToolbar>
            </Toast.Body>
          </>
        ) : (
          <div />
        )}
      </Toast>
    </ToastContainer>
  );
};

export default SelectionOverlay;
