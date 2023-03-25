import React from "react";
import Modal from "react-modal";
import EditBeanForm from "./EditBeanForm";
import Button from "../../Button/Button";

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

const EditBeanModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Button title="Edit bean" onClickEvent={openModal} variant="small" />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Edit bean">
        <div className="modal-container">
          <h2 className="text-center">Edit bean details</h2>
          <EditBeanForm {...props} closeModal={closeModal} />
        </div>
      </Modal>
    </>
  );
};

export default EditBeanModal;
