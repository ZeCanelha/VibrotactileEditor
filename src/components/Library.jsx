import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { openLibraryModal, closeLibraryModal } from "../stores/gui/guiActions";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

const mapStateToPros = (state) => ({
  setShow: state.gui.libraryModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openLibraryModal,
      closeLibraryModal,
    },
    dispatch
  );

class Library extends React.Component {
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
              />
              <Button variant="dark">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
            <Container className="mt-3 display-container">
              <Row className="display-row border rounded mb-1"></Row>
              <Row className="display-row border rounded mt-1"></Row>
            </Container>
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
