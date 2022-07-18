import React from "react";
import { Button, Modal } from "react-bootstrap";
const NewModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      style={{ zIndex: "9999" }}
      size={props.size}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button key={index} variant={btn.color} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            variant="primary"
            {...props}
            onClick={props.onSubmit}
            className="btn-sm"
            style={{ backgroundColor: "#333" }}
          >
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;
