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
import PatternUtils from "../../utils/patternUtil";

import {
  removeChannel,
  addPatternToChannel,
  removePatternFromChannel,
  setRemoveActuatorFromChannel,
  setAddActuatorToChannel,
  updateTimelineTime,
  updateChannelData,
} from "../../stores/timeline/timelineActions";

import {
  addPatternToList,
  removePatternFromList,
  setDisplayPattern,
  setCurrentPattern,
  updatePatternPosition,
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
      updateChannelData,
      updateTimelineTime,
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
      containerWidth: null,
    };
    this.getContainerSize = this.getContainerSize.bind(this);
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
    this.createChannelString = this.createChannelString.bind(this);
  }

  componentDidMount() {
    console.log("called after:");
    this.getChannelPatterns();
    this.getContainerSize();
    window.addEventListener("resize", this.getContainerSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getContainerSize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.patterns !== prevProps.patterns) {
      this.getChannelPatterns();
      this.createChannelString();
    }
  }

  createChannelString() {
    const patterns = this.props.patterns.filter((pattern) => {
      return pattern.channelID === this.props.id;
    });

    // const emptySpace = Math.floor(this.props.timeline.timelineTime * data.x / this.state.containerWidth)
    const parentChannel = this.refs.channel;
    const channelPatterns = Array.from(parentChannel.children);
    let startTime = [];
    let patternMaxTime = 0;
    let channelString = "";

    // get starting positions
    if (patterns.length > 0) {
      console.log(patterns);
      channelPatterns.forEach((element, i) => {
        const startingX = element.offsetLeft + patterns[i].x;
        let convert = Math.floor(
          (this.props.timeline.timelineTime * startingX) /
            this.state.containerWidth
        );
        if (convert < 0) {
          convert = 0;
        }
        startTime.push({
          time: convert,
          pattern: i,
        });
      });

      startTime.sort((a, b) => a.time > b.time);
      for (let i = 0; i < startTime.length; i++) {
        const patternPoints = PatternUtils.patternToString(
          patterns[startTime[i].pattern].datapoints
        );

        let fillTime = startTime[i].time - patternMaxTime;
        let fillIntensity = fillTime / 5;
        channelString += "1;".repeat(fillIntensity);
        channelString += patternPoints;
        patternMaxTime = Math.max.apply(
          Math,
          patterns[startTime[i].pattern].datapoints.map((d) => d.time)
        );
      }

      this.props.updateChannelData(this.props.id, channelString);
    }
  }

  getContainerSize() {
    const { containerWidth } = this.state;
    const currentContainerWidth = this.refs.channel.getBoundingClientRect()
      .width;
    const shouldResize = containerWidth !== currentContainerWidth;

    if (shouldResize) {
      this.setState({
        containerWidth: currentContainerWidth,
      });
    }
  }

  getChannelPatterns() {
    let filteredPatterns = [];
    let currentTime = 0;
    let pattern = this.props.patterns;
    for (let index = 0; index < pattern.length; index++) {
      if (pattern[index].channelID === this.props.id) {
        currentTime += Math.max.apply(
          Math,
          pattern[index].datapoints.map((d) => d.time)
        );
        filteredPatterns.push({
          patternID: pattern[index].patternID,
          area: pattern[index].area,
          datapoints: pattern[index].datapoints,
          index: index,
          x: pattern[index].x,
          y: pattern[index].y,
        });
      }
    }
    if (currentTime >= this.props.timeline.timelineTime) {
      this.props.updateTimelineTime(currentTime + 100);
    }
    console.log("Setting state:");
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
    const emptySpace = Math.floor(
      (this.props.timeline.timelineTime * data.x) / this.state.containerWidth
    );

    let coords = {
      x: data.x,
      emptyTime: emptySpace,
    };
    this.props.updatePatternPosition(index, coords);
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
            ref={"channel"}
          >
            {this.state.patterns.length > 0 ? (
              <ChannelItems
                patternList={this.state.patterns}
                timelineWidth={this.state.containerWidth}
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
