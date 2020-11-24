import React from "react";
import Database from "../utils/database";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showNotification } from "../stores/gui/guiActions";
import {
  setAddActuatorNotification,
  setAddChannelNotification,
  setCustomNotifications,
} from "../stores/notification/notificationAction";

import { addChannelToTimeline } from "../stores/timeline/timelineActions";
import { addNewActuator } from "../stores/device/deviceActions";

import {
  faUndo,
  faRedo,
  faPlayCircle,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showNotification,
      setAddActuatorNotification,
      setAddChannelNotification,
      setCustomNotifications,
      addChannelToTimeline,
      addNewActuator,
    },
    dispatch
  );

const mapStateToPorps = (state) => ({
  patterns: state.pattern.patterns,
  channels: state.timeline.channel,
  actuators: state.device.actuators_coords,
  timelineTime: state.timeline.timelineTime,
});

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddActuator = this.handleAddActuator.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.playVibration = this.playVibration.bind(this);
    // this.handlePlay = this.handlePlay.bind(this);
    // this.timelinePlay = this.timelinePlay.bind(this);
  }

  playVibration() {
    const patterns = this.props.patterns;
    const channels = this.props.channels;
    const fps = 5;

    let timelineData = [];
    channels.forEach((channel) => {
      let channelPatterns = [];
      let channelActuators = [];

      channel.actuators.forEach((id) => {
        channelActuators.push(this.getIndexById(id));
      });

      patterns.forEach((pattern) => {
        if (pattern.channelID === channel._id) {
          channelPatterns.push({
            datapoints: pattern.datapoints,
            startingTime: pattern.x,
          });
        }
      });
      timelineData.push({
        patterns: channelPatterns,
        actuators: channelActuators,
      });
    });

    const requestBody = {
      samplingRate: fps,
      numberOfActuators: this.props.actuators.length,
      channels: timelineData,
    };

    Database.postData("/vibrate", requestBody, "POST").then((data) => {
      if (data.status === 200) {
        this.props.setCustomNotifications(data.message, "Vibrotactile API");
      } else {
        this.props.setCustomNotifications(data.message, "Vibrotactile API");
      }
      this.props.showNotification();
    });
  }

  getIndexById(id) {
    for (let i = 0; i < this.props.actuators.length; i++) {
      if (this.props.actuators[i].id === id) return i;
    }
  }

  handleAddActuator() {
    this.props.addNewActuator();
    this.props.setAddActuatorNotification();
    this.props.showNotification();
  }

  handleAddChannel() {
    this.props.addChannelToTimeline();
    this.props.setAddChannelNotification();
    this.props.showNotification();
  }

  render() {
    return (
      <div className="border bg-light rounded w-50 ">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="justify-content-center align-items-center"
        >
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="light">
              <FontAwesomeIcon icon={faUndo} />
            </Button>
            <Button variant="light">
              <FontAwesomeIcon icon={faRedo} />
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="Second group">
            <Button variant="light">
              <FontAwesomeIcon icon={faBackward} />
            </Button>
            <Button variant="light" onClick={this.playVibration}>
              <FontAwesomeIcon size="2x" icon={faPlayCircle} />
            </Button>
            <Button variant="light">
              <FontAwesomeIcon icon={faForward} />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="sm" variant="light" onClick={this.handleAddChannel}>
              Add Channel
            </Button>
            <Button size="sm" variant="light" onClick={this.handleAddActuator}>
              Add Actuator
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

export default connect(mapStateToPorps, mapDispatchToProps)(Toolbar);
