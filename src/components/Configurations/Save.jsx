import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  closeSaveModal,
  openSaveModal,
  showNotification,
} from "../../stores/gui/guiActions";

import {
  setSaveNotification,
  setAddWarningNotification,
} from "../../stores/notification/notificationAction";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

import Database from "../../utils/database";

const mapStateToProps = (state) => ({
  setShow: state.gui.isSaveModalOpen,
  patternList: state.pattern.patterns,
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
      setAddWarningNotification,
    },
    dispatch
  );

class SaveModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };

    this.isProjectSaving = this.isProjectSaving.bind(this);
    this.saveProjectConfigurations = this.saveProjectConfigurations.bind(this);
  }

  isProjectSaving() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  saveProjectConfigurations() {
    this.isProjectSaving();

    let projectConfiguration = {
      projectName: this.props.config.projectName,
      device: this.props.device.hardwareDevice,
      nActuators: this.props.device.actuators_coords.length,
      actuatorCoords: this.props.device.actuators_coords,
      deviceImage: this.props.device.deviceImage,
      patternList: this.props.patternList,
    };

    Database.postData(
      "/configs",
      projectConfiguration,
      "PUT",
      "/" + this.props.config.dbInstance
    ).then((data) => {
      if (!data) {
        this.props.setAddWarningNotification(
          "Network Error! Could not save project settings. Try again later!"
        );
      } else {
        Database.postData(
          "/timeline",
          {
            channel: this.props.timeline.channel,
            timelineTime: this.props.timeline.timelineTime,
          },
          "PUT",
          "/" + this.props.timeline.timelineDbInstance
        )
          .then((data) => {
            if (!data) {
              this.props.setAddWarningNotification(
                "Network Error! Could not save project settings. Try again later!"
              );
            } else {
              this.props.setSaveNotification();
            }
          })
          .catch((error) => {
            this.props.setAddWarningNotification(
              "Network Error! Could not save project settings. Try again later!"
            );
          });
      }

      this.props.closeSaveModal();
      this.isProjectSaving();
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
              variant="primary"
              block
              onClick={this.saveProjectConfigurations}
            >
              {this.state.isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Save Project"
              )}
            </Button>
            <Button
              variant="outline-primary"
              block
              onClick={this.props.closeSaveModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveModal);
