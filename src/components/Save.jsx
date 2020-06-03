import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeSaveModal, openSaveModal } from "../stores/gui/guiActions";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const mapStateToProps = (state) => ({
  setShow: state.gui.saveModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeSaveModal,
      openSaveModal,
    },
    dispatch
  );

class SaveModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button
          className="toolbar-size border rounded"
          variant="light"
          onClick={this.props.openSaveModal}
        >
          Save
        </Button>
        <Modal
          show={this.props.setShow}
          size="sm"
          backdrop="static"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Save Options
            </Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" block>
              Save Project
            </Button>
            <Button variant="dark" block onClick={this.props.closeSaveModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveModal);
