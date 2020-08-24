import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  closeSaveModal,
  openSaveModal,
  showNotification,
} from "../stores/gui/guiActions";

import { setSaveNotification } from "../stores/notification/notificationAction";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Database from "../utils/database";

const mapStateToProps = (state) => ({
  setShow: state.gui.isSaveModalOpen,
  config: state.config,
  device: state.device,
  timeline: state.timeline,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeSaveModal,
      openSaveModal,
      showNotification,
      setSaveNotification,
    },
    dispatch
  );

class SaveModal extends React.Component {
  saveProjectConfigurations() {
    let projectConfiguration = {
      projectID: this.props.config.projectId,
      projectName: this.props.config.projectName,
      device: this.props.device.hardwareDevice,
      nActuators: this.props.device.actuators,
      actuatorCoords: this.props.device.actuators_coords,
      deviceImage: this.props.device.deviceImage,
      timelineID: this.props.timeline.timelineID,
    };

    Database.saveProjectConfiguration(
      projectConfiguration,
      "PUT",
      this.props.config.dbInstance
    ).then((data) => {
      console.log(data);
      this.props.closeSaveModal();
      this.props.setSaveNotification();
      this.props.showNotification();
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
