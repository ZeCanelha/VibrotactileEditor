import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LibraryItems from "./LibrayItems";
import Search from "./LibrarySearch";
import Database from "../../utils/database";

import { showNotification } from "../../stores/gui/guiActions";

import { addPatternToChannel } from "../../stores/timeline/timelineActions";
import {
  addPatternToList,
  setDisplayPattern,
  setCurrentPattern,
} from "../../stores/pattern/patternActions";
import {
  updateSearchQuery,
  setPatterns,
} from "../../stores/library/libraryActions";
import { setImportPatternNotification } from "../../stores/notification/notificationAction";

const mapStateToPros = (state) => ({
  setShowLibraryModal: state.gui.isLibraryModalOpen,
  patternList: state.pattern.patterns,
  patterns: state.library.patterns,
  channels: state.timeline.channel,
  library: state.library,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPatternToChannel,
      addPatternToList,
      setDisplayPattern,
      setCurrentPattern,
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
      connection: true,
      searchParameters: {},
      rangeValue: 350,
    };
    this.handleChangeRange = this.handleChangeRange.bind(this);
    this.handleImportPattern = this.handleImportPattern.bind(this);
    this.handleLibraryModal = this.handleLibraryModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getAllPatterns = this.getAllPatterns.bind(this);
  }

  componentDidMount() {
    this.getAllPatterns();
  }

  componentDidUpdate(prevState) {
    if (this.state.openLibraryModal !== prevState.openLibraryModal) {
      this.getAllPatterns();
    }
  }

  handleChangeRange(event) {
    this.setState({ rangeValue: parseInt(event.target.value) });
  }
  getAllPatterns() {
    Database.fetchData("/patterns", "GET").then((data) => {
      if (!data) {
        this.setState({ connection: false });
      } else {
        this.props.setPatterns(data);
      }
    });
  }

  searchPatternById(id) {
    for (let index = 0; index < this.props.patterns.length; index++) {
      if (this.props.patterns[index].patternID === id)
        return this.props.patterns[index];
    }
  }

  handleImportPattern(eventKey, properties) {
    let patternProperties = {
      patternID: properties.id,
      datapoints: properties.datapoints,
      area: properties.path,
      channelID: parseInt(eventKey),
      x: 0,
      emptyTime: 0,
    };

    // Import pattern to patternList
    this.props.addPatternToList(patternProperties);

    this.props.setCurrentPattern(this.props.patternList.length);
    this.props.setDisplayPattern(true);

    this.props.setImportPatternNotification();
    this.props.showNotification();

    this.setState({ openLibraryModal: false });
  }

  handleLibraryModal() {
    this.setState({ openLibraryModal: !this.state.openLibraryModal });
  }

  handleSearch(values) {
    values["rangeInput"] = this.state.rangeValue;
    console.log(values);
    this.setState({ searchParameters: values });
  }
  handleReset() {
    this.setState({ searchParameters: {}, rangeValue: 350 });
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
          backdrop="static"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Vibrotactile Library
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid className="library-modal-container">
              {this.state.connection ? (
                <Row className="w-100">
                  <Search
                    handleSearch={this.handleSearch}
                    handleReset={this.handleReset}
                    handleChangeRange={this.handleChangeRange}
                    rangeValue={this.state.rangeValue}
                  ></Search>
                  <LibraryItems
                    searchParameters={this.state.searchParameters}
                    channels={this.props.channels}
                    handleImport={this.handleImportPattern}
                  ></LibraryItems>
                </Row>
              ) : (
                <div className="d-flex align-self-center">
                  <p>Something went wrong</p>
                </div>
              )}
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(Library);
