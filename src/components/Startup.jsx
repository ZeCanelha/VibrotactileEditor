import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  defineProjectId,
  changeProjectName,
  changeProjectActuator,
  changeProjectDevice,
  changeDeviceImage,
  loadConfigs,
} from "../stores/editor/editorActions";

import { closeInitialConfig } from "../stores/gui/guiActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import Database from "../utils/database";

function mapStateToProps(state) {
  return {
    config: state.config,
    deviceImage: state.config.deviceImage,
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
    },
    dispatch
  );
}

class StartConfig extends React.Component {
  fetchConfigurations() {
    let theobject = this;

    Database.fetchData("/configs", "GET").then((data) => {
      theobject.props.closeInitialConfig();
      theobject.props.loadConfigs(data[0]);
    });
  }

  saveProject() {
    Database.saveProjectConfiguration(
      this.props.config.hardwareDevice,
      this.props.config.deviceImage,
      this.props.config.projectName,
      this.props.config.actuators,
      this.props.config.actuators_coords
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
    if (this.props.deviceImage && this.props.setShow) {
      imagePreview = <Image src={this.props.deviceImage} thumbnail />;
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
