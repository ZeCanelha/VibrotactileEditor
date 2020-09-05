import React from "react";

import ChannelItems from "./ChannelItem";
import ActuatorItem from "./ActuatorItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  removeChannel,
  addPatternToTimeline,
  removePatternFromTimeline,
  setRemoveActuatorFromChannel,
  setAddActuatorToChannel,
} from "../../stores/timeline/timelineActions";
import {
  setAddPatternToTimelineNotification,
  setRemoveChannelNotification,
  setAddActuatorToChannelNotification,
  setRemovePatternFromTimelineNotification,
} from "../../stores/notification/notificationAction";
import {
  showNotification,
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
      setRemoveActuatorFromChannel,
      setAddActuatorToChannel,
      setAddPatternToTimelineNotification,
      setAddActuatorToChannelNotification,
      setRemoveChannelNotification,
      setRemovePatternFromTimelineNotification,
      showNotification,
      setPatternId,
      setInitialDatapoints,
      importDatapoints,
      setDragActive,
      setDragFalse,
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

    // State component for actuator configuration
    this.state = {
      openActuatorModal: false,
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleRemoveChannel = this.handleRemoveChannel.bind(this);
    this.handleRemovePattern = this.handleRemovePattern.bind(this);
    this.handleAddActuatorToChannel = this.handleAddActuatorToChannel.bind(
      this
    );
    this.handleOpenInEditor = this.handleOpenInEditor.bind(this);
    this.handleActuatorModal = this.handleActuatorModal.bind(this);
  }

  handleActuatorModal() {
    if (this.state.openActuatorModal) {
      this.props.setAddActuatorToChannelNotification();
      this.props.showNotification();
    }
    this.setState({ openActuatorModal: !this.state.openActuatorModal });
  }

  // TODO:  Removable if not the only channel.
  handleRemoveChannel() {
    this.props.removeChannel(this.props.id);
    this.props.setRemoveChannelNotification();
    this.props.showNotification();
  }

  handleRemovePattern(index) {
    this.props.removePatternFromTimeline(index, this.props.id);
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

    this.handleActuatorModal();
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
                onClick={this.handleActuatorModal}
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
          show={this.state.openActuatorModal}
          backdrop="static"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Add Actuator to Channel
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ActuatorItem
              nActuators={this.props.device.actuators}
              channelActuators={
                this.props.timeline.channel[this.props.id].actuators
              }
              addActuator={this.props.setAddActuatorToChannel}
              removeActuator={this.props.setRemoveActuatorFromChannel}
              id={this.props.id}
            ></ActuatorItem>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleActuatorModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
