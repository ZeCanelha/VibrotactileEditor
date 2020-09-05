import React from "react";

import ChannelItems from "./ChannelItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  removeChannel,
  addPatternToTimeline,
  setUploadingDataFalse,
  removePatternFromTimeline,
} from "../../stores/timeline/timelineActions";
import {
  setAddPatternToTimelineNotification,
  setRemoveChannelNotification,
  setAddActuatorToChannelNotification,
  setRemovePatternFromTimelineNotification,
} from "../../stores/notification/notificationAction";
import {
  showNotification,
  closeAddActuatorToChannelModal,
  openAddActuatorToChannelModal,
  setDragActive,
  setDragFalse,
} from "../../stores/gui/guiActions";

import {
  setPatternId,
  setInitialDatapoints,
  importDatapoints,
} from "../../stores/pattern/patternActions";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      removeChannel,
      addPatternToTimeline,
      removePatternFromTimeline,
      setAddPatternToTimelineNotification,
      setAddActuatorToChannelNotification,
      setRemoveChannelNotification,
      setRemovePatternFromTimelineNotification,
      showNotification,
      setPatternId,
      setInitialDatapoints,
      importDatapoints,
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
    this.handleRemovePattern = this.handleRemovePattern.bind(this);
    this.handleAddActuatorToChannel = this.handleAddActuatorToChannel.bind(
      this
    );
    this.handleOpenInEditor = this.handleOpenInEditor.bind(this);
  }

  // TODO:  Removable if not the only channel.
  handleRemoveChannel() {
    this.props.removeChannel(this.props.id);
    this.props.setRemoveChannelNotification();
    this.props.showNotification();
  }

  handleRemovePattern(index) {
    this.props.setRemovePatternFromTimelineNotification();
    this.props.showNotification();
  }

  handleOpenInEditor(index) {
    let pattern = this.props.timeline.channel[this.props.id].pattern[index];

    this.props.removePatternFromTimeline(index, this.props.id);
    this.props.setPatternId(pattern.id);
    this.props.importDatapoints(pattern.datapoints);
  }

  handleDrop(event) {
    event.preventDefault();
    this.props.setDragFalse();

    let dropContainer = this.refs.drop;
    dropContainer.style.border = null;
    dropContainer.classList.add("border");

    const patternObject = {
      id: this.props.pattern.patternID,
      path: this.props.pattern.area,
      datapoints: this.props.pattern.datapoints,
    };

    this.props.addPatternToTimeline(patternObject, this.props.id);

    // Dar reset ao padrão e criar um novo ID

    this.props.setInitialDatapoints();
    this.props.setPatternId();

    this.props.setAddPatternToTimelineNotification();
    this.props.showNotification();
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
            className="channel-track border rounded no-gutters"
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
              <ChannelItems
                channel={this.props.timeline.channel[this.props.id].pattern}
                {...this.props}
                removePattern={this.handleRemovePattern}
                openInEditor={this.handleOpenInEditor}
              ></ChannelItems>
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
