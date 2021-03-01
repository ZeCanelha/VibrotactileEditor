import React from "react";
import { Formik } from "formik";
import Util from "../../utils/util";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Database from "../../utils/database";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  setProjectId,
  setDBInstance,
  changeProjectName,
  loadConfigs,
} from "../../stores/editor/editorActions";

import {
  changeProjectActuator,
  changeProjectDevice,
  changeDeviceImage,
  loadDeviceConfigurations,
} from "../../stores/device/deviceActions";

import {
  setLoadConfigurationsNotification,
  setSaveNotification,
  setAddWarningNotification,
} from "../../stores/notification/notificationAction";

import { setPatterns } from "../../stores/library/libraryActions";

import {
  closeInitialConfig,
  showNotification,
} from "../../stores/gui/guiActions";

import {
  setTimelineID,
  setTimelineDBInstance,
  setLoadedDataToTimeline,
  updateTimelineTime,
} from "../../stores/timeline/timelineActions";

import { setLoadedPatterns } from "../../stores/pattern/patternActions";

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
      setPatterns,
      setLoadedPatterns,
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
      setTimelineDBInstance,
      setLoadedDataToTimeline,
      updateTimelineTime,
      setAddWarningNotification,
    },
    dispatch
  );

class StartConfig extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      load: false,
      projectsData: [],
      projectIndex: 0,
    };

    this.isProjectLoading = this.isProjectLoading.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.fetchConfigurations = this.fetchConfigurations.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.getSerialPortsAvailable = this.getSerialPortsAvailable.bind(this);
    this.handleLoadProject = this.handleLoadProject.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
  }

  componentDidMount() {
    // this.getSerialPortsAvailable();
    this.props.setProjectId();
    this.props.setTimelineID();
  }

  getSerialPortsAvailable() {
    Database.fetchData("/arduino", "GET").then((data) => {
      if (!data) {
        this.props.setAddWarningNotification(
          "Network Error! Failed fetching project settings!"
        );
      }
    });
  }

  isProjectLoading() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  handleFormSubmission(values) {
    this.props.changeProjectName(values.projectName);
    this.props.changeProjectDevice(values.hardwareDevice);
    this.props.changeProjectActuator(parseInt(values.nActuators));

    this.saveProject();
  }

  fetchConfigurations() {
    let projectsData = [];
    this.isProjectLoading();
    Database.fetchData("/configs", "GET").then((data) => {
      if (!data) {
        this.props.setAddWarningNotification(
          "Network Error! Failed fetching project settings!"
        );
      } else {
        projectsData = data;
        this.isProjectLoading();
        this.setState({ load: true, projectsData: projectsData });
      }
    });
  }

  handleProjectName(e) {
    this.setState({ projectIndex: e.target.value });
  }

  handleLoadProject() {
    let data = this.state.projectsData;
    let index = this.state.projectIndex;

    let configs = {
      dbInstanceId: data[index]._id,
      projectId: data[index].projectID,
      projectName: data[index].projectName,
    };
    let device = {
      hardwareDevice: data[index].device,
      deviceImage: data[index].deviceImage,
      actuators: data[index].actuatorCoords.length,
      actuators_coords: data[index].actuatorCoords,
    };

    // Load and set IDs
    this.props.setTimelineID(data[index].timelineID);
    this.props.loadConfigs(configs);
    this.props.setLoadedPatterns(data[index].patternList);
    this.props.loadDeviceConfigurations(device);

    Database.fetchData(
      "/timeline",
      "GET",
      "?timelineID=" + data[index].timelineID
    ).then((data) => {
      if (!data)
        this.props.setAddWarningNotification(
          "Network Error! Failed fetching project settings!"
        );
      else {
        this.props.setTimelineDBInstance(data[0]._id);
        this.props.setLoadedDataToTimeline(data[0].channel);
        this.props.updateTimelineTime(data[0].timelineTime);
        this.props.setLoadConfigurationsNotification();
      }
    });
    this.props.closeInitialConfig();
    this.props.showNotification();
  }

  saveProject() {
    // Set spinner
    this.isProjectLoading();

    let projectConfiguration = {
      projectID: this.props.config.projectId,
      projectName: this.props.config.projectName,
      device: this.props.device.hardwareDevice,
      nActuators: this.props.device.actuators_coords.length,
      actuatorCoords: this.props.device.actuators_coords,
      deviceImage: this.props.device.deviceImage,
      timelineID: this.props.timeline.timelineID,
      patternList: this.props.pattern.patterns,
    };

    Database.postData("/configs", projectConfiguration, "POST").then((data) => {
      if (!data) {
        this.props.setAddWarningNotification(
          "Network Error! Could not save project settings. Try again later!"
        );
      } else {
        this.props.setDBInstance(data._id);
        Database.postData(
          "/timeline",
          {
            timelineID: this.props.timeline.timelineID,
            channel: this.props.timeline.channel,
            timelineTime: this.props.timeline.timelineTime,
          },
          "POST"
        ).then((data) => {
          if (!data) {
            this.props.setAddWarningNotification(
              "Network Error! Could not save project settings. Try again later!"
            );
          } else {
            this.props.setTimelineDBInstance(data._id);
            this.props.setSaveNotification();
          }
        });
      }

      this.props.closeInitialConfig();
      this.isProjectLoading();
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
          {this.state.load ? (
            <Form className="loaded-projects">
              <Form.Group>
                <Form.Label>Select Project</Form.Label>
                <Form.Control as="select" onChange={this.handleProjectName}>
                  {this.state.projectsData.map((item, index) => (
                    <option key={index} value={index}>
                      {item.projectName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" block onClick={this.handleLoadProject}>
                Load project
              </Button>
            </Form>
          ) : (
            <Formik
              validationSchema={Util.formValidationSchema()}
              onSubmit={this.handleFormSubmission}
              initialValues={{
                hardwareDevice: "",
                projectName: "",
                nActuators: "",
                deviceImage: "",
                serialPort: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Hardware Device</Form.Label>
                    <Form.Control
                      type="text"
                      name="hardwareDevice"
                      value={values.hardwareDevice}
                      placeholder="Type here your microcontroller"
                      onChange={handleChange}
                      isValid={touched.hardwareDevice && !errors.hardwareDevice}
                      isInvalid={!!errors.hardwareDevice}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid device name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="projectName"
                      value={values.projectName}
                      placeholder="Type here your project name"
                      onChange={handleChange}
                      isValid={touched.projectName && !errors.projectName}
                      isInvalid={!!errors.projectName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid project name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Number of actuators</Form.Label>
                    <Form.Control
                      name="nActuators"
                      value={values.nActuators}
                      onChange={handleChange}
                      as="select"
                      isValid={touched.nActuators && errors.nActuators}
                      isInvalid={!!errors.nActuators}
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
                    <Form.Control.Feedback type="invalid">
                      Please select the number of actuators.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.File
                    id="custom-file"
                    label="Upload your prototype image"
                    onChange={this.handleImageUpload}
                    name="deviceImage"
                    value={values.deviceImage}
                    custom
                  />
                  {imagePreview}
                  <Button
                    className="mt-2"
                    variant="primary"
                    type="submit"
                    block
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
                      "Save configurations"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
        <Modal.Footer>
          {this.state.load ? null : (
            <Button
              variant="outline-primary"
              block
              onClick={this.fetchConfigurations}
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
                "Load Projects"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartConfig);
