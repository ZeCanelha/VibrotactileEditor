import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Database from "../../utils/database";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import {
  setAddSavePatternNotification,
  setAddWarningNotification,
} from "../../stores/notification/notificationAction";
import { showNotification } from "../../stores/gui/guiActions";
const schema = yup.object({
  patternName: yup.string().required(),
  patternDescription: yup.string().required(),
  patternUsage: yup.string().required(),
});

const mapStateToProps = (state) => ({
  pattern: state.pattern,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAddSavePatternNotification,
      setAddWarningNotification,
      showNotification,
    },
    dispatch
  );

class SaveToLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaveModalOpen: false,
      isValidated: false,
      isLoading: false,
    };
    this.isProjectSaving = this.isProjectSaving.bind(this);
    this.handleSelectedSave = this.handleSelectedSave.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleSaveUpdatedPattern = this.handleSaveUpdatedPattern.bind(this);
  }

  handleModal() {
    this.setState({ isSaveModalOpen: !this.state.isSaveModalOpen });
  }

  handleSelectedSave(eventKey) {
    switch (eventKey) {
      case "1":
        this.handleSaveUpdatedPattern();
        break;
      case "2":
        this.handleModal();
        break;
      default:
        break;
    }
  }

  handleSaveUpdatedPattern() {
    const body = {
      patternID: this.props.pattern.patternID,
      keyframes: this.props.pattern.datapoints,
      path: this.props.pattern.area,
    };

    Database.fetchData("/patterns", "GET", "?patternID=" + body.patternID).then(
      (data) => {
        if (!data) {
          this.props.setAddWarningNotification(
            "Could not save the pattern in the Library!"
          );
        } else {
          Database.postData("/patterns", body, "PUT", "/" + data[0]._id).then(
            (data) => {
              if (!data) {
                this.props.setAddWarningNotification(
                  "Could not save the pattern in the Library!"
                );
              } else this.props.setAddSavePatternNotification();

              this.props.showNotification();
              this.setState({ isSaveModalOpen: false });
            }
          );
        }
      }
    );
  }

  isProjectSaving() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  handleFormSubmission(values) {
    this.isProjectSaving();
    const body = {
      patternID: this.props.pattern.patternID,
      keyframes: this.props.pattern.datapoints,
      path: this.props.pattern.area,
      name: values.patternName,
      description: values.patternDescription,
      usage: values.patternUsage,
    };

    Database.postData("/patterns", body, "POST").then((data) => {
      if (!data) {
        this.props.setAddWarningNotification(
          "Could not save the pattern in the Library!"
        );
      } else this.props.setAddSavePatternNotification();

      this.props.showNotification();
      this.setState({
        isSaveModalOpen: false,
        isLoading: !this.state.isLoading,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="save-pattern-container">
          <DropdownButton
            variant={"outline-info"}
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
            <Formik
              validationSchema={schema}
              onSubmit={this.handleFormSubmission}
              initialValues={{
                patternName: "",
                patternDescription: "",
                patternUsage: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Pattern Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="patternName"
                      placeholder="Type here the pattern name..."
                      value={values.patternName}
                      onChange={handleChange}
                      isValid={touched.patternName && !errors.patternName}
                      isInvalid={!!errors.patternName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Pattern Description</Form.Label>
                    <Form.Control
                      name="patternDescription"
                      as="textarea"
                      type="text"
                      placeholder="Type here a brief description of the pattern..."
                      value={values.patternDescription}
                      onChange={handleChange}
                      isValid={
                        touched.patternDescription && !errors.patternDescription
                      }
                      isInvalid={!!errors.patternDescription}
                    />
                    <Form.Control.Feedback type="invalid">
                      Pleas provide a valid description.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Pattern Usage</Form.Label>
                    <Form.Control
                      value={values.patternUsage}
                      onChange={handleChange}
                      isValid={touched.patternUsage && !errors.patternUsage}
                      isInvalid={!!errors.patternUsage}
                      name="patternUsage"
                      type="text"
                      as="textarea"
                      placeholder="Type here examples of the pattern's usage..."
                    />
                    <Form.Control.Feedback type="invalid">
                      Pleas provide a valid pattern usage.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="submit" block>
                    {this.state.isLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Save Pattern"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" block onClick={this.handleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveToLibrary);
