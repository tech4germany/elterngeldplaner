import { Toast, ToastContainer, Button, ButtonGroup } from 'react-bootstrap';
import constants from '../utils/constants.json';

const SelectionOverlay = ({ monthid, parentName, selectedVariant, isVisible, onSelect }) => {
  return (
    <ToastContainer position="bottom-center" containerPosition="fixed">
      <Toast show={isVisible}>
        <Toast.Header closeButton>
          <strong className="me-auto"> {parentName} </strong>
          <div> Lebensmonat {monthid}</div>
        </Toast.Header>
        <Toast.Body>
          <ButtonGroup aria-label="Basic example">
            {selectedVariant === 'basis' ? (
              <Button variant="success">
                Basis <br /> {constants.basis} €
              </Button>
            ) : (
              <Button variant="outline-success">
                Basis <br /> {constants.basis} €
              </Button>
            )}
            {selectedVariant === 'plus' ? (
              <Button variant="warning">
                EG+ <br /> {constants.plus} €
              </Button>
            ) : (
              <Button variant="outline-warning">
                EG+ <br /> {constants.plus} €
              </Button>
            )}
            {selectedVariant === 'bonus' ? (
              <Button variant="danger">
                Bonus <br /> {constants.bonus} €
              </Button>
            ) : (
              <Button variant="outline-danger">
                Bonus <br /> {constants.bonus} €
              </Button>
            )}
            {selectedVariant === '' ? (
              <Button variant="secondary">
                Kein EG <br /> {constants.none} €
              </Button>
            ) : (
              <Button variant="outline-secondary">
                Kein EG <br /> {constants.none} €
              </Button>
            )}
          </ButtonGroup>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SelectionOverlay;
