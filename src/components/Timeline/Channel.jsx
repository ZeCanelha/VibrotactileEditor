import React from "react";
import ChannelItems from "./ChannelItem";
import ActuatorItem from "./ActuatorItem";
import ChannelHeader from "./ChannelHeader";
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
  updatePatternPosition,
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
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addPatternToList,
      removePatternFromList,
      setDisplayPattern,
      setCurrentPattern,
      updatePatternPosition,
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
  patterns: state.pattern.patterns,
  currentShowing: state.pattern.currentPatternIndex,
  isPatternDisplayed: state.pattern.isPatternDisplayed,
  device: state.device,
});

class Channel extends React.Component {
  constructor(props) {
    super(props);

    // State component for actuator configuration
    this.state = {
      openActuatorModal: false,
      patterns: [],
    };
    this.getChannelPatterns = this.getChannelPatterns.bind(this);
    this.handleStop = this.handleStop.bind(this);

    this.handleRemoveChannel = this.handleRemoveChannel.bind(this);
    this.handleRemovePattern = this.handleRemovePattern.bind(this);
    this.handleAddActuatorToChannel = this.handleAddActuatorToChannel.bind(
      this
    );
    this.handleOpenInEditor = this.handleOpenInEditor.bind(this);
    this.handleActuatorModal = this.handleActuatorModal.bind(this);
    this.handleAddPatternToChannel = this.handleAddPatternToChannel.bind(this);
  }

  componentDidMount() {
    this.getChannelPatterns();
  }

  componentDidUpdate(prevProps) {
    if (this.props.patterns !== prevProps.patterns) {
      this.getChannelPatterns();
    }
  }

  getChannelPatterns() {
    let filteredPatterns = [];
    let pattern = this.props.patterns;
    for (let index = 0; index < pattern.length; index++) {
      if (pattern[index].channelID === this.props.id) {
        filteredPatterns.push({
          patternID: pattern[index].patternID,
          area: pattern[index].area,
          index: index,
        });
      }
    }
    this.setState({ patterns: filteredPatterns });
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
    let pattern = Util.defaultPattern();

    pattern.channelID = this.props.id;

    // Add pattern to pattern list and channel id
    this.props.addPatternToList(pattern);

    // // Add pattern id to this channel list
    this.props.setCurrentPattern(this.props.patterns.length);
    this.props.setDisplayPattern(true);
  }

  handleRemovePattern(patternListIndex) {
    this.props.removePatternFromList(patternListIndex);
    this.props.setDisplayPattern(false);
    this.props.setRemovePatternFromTimelineNotification();
    this.props.showNotification();
  }

  handleOpenInEditor(patternListIndex) {
    this.props.setCurrentPattern(patternListIndex);
    this.props.setDisplayPattern(true);
  }

  handleStop(event, data, index) {
    let coords = {
      x: data.x,
      y: 0,
    };
    this.props.updatePatternPosition(this.props.id, index, coords);
  }

  render() {
    return (
      <React.Fragment>
        <Row className="channel-row no-gutters flex-column">
          <ChannelHeader
            id={this.props.id}
            handleRemoveChannel={this.handleRemoveChannel}
            handleActuatorModal={this.handleActuatorModal}
          ></ChannelHeader>
          <div
            className="channel-track border rounded no-gutters"
            onDrop={this.handleDrop}
            onDragLeave={this.handleDragLeave}
            onDragOver={this.handleDragOver}
            ref={"drop"}
          >
            {this.state.patterns.length > 0 ? (
              <ChannelItems
                patternList={this.state.patterns}
                {...this.props}
                handleStop={this.handleStop}
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
