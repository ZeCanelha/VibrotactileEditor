import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { showNotification } from "../../stores/gui/guiActions";
import {
  updateSearchQuery,
  setPatterns,
} from "../../stores/library/libraryActions";

import {
  setPatternId,
  importDatapoints,
} from "../../stores/pattern/patternActions";

import { setImportPatternNotification } from "../../stores/notification/notificationAction";

import {
  setPatternName,
  setPatternDescription,
  setPatternPath,
  updatePatternToDisplay,
} from "../../stores/display/displayActions";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import LibraryFilter from "./LibraryFilter";

const mapStateToPros = (state) => ({
  setShowLibraryModal: state.gui.isLibraryModalOpen,
  displayDetails: state.display,
  patterns: state.library.patterns,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setPatternName,
      setPatternDescription,
      setPatternPath,
      updatePatternToDisplay,

      setPatterns,
      updateSearchQuery,
      setPatternId,
      importDatapoints,
      showNotification,
      setImportPatternNotification,
    },
    dispatch
  );

class Library extends React.Component {
  constructor() {
    super();
    this.state = {
      openPatternDetails: false,
      openLibraryModal: false,
    };

    this.handleClosePattern = this.handleClosePattern.bind(this);
    this.handleImportPattern = this.handleImportPattern.bind(this);
    this.handleOpenPattern = this.handleOpenPattern.bind(this);
    this.handleLibraryModal = this.handleLibraryModal.bind(this);
  }

  searchPatternById(id) {
    for (let index = 0; index < this.props.patterns.length; index++) {
      if (this.props.patterns[index]._id === id)
        return this.props.patterns[index];
    }
  }

  // Receives pattern ID and pattern path and open details modal
  handleOpenPattern(patternDetails) {
    // Set store with details to show
    let patternObject = this.searchPatternById(patternDetails.id);

    this.props.setPatternName(patternObject.name);
    this.props.setPatternDescription(patternObject.description);

    this.props.updatePatternToDisplay(patternDetails.id);
    this.props.setPatternPath(patternDetails.path);

    this.setState({ openPatternDetails: true, openLibraryModal: false });
  }

  handleImportPattern() {
    let patternObject = this.searchPatternById(
      this.props.displayDetails.currentDisplayedPattern
    );
    this.props.setPatternId(this.props.displayDetails.currentDisplayedPattern);
    this.props.importDatapoints(patternObject.keyframes);
    this.props.setImportPatternNotification();
    this.props.showNotification();

    this.setState({ openPatternDetails: false });
  }

  handleClosePattern() {
    this.setState({ openPatternDetails: false, openLibraryModal: true });
  }

  handleLibraryModal() {
    this.setState({ openLibraryModal: !this.state.openLibraryModal });
  }

  render() {
    return (
      <>
        <Button
          className="toolbar-size border rounded"
          variant="light"
          onClick={this.handleLibraryModal}
        >
          Library
        </Button>
        <Modal
          show={this.state.openLibraryModal}
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
            <LibraryFilter openDetails={this.handleOpenPattern}></LibraryFilter>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" block onClick={this.handleLibraryModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.openPatternDetails}
          onHide={this.handleClosePattern}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Pattern Characteristics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Col className="border rounded border-success">
                <h4>Name: </h4>
                <p>{this.props.displayDetails.patternName}</p>
                <h4>Description:</h4>
                <p>{this.props.displayDetails.patternDescription}</p>
              </Col>
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
