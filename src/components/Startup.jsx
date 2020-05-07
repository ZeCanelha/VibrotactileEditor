import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changeProjectName,
  changeProjectActuator,
  changeProjectDevice,
  changeDeviceImage,
} from "../stores/editor/editorActions";

import { closeInitialConfig } from "../stores/gui/guiActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

function mapStateToProps(state) {
  return {
    projectName: state.config.projectName,
    deviceImage: state.config.deviceImage,
    setShow: state.gui.initialConfigModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeProjectName,
      changeProjectActuator,
      changeDeviceImage,
      changeProjectDevice,
      closeInitialConfig,
    },
    dispatch
  );
}

class StartConfig extends React.Component {
  render() {
    let imagePreview;
    if (this.props.deviceImage) {
      let preview = URL.createObjectURL(this.props.deviceImage);
      imagePreview = <Image src={preview} thumbnail />;
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
                placeholder="Type were your microcontroller"
                onChange={this.props.changeProjectDevice}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type were your project name"
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
              onChange={this.props.changeDeviceImage}
              custom
            />
          </Form>
          {imagePreview}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" block>
            Load configuration
          </Button>
          <Button variant="dark" block onClick={this.props.closeInitialConfig}>
            Save configuration
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartConfig);
