import React from "react";

import Display from "./DisplayPattern";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  removeChannel,
  addPatternToTimeline,
  setUploadingDataFalse,
} from "../stores/timeline/timelineActions";
import {
  setAddPatternToTimelineNotification,
  setRemoveChannelNotification,
  setAddActuatorToChannelNotification,
} from "../stores/notification/notificationAction";
import {
  showNotification,
  closeAddActuatorToChannelModal,
  openAddActuatorToChannelModal,
  setDragActive,
  setDragFalse,
} from "../stores/gui/guiActions";

import {
  setPatternId,
  setInitialDatapoints,
} from "../stores/pattern/patternActions";

import Database from "../utils/database";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      removeChannel,
      addPatternToTimeline,
      setAddPatternToTimelineNotification,
      setAddActuatorToChannelNotification,
      setRemoveChannelNotification,
      showNotification,
      setPatternId,
      setInitialDatapoints,
      closeAddActuatorToChannelModal,
      openAddActuatorToChannelModal,
      setDragActive,
      setDragFalse,
      setUploadingDataFalse,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  pattern: state.pattern,
  device: state.device,
  setShow: state.gui.isAddActuatorToChannelModalOpen,
  dragActive: state.gui.isDragActive,
});

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleRemoveChannel = this.handleRemoveChannel.bind(this);
    this.handleAddActuatorToChannel = this.handleAddActuatorToChannel.bind(
      this
    );
  }

  channelDisplay = [];

  componentDidMount() {
    //TODO: Se existir data proveniente de um load, adicionar aqui
  }

  componentDidUpdate(prevProps) {
    // TODO: Se um novo pattern for adicionado a um canal da timeline, re-render dos channels

    let patterns = this.props.timeline.channel[this.props.id].pattern;
    if (prevProps.timeline.channel[this.props.id].pattern !== patterns) {
      // TODO: Render dos patterns que são provenientes do editor.
    }
  }

  findPatternByID(patternID) {
    return Database.fetchData("/pattern", "GET", "/" + patternID).then(
      (data) => {
        return data;
      }
    );
  }

  renderChannelToTimeline() {
    let patterns = this.props.timeline.channel[this.props.id].pattern;
    for (let index = 0; index < patterns.length; index++) {
      let pattern = this.findPatternByID(patterns[index]._id);
      this.channelDisplay.push(
        <Col className="timeline-display" key={pattern._id} xs={6} md={4}>
          <Display
            key={pattern._id}
            id={pattern._id}
            path={pattern.path}
          ></Display>
        </Col>
      );
    }

    this.props.setInitialDatapoints();
    this.props.setPatternId();
  }

  // TODO:  Removable if not the only channel.
  handleRemoveChannel() {
    this.props.removeChannel(this.props.id);
    this.props.setRemoveChannelNotification();
    this.props.showNotification();
  }

  handleDrop(event) {
    event.preventDefault();
    this.props.setDragFalse();

    let dropContainer = this.refs.drop;
    dropContainer.style.border = null;
    dropContainer.classList.add("border");

    this.props.addPatternToTimeline(
      this.props.pattern.patternID,
      this.props.id
    );
    this.props.setAddPatternToTimelineNotification();
    this.props.showNotification();

    // Dar reset ao padrão e criar um novo ID
  }
  handleDragOver(event) {
    event.preventDefault();

    let dropContainer = this.refs.drop;
    dropContainer.classList.remove("border");
    dropContainer.style.border = "2px dashed #5cb85c";
  }
  handleDragLeave(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    dropContainer.style.border = null;
    dropContainer.classList.add("border");
  }

  handleAddActuatorToChannel() {
    this.props.setAddActuatorToChannelNotification();
    this.props.showNotification();

    this.props.closeAddActuatorToChannelModal();
  }

  render() {
    return (
      <React.Fragment>
        <Row className="channel-row no-gutters flex-column">
          <div className="channel-id border rounded">
            <Button
              className="remove-channel"
              onClick={this.handleRemoveChannel}
              variant="light"
              size="sm"
            >
              <FontAwesomeIcon icon={faTimesCircle} size="xs" />
            </Button>
            <div className="channel-id-column">
              <p>Channel {this.props.id + 1}</p>
              <Button
                variant="link"
                size="sm"
                onClick={this.props.openAddActuatorToChannelModal}
              >
                Actuators
              </Button>
            </div>
          </div>
          <div
            className="channel-track border rounded"
            onDrop={this.handleDrop}
            onDragLeave={this.handleDragLeave}
            onDragOver={this.handleDragOver}
            ref={"drop"}
          >
            {this.props.dragActive ? (
              <p className="dropzone-content">
                Drop to add the pattern to the timeline
              </p>
            ) : (
              this.channelDisplay
            )}
          </div>
        </Row>

        <Modal
          show={this.props.setShow}
          // size="sm"
          backdrop="static"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Add Actuator to Channel
            </Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              onClick={this.handleAddActuatorToChannel}
            >
              Save Settings
            </Button>
            <Button
              variant="dark"
              onClick={this.props.closeAddActuatorToChannelModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
