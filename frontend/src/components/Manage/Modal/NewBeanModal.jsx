import React from "react";
import Modal from "react-modal";
import Button from "../../Button/Button";
import NewBeanForm from "./NewBeanForm";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    maxWidth: "600px",
    height: "min-content",
    background: "var(--background)",
    color: "var(--foreground)",
    margin: "auto auto",
    border: "none",
    borderRadius: "10px",
    padding: "2%",
  },
};

Modal.setAppElement("#root");

const NewBeanModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button title="Add a new bean" onClickEvent={openModal} variant="long" />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Edit bean">
        <div className="modal-container">
          <h2 className="text-center">Add a new bean</h2>
          <NewBeanForm {...props} closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default NewBeanModal;
