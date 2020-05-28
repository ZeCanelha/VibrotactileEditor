import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { openPatternModal, closePatternModal } from "../stores/gui/guiActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const mapStateToProps = (state) => ({
  a: state.gui.libraryPatternModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openPatternModal,
      closePatternModal,
    },
    dispatch
  );

function LibraryDisplay(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <svg
        className="svg-container rounded"
        viewBox="0 0 100 100"
        onClick={handleShow}
        preserveAspectRatio="xMinYMin meet"
      >
        <path
          transform={"scale(0.18,0.18)"}
          d={props.path}
          fill="#5bc0de"
          stroke={"0275d8"}
        ></path>
        <text
          text-anchor="left"
          fill={"#5cb85c"}
          y="90%"
          className="pattern-display-text"
        >
          {props.patternName}
        </text>
      </svg>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Pattern Characteristics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <svg viewBox="0 0 150 100" preserveAspectRatio="xMidYMid meet">
                  <path
                    transform={"scale(0.25,0.20)"}
                    d={props.path}
                    fill="#5bc0de"
                    stroke={"0275d8"}
                  ></path>
                </svg>
              </Col>
              <Col className="border rounded border-success">
                <h4>Name: </h4>
                <p>{props.patternName}</p>
                <h4>Description:</h4>
                <p>{props.description}</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Import pattern</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryDisplay);
