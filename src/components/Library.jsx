import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openLibraryModal, closeLibraryModal } from "../stores/gui/guiActions";
import {
  updateSearchQuery,
  setCustomPatterns,
} from "../stores/library/libraryActions";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import LibraryFilter from "./LibraryFilter";
import DummyPatterns from "../utils/customPresetsDummy.json";

const mapStateToPros = (state) => ({
  setShow: state.gui.libraryModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCustomPatterns,
      openLibraryModal,
      closeLibraryModal,
      updateSearchQuery,
    },
    dispatch
  );

class Library extends React.Component {
  componentDidMount() {
    this.props.setCustomPatterns(DummyPatterns);
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
          show={this.props.setShow}
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
      </>
    );
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(Library);
