import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LibraryFilter from "./LibrayItems";
import Search from "./LibrarySearch";

import { showNotification } from "../../stores/gui/guiActions";
import {
  updateSearchQuery,
  setPatterns,
} from "../../stores/library/libraryActions";
import { setImportPatternNotification } from "../../stores/notification/notificationAction";

const mapStateToPros = (state) => ({
  setShowLibraryModal: state.gui.isLibraryModalOpen,
  patterns: state.library.patterns,
  channels: state.timeline.channel,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setPatterns,
      updateSearchQuery,
      showNotification,
      setImportPatternNotification,
    },
    dispatch
  );

class Library extends React.Component {
  constructor() {
    super();
    this.state = {
      openLibraryModal: false,
      searchParameters: {},
    };

    this.handleImportPattern = this.handleImportPattern.bind(this);
    this.handleLibraryModal = this.handleLibraryModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  searchPatternById(id) {
    for (let index = 0; index < this.props.patterns.length; index++) {
      if (this.props.patterns[index].patternID === id)
        return this.props.patterns[index];
    }
  }

  handleImportPattern(patternObject) {
    this.props.setImportPatternNotification();
    this.props.showNotification();

    this.setState({ openPatternDetails: false });
  }

  handleLibraryModal() {
    this.setState({ openLibraryModal: !this.state.openLibraryModal });
  }

  handleSearch(values) {
    this.setState({ searchParameters: values });
  }
  handleReset() {
    this.setState({ searchParameters: {} });
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
          onHide={this.handleLibraryModal}
          size="lg"
          backdrop="static"
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Vibrotactile Library
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid className="library-modal-container">
              <Row>
                <Search
                  handleSearch={this.handleSearch}
                  handleReset={this.handleReset}
                ></Search>
                <LibraryFilter
                  searchParameters={this.state.searchParameters}
                  channels={this.props.channels}
                ></LibraryFilter>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(Library);
