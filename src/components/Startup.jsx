import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setProjectId,
  setDBInstance,
  changeProjectName,
  loadConfigs,
} from "../stores/editor/editorActions";

import {
  changeProjectActuator,
  changeProjectDevice,
  changeDeviceImage,
  loadDeviceConfigurations,
} from "../stores/device/deviceActions";

import {
  setLoadConfigurationsNotification,
  setSaveNotification,
} from "../stores/notification/notificationAction";

import { setPatterns } from "../stores/library/libraryActions";

import { closeInitialConfig, showNotification } from "../stores/gui/guiActions";

import {
  setPatternId,
  setInitialDatapoints,
} from "../stores/pattern/patternActions";

import { setTimelineID } from "../stores/timeline/timelineActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import Database from "../utils/database";

const mapStateToProps = (state) => ({
  config: state.config,
  timeline: state.timeline,
  device: state.device,
  pattern: state.pattern,
  setShow: state.gui.isInitialModalOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setPatternId,
      setInitialDatapoints,
      setPatterns,
      setLoadConfigurationsNotification,
      setSaveNotification,
      setTimelineID,
      showNotification,
      setProjectId,
      changeProjectName,
      changeProjectActuator,
      changeDeviceImage,
      changeProjectDevice,
      closeInitialConfig,
      loadConfigs,
      loadDeviceConfigurations,
      setDBInstance,
    },
    dispatch
  );

class StartConfig extends React.Component {
  constructor() {
    super();

    this.fetchConfigurations = this.fetchConfigurations.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    // Define initial application state

    this.props.setProjectId();
    this.props.setTimelineID();
    this.props.setPatternId();
    this.props.setInitialDatapoints();
  }

  fetchConfigurations() {
    Database.fetchData("/patterns", "GET").then((data) => {
      this.props.setPatterns(data);
    });

    Database.fetchData("/configs", "GET").then((data) => {
      let configs = {
        dbInstanceId: data[0]._id,
        projectId: data[0].projectID,
        projectName: data[0].projectName,
      };
      let device = {
        hardwareDevice: data[0].device,
        deviceImage: data[0].deviceImage,
        actuators: data[0].nActuators,
        actuators_coords: data[0].actuatorCoords,
      };

      // Load and set IDs

      this.props.setTimelineID(data[0].timelineID);

      this.props.loadConfigs(configs);
      this.props.loadDeviceConfigurations(device);

      this.props.closeInitialConfig();
      this.props.setLoadConfigurationsNotification();
      this.props.showNotification();
    });
  }

  saveProject() {
    Database.fetchData("/patterns", "GET").then((data) => {
      this.props.setPatterns(data);
    });

    let projectConfiguration = {
      projectID: this.props.config.projectId,
      projectName: this.props.config.projectName,
      device: this.props.device.hardwareDevice,
      nActuators: this.props.device.actuators,
      actuatorCoords: this.props.device.actuators_coords,
      deviceImage: this.props.device.deviceImage,
      timelineID: this.props.timeline.timelineID,
    };

    // TODO: onError create a notification toast for error purposes

    Database.saveProjectConfiguration(projectConfiguration).then((data) => {
      this.props.setDBInstance(data._id);
      this.props.closeInitialConfig();
      this.props.setSaveNotification();
      this.props.showNotification();
    });
  }

  handleImageUpload(event) {
    let reader = new FileReader();

    reader.onloadend = () => {
      this.props.changeDeviceImage(reader.result);
    };

    if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
  }

  render() {
    let imagePreview;
    if (this.props.device.deviceImage && this.props.setShow) {
      imagePreview = <Image src={this.props.device.deviceImage} thumbnail />;
    }
    return (
      <Modal
        dialogClassName="modal-20w"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        show={this.props.setShow}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Vibrotactile Editor v1.0.0
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Hardware Device</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type here your microcontroller"
                onChange={this.props.changeProjectDevice}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type here your project name"
                onChange={this.props.changeProjectName}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Number of actuators</Form.Label>
              <Form.Control
                onChange={this.props.changeProjectActuator}
                as="select"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </Form.Control>
            </Form.Group>
            <Form.File
              id="custom-file"
              label="Upload your prototype image"
              onChange={this.handleImageUpload}
              custom
            />
          </Form>
          {imagePreview}
        </Modal.Body>
        <Modal.Footer>
          {/* Arrow function to bind the function to the componente to get props access when using this */}
          <Button variant="dark" block onClick={this.fetchConfigurations}>
            Load configuration
          </Button>
          <Button variant="outline-dark" block onClick={this.saveProject}>
            Save configuration
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartConfig);
