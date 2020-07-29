import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  closeSaveModal,
  openSaveModal,
  showSaveNotification,
} from "../stores/gui/guiActions";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Database from "../utils/database";

const mapStateToProps = (state) => ({
  setShow: state.gui.isSaveModalOpen,
  config: state.config,
  device: state.device,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeSaveModal,
      openSaveModal,
      showSaveNotification,
    },
    dispatch
  );

class SaveModal extends React.Component {
  saveProjectConfigurations() {
    Database.saveProjectConfiguration(
      this.props.device.hardwareDevice,
      this.props.device.deviceImage,
      this.props.config.projectName,
      this.props.device.actuators,
      this.props.device.actuators_coords,
      "PUT",
      this.props.config.projectId
    ).then((data) => {
      console.log(data);
      this.props.closeSaveModal();
      this.props.showSaveNotification();
    });
  }
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
            <Button
              variant="outline-dark"
              block
              onClick={() => this.saveProjectConfigurations()}
            >
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
