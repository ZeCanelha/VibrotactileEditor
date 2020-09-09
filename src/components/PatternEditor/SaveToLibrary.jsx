import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default class SaveToLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaveModalOpen: false,
    };

    this.handleSelectedSave = this.handleSelectedSave.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    this.setState({ isSaveModalOpen: !this.state.isSaveModalOpen });
  }

  handleSelectedSave(eventKey) {
    switch (eventKey) {
      case "1":
        console.log("save");
        break;
      case "2":
        this.handleModal();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="save-pattern-container">
          <DropdownButton
            variant={"info"}
            id="dropdown-item-button"
            title="Save to Library"
            size="sm"
          >
            <Dropdown.Item
              onSelect={this.handleSelectedSave}
              size="sm"
              eventKey={"1"}
              as="button"
            >
              Save
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={this.handleSelectedSave}
              size="sm"
              eventKey={"2"}
              as="button"
            >
              Save as new
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <Modal
          show={this.state.isSaveModalOpen}
          backdrop="static"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Save to Library
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Pattern Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here the pattern name..."
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pattern Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  placeholder="Type here a brief description of the pattern..."
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pattern Usage</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Type here examples of the pattern's usage..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              block
              onClick={() => this.saveProjectConfigurations()}
            >
              Save Pattern
            </Button>
            <Button variant="dark" block onClick={this.handleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
