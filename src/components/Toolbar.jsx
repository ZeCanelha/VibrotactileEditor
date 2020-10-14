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
    this.handlePlay = this.handlePlay.bind(this);
  }

  getIndexById(id) {
    for (let i = 0; i < this.props.actuators.length; i++) {
      if (this.props.actuators[i].id === id) return i;
    }
  }

  async handlePlay() {
    const channels = this.props.channels;
    const actuators = this.props.actuators;

    let maxLenght = 0;
    for (let index = 0; index < channels.length; index++) {
      if (channels[index].dataString) {
        if (channels[index].dataString.length > maxLenght) {
          maxLenght = channels[index].dataString.length;
        }
      }
    }

    for (let k = 0; k < maxLenght; k++) {
      let actuatorArray = new Array(actuators.length).fill(0.01);
      for (let i = 0; i < channels.length; i++) {
        if (channels[i].dataString) {
          if (typeof channels[i].dataString[k] === "undefined") {
            continue;
          } else {
            let value = parseInt(channels[i].dataString[k]) / 100;
            let currentActuators = channels[i].actuators;
            if (value !== 1) {
              for (let j = 0; j < currentActuators.length; j++) {
                let actuatorSelected = this.getIndexById(currentActuators[j]);
                actuatorArray[actuatorSelected] = value;
              }
            }
          }
        } else continue;
      }
      const body = {
        dataString: actuatorArray,
      };
      Database.postData("/actuate", body, "POST");
      this.sleep(5);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
            <Button variant="light" onClick={this.handlePlay}>
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
