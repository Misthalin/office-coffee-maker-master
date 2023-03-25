import React from "react";
import Modal from "react-modal";
import UserForm from "./EditUserForm";
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

const EditUserModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Button title="Edit user" onClickEvent={openModal} variant="small" />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Edit user">
        <div className="modal-container">
          <h2>Edit user details</h2>
          <UserForm {...props} closeModal={closeModal} />
        </div>
      </Modal>
    </>
  );
};

export default EditUserModal;
