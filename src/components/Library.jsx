import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  openLibraryModal,
  closeLibraryModal,
  openPatternModal,
  closePatternModal,
} from "../stores/gui/guiActions";
import {
  updateSearchQuery,
  setPatterns,
} from "../stores/library/libraryActions";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import LibraryFilter from "./LibraryFilter";
import Database from "../utils/database";

const mapStateToPros = (state) => ({
  setShowLibraryModal: state.gui.isLibraryModalOpen,
  setShowPatternModal: state.gui.isLibraryPatternModalOpen,
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
    },
    dispatch
  );

class Library extends React.Component {
  constructor() {
    super();

    this.handleClosePattern = this.handleClosePattern.bind(this);
  }

  handleClosePattern() {
    this.props.closePatternModal();
    this.props.openLibraryModal();
  }

  componentDidMount() {
    let theobject = this;

    // Fetching patterns

    Database.fetchData("/patterns", "GET").then((data) => {
      theobject.props.setPatterns(data);
    });
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
            <h1>Teste no close de modals</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleClosePattern}>
              Close
            </Button>
            <Button variant="primary">Import pattern</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(Library);
