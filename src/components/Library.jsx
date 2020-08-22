import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  openLibraryModal,
  closeLibraryModal,
  openPatternModal,
  closePatternModal,
  showNotification,
} from "../stores/gui/guiActions";
import {
  updateSearchQuery,
  setPatterns,
} from "../stores/library/libraryActions";

import {
  setPatternId,
  importDataPints,
} from "../stores/pattern/patternActions";

import { setImportPatternNotification } from "../stores/notification/notificationAction";

import Display from "./DisplayPattern";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import LibraryFilter from "./LibraryFilter";

const mapStateToPros = (state) => ({
  setShowLibraryModal: state.gui.isLibraryModalOpen,
  setShowPatternModal: state.gui.isLibraryPatternModalOpen,
  displayDetails: state.display,
  patterns: state.library.patterns,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setPatterns,
      openLibraryModal,
      closeLibraryModal,
      openPatternModal,
      closePatternModal,
      updateSearchQuery,
      setPatternId,
      importDataPints,
      showNotification,
      setImportPatternNotification,
    },
    dispatch
  );

class Library extends React.Component {
  constructor() {
    super();

    this.handleClosePattern = this.handleClosePattern.bind(this);
    this.handleImportPattern = this.handleImportPattern.bind(this);
  }

  searchPatternById(id) {
    for (let index = 0; index < this.props.patterns.length; index++) {
      if (this.props.patterns[index]._id === id)
        return this.props.patterns[index];
    }
  }

  handleImportPattern() {
    let patternObject = this.searchPatternById(
      this.props.displayDetails.currentDisplayedPattern
    );
    this.props.setPatternId(this.props.displayDetails.currentDisplayedPattern);
    this.props.importDataPints(patternObject.keyframes);
    this.props.setImportPatternNotification();
    this.props.showNotification();
    this.props.closePatternModal();
  }

  handleClosePattern() {
    this.props.closePatternModal();
    this.props.openLibraryModal();
  }

  render() {
    return (
      <>
        <Button
          className="toolbar-size border rounded"
          variant="light"
          onClick={this.props.openLibraryModal}
        >
          Library
        </Button>

        <Modal
          show={this.props.setShowLibraryModal}
          size="lg"
          backdrop="static"
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Vibrotactile Library
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onChange={this.props.updateSearchQuery}
              />
              <Button variant="dark">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
            <LibraryFilter></LibraryFilter>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" block onClick={this.props.closeLibraryModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.props.setShowPatternModal}
          onHide={this.handleClosePattern}
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
                  <Display
                    id={this.props.displayDetails.currentDisplayedPattern}
                    path={this.props.displayDetails.patternPath}
                    logger={true}
                  ></Display>
                </Col>
                <Col className="border rounded border-success">
                  <h4>Name: </h4>
                  <p>{this.props.displayDetails.patternName}</p>
                  <h4>Description:</h4>
                  <p>{this.props.displayDetails.patternDescription}</p>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleClosePattern}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleImportPattern}>
              Import pattern
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(Library);
