import React from "react";
import ChannelItems from "./ChannelItem";
import ActuatorItem from "./ActuatorItem";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Util from "../../utils/util";

import {
  removeChannel,
  addPatternToChannel,
  removePatternFromChannel,
  setRemoveActuatorFromChannel,
  setAddActuatorToChannel,
} from "../../stores/timeline/timelineActions";

import {
  addPatternToList,
  removePatternFromList,
  setDisplayPattern,
  setCurrentPattern,
} from "../../stores/pattern/patternActions";
import {
  setAddPatternToTimelineNotification,
  setRemoveChannelNotification,
  setAddActuatorToChannelNotification,
  setRemovePatternFromTimelineNotification,
} from "../../stores/notification/notificationAction";
import { showNotification } from "../../stores/gui/guiActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addPatternToList,
      removePatternFromList,
      setDisplayPattern,
      setCurrentPattern,
      removeChannel,
      addPatternToChannel,
      removePatternFromChannel,
      setRemoveActuatorFromChannel,
      setAddActuatorToChannel,
      setAddPatternToTimelineNotification,
      setAddActuatorToChannelNotification,
      setRemoveChannelNotification,
      setRemovePatternFromTimelineNotification,
      showNotification,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  patternList: state.pattern.patterns,
  device: state.device,
  setShow: state.gui.isAddActuatorToChannelModalOpen,
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
    this.handleAddPatternToChannel = this.handleAddPatternToChannel.bind(this);
  }

  // -------------- Actuator and channel functions -------------------------

  handleAddActuatorToChannel() {
    this.props.setAddActuatorToChannelNotification();
    this.props.showNotification();
    this.handleActuatorModal();
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

  // ----------------- Channel Items functions ---------------------------

  // Add default pattern to timeline

  handleAddPatternToChannel() {
    // TODO: Position

    let pattern = Util.defaultPattern();
    let patternID = pattern.patternID;

    // Add pattern to pattern list

    console.log(pattern);

    this.props.addPatternToList(pattern);

    // // Add pattern id to this channel list
    this.props.addPatternToChannel(patternID, this.props.id);

    this.props.setCurrentPattern(this.props.patternList.length);
    this.props.setDisplayPattern();
  }

  handleRemovePattern(index) {
    this.props.removePatternFromTimeline(index, this.props.id);
    this.props.setRemovePatternFromTimelineNotification();
    this.props.showNotification();
  }

  handleOpenInEditor(index) {}
  handleDrop(event) {}
  handleDragOver(event) {}
  handleDragLeave(event) {}

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
            {this.props.timeline.channel[this.props.id].pattern.length ? (
              <ChannelItems
                patternList={this.props.patternList}
                channel={this.props.timeline.channel[this.props.id].pattern}
                {...this.props}
                removePattern={this.handleRemovePattern}
                openInEditor={this.handleOpenInEditor}
                addNewPattern={this.handleAddPatternToChannel}
              ></ChannelItems>
            ) : (
              <div className="empty-channel">
                <Button
                  variant="primary"
                  onClick={this.handleAddPatternToChannel}
                >
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </Button>
                <p>
                  Click to add a <strong>pattern</strong>
                </p>
              </div>
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
              actuators={this.props.device.actuators_coords}
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
