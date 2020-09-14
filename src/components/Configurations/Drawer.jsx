import React from "react";
import { Formik } from "formik";
import Util from "../../utils/util";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  openConfigDrawer,
  closeConfigDrawer,
  showNotification,
} from "../../stores/gui/guiActions";
import { changeProjectName } from "../../stores/editor/editorActions";

import {
  changeProjectActuator,
  changeProjectDevice,
  changeDeviceImage,
} from "../../stores/device/deviceActions";

import {
  setSaveNotification,
  setAddWarningNotification,
} from "../../stores/notification/notificationAction";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Database from "../../utils/database";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => ({
  openDrawer: state.gui.isConfigDrawerOpen,
  config: state.config,
  device: state.device,
  timeline: state.timeline,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openConfigDrawer,
      closeConfigDrawer,
      changeProjectName,
      changeProjectActuator,
      changeProjectDevice,
      changeDeviceImage,
      showNotification,
      setSaveNotification,
      setAddWarningNotification,
    },
    dispatch
  );

const openSidebar = "sidebar open";
const idleSidebar = "sidebar";

class Drawer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };

    this.isProjectSaving = this.isProjectSaving.bind(this);
    this.drawerReference = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  isProjectSaving() {
    this.setState({ isLoading: !this.state.isLoading });
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  handleFormSubmission(values) {
    this.props.changeProjectName(values.projectName);
    this.props.changeProjectDevice(values.hardwareDevice);
    this.props.changeProjectActuator(parseInt(values.nActuators));

    this.handleSave();
  }

  handleClick(event) {
    if (this.props.openDrawer) {
      if (
        this.drawerReference &&
        !this.drawerReference.current.contains(event.target)
      ) {
        this.props.closeConfigDrawer();
      }
    }
  }

  handleToogle() {
    if (this.props.openDrawer) this.props.closeConfigDrawer();
    else this.props.openConfigDrawer();
  }

  handleSave() {
    this.isProjectSaving();
    let projectConfiguration = {
      projectName: this.props.config.projectName,
      device: this.props.device.hardwareDevice,
      nActuators: this.props.device.actuators_coords.length,
      actuatorCoords: this.props.device.actuators_coords,
      deviceImage: this.props.device.deviceImage,
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
          { channel: this.props.timeline.channel },
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

      this.props.closeConfigDrawer();
      this.isProjectSaving();
      this.props.showNotification();
    });
  }
  //TODO: Device image
  render() {
    let sidebarClass = this.props.openDrawer ? openSidebar : idleSidebar;
    let iconRender = this.props.openDrawer ? faTimes : faBars;

    return (
      <React.Fragment>
        <div className={sidebarClass} ref={this.drawerReference}>
          <div className="sidebar-header">
            <h4>Configurations</h4>
          </div>
          <div className="sidebar-body">
            <Formik
              enableReinitialize
              validationSchema={Util.formValidationSchema()}
              onSubmit={this.handleFormSubmission}
              initialValues={{
                hardwareDevice: this.props.device.hardwareDevice,
                projectName: this.props.config.projectName,
                nActuators: this.props.device.actuators,
                deviceImage: "",
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
                    // onChange={this.handleImageUpload}
                    // name="deviceImage"
                    // value={values.deviceImage}
                    custom
                  />

                  <Button
                    className="mt-2"
                    variant="outline-dark"
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
                      "Save Configuration"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <Button
            variant="light"
            onClick={() => this.handleToogle()}
            className="sidebar-toggle"
          >
            <FontAwesomeIcon icon={iconRender} />
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
