import React from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Modal from 'react-modal';
import Button from '../Button/Button';

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

const ConfirmDialog = ({ show, proceed, confirmation, options }) => (
  <Modal onRequestClose={() => proceed(false)} isOpen={show} style={customStyles}>
    <div className="modal-container">
      <h2>{confirmation}</h2>
      <div className="btn-group">
        <Button title="Yes" onClickEvent={() => proceed(true)} />
        <Button title="Go back" onClickEvent={() => proceed(false)} />
      </div>
    </div>
  </Modal>
)

ConfirmDialog.propTypes = {
  show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  confirmation: PropTypes.string,  // arguments of your confirm function
  options: PropTypes.object        // arguments of your confirm function
}

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(ConfirmDialog);