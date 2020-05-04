import React, { useState } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeProjectName } from "../stores/editor/editorActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

function mapStateToProps(state) {
  return {
    projectName: state.projectName.name,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeProjectName }, dispatch);
}

function StartConfig(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  // let imagePreview;
  // if (deviceImage) {
  //   imagePreview = <Image src={deviceImage} thumbnail />;
  // }
  return (
    <Modal
      dialogClassName="modal-20w"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      show={show}
      // onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
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
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type were your project name"
              onChange={props.changeProjectName}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Number of actuators</Form.Label>
            <Form.Control as="select">
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
            // onChange={this.handleImageUpload}
            custom
          />
        </Form>
        {/* {imagePreview} */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" block>
          Load configuration
        </Button>
        <Button variant="dark" block onClick={handleClose}>
          Save configuration
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// handleImageUpload = (e) =>
//   setDeviceImage(URL.createObjectURL(e.target.files[0]));

export default connect(mapStateToProps, mapDispatchToProps)(StartConfig);
