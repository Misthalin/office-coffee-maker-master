import React from "react";
import Modal from "react-modal";
import NewUserForm from "./NewUserForm";
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
    <div>
      <Button title="Create new user" variant="long" onClickEvent={openModal} />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Create new user">
        <div className="modal-container">
          <h2 className="text-center">Create a new user</h2>
          <NewUserForm {...props} closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default EditUserModal;