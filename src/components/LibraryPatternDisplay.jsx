import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  updateDataPoints,
  updateAreaChart,
} from "../stores/pattern/patternActions";

import {
  openLibraryModal,
  closeLibraryModal,
  openPatternModal,
  closePatternModal,
} from "../stores/gui/guiActions";

import Display from "./DisplayPattern";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateDataPoints,
      updateAreaChart,
      openLibraryModal,
      closePatternModal,
      closeLibraryModal,

      openPatternModal,
    },
    dispatch
  );

const mapStateToProps = (state) => ({
  setShow: state.gui.isLibraryPatternModalOpen,
});

class LibraryDisplay extends React.Component {
  constructor() {
    super();
    this.handleImport = this.handleImport.bind(this);
  }

  handleImport() {
    // Add pattern and close modals
  }

  render() {
    return (
      <React.Fragment>
        {/* <svg
          className="svg-container rounded"
          viewBox="0 0 100 100"
          onClick={this.props.openPatternModal}
          preserveAspectRatio="xMinYMin meet"
        >
          <path
            transform={"scale(0.18,0.18)"}
            d={this.props.path}
            fill="#5bc0de"
            stroke={"0275d8"}
          ></path>
          <text
            textAnchor="left"
            fill={"#5cb85c"}
            y="90%"
            className="pattern-display-text"
          >
            {this.props.patternName}
          </text>
        </svg> */}

        {/* <Modal
          show={this.props.setShow}
          onHide={this.props.closePatternModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Pattern Characteristics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <svg
                    viewBox="0 0 150 100"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      transform={"scale(0.25,0.20)"}
                      // d={props.path}
                      fill="#5bc0de"
                      stroke={"0275d8"}
                    ></path>
                  </svg>
                </Col>
                <Col className="border rounded border-success">
                  <h4>Name: </h4>
                  {/* <p>{props.patternName}</p> 
                  <h4>Description:</h4>
                  {/* <p>{props.description}</p>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.props.closePatternModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleImport}>
              Import pattern
            </Button>
          </Modal.Footer>
        </Modal> */}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryDisplay);
