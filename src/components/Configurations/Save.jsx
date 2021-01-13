import React from "react";
import { saveAs } from "file-saver";
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
import "../../css/toolbar.css";

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
    this.exportProject = this.exportProject.bind(this);
  }

  isProjectSaving() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  getIndexById(id) {
    for (let i = 0; i < this.props.device.actuators_coords.length; i++) {
      if (this.props.device.actuators_coords[i].id === id) return i;
    }
  }

  exportProject() {
    this.isProjectSaving();

    const patterns = this.props.patternList;
    const channels = this.props.timeline.channel;
    const FPS = 5;
    const saveFilename = this.props.config.projectName + ".json";

    let timelineData = [];
    channels.forEach((channel) => {
      let channelPatterns = [];
      let channelActuators = [];

      channel.actuators.forEach((id) => {
        channelActuators.push(this.getIndexById(id));
      });

      patterns.forEach((pattern, i) => {
        if (pattern.channelID === channel._id) {
          channelPatterns.push({
            startingTime: pattern.x,
            duration: Math.max.apply(
              Math,
              pattern.datapoints.map((d) => d.time)
            ),
            datapoints: pattern.datapoints,
          });
        }
      });
      timelineData.push({
        patterns: channelPatterns,
        actuators: channelActuators,
      });
    });

    let exportFile = {
      samplingRate: FPS,
      numberOfActuators: this.props.device.actuators_coords.length,
      channels: timelineData,
    };

    let blob = new Blob([JSON.stringify(exportFile)], {
      type: "text/json;charset=utf-8",
    });
    saveAs(blob, saveFilename);

    this.isProjectSaving();
    this.props.closeSaveModal();
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
          <Modal.Body>
            <p>
              Save or export project. Project exported can be used with @Unity
              and @Aframe. See documentation
            </p>
            <Button variant="primary" block onClick={this.exportProject}>
              {this.state.isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Export Project"
              )}
            </Button>
          </Modal.Body>
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
