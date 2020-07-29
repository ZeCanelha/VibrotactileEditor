import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  defineProjectId,
  changeProjectName,
  loadConfigs,
} from "../stores/editor/editorActions";

import {
  changeProjectActuator,
  changeProjectDevice,
  changeDeviceImage,
  loadDeviceConfigurations,
} from "../stores/device/deviceActions";

import { closeInitialConfig } from "../stores/gui/guiActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import Database from "../utils/database";

function mapStateToProps(state) {
  return {
    config: state.config,
    device: state.device,
    setShow: state.gui.isInitialModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      defineProjectId,
      changeProjectName,
      changeProjectActuator,
      changeDeviceImage,
      changeProjectDevice,
      closeInitialConfig,
      loadConfigs,
      loadDeviceConfigurations,
    },
    dispatch
  );
}

class StartConfig extends React.Component {
  fetchConfigurations() {
    let theobject = this;

    Database.fetchData("/configs", "GET").then((data) => {
      theobject.props.closeInitialConfig();

      let configs = {
        projectId: data[0]._id,
        projectName: data[0].name,
      };
      let device = {
        hardwareDevice: data[0].device,
        deviceImage: data[0].deviceImage,
        actuators: data[0].n_actuators,
        actuators_coords: data[0].actuator_coords,
      };

      theobject.props.loadConfigs(configs);
      theobject.props.loadDeviceConfigurations(device);
    });
  }

  saveProject() {
    Database.saveProjectConfiguration(
      this.props.device.hardwareDevice,
      this.props.device.deviceImage,
      this.props.config.projectName,
      this.props.device.actuators,
      this.props.device.actuators_coords
    ).then((data) => {
      this.props.defineProjectId(data._id);
      this.props.closeInitialConfig();
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
              onChange={(e) => this.handleImageUpload(e)}
              custom
            />
          </Form>
          {imagePreview}
        </Modal.Body>
        <Modal.Footer>
          {/* Arrow function to bind the function to the componente to get props access when using this */}
          <Button
            variant="dark"
            block
            onClick={() => this.fetchConfigurations()}
          >
            Load configuration
          </Button>
          <Button
            variant="outline-dark"
            block
            onClick={() => this.saveProject()}
          >
            Save configuration
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartConfig);
