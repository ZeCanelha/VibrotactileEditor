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
        pattern: channelPatterns,
        actuators: channelActuators,
      });
    });

    const requestBody = {
      fps: fps,
      projectActuators: this.props.actuators.length,
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

  // getChannelData() {
  //   const channels = this.props.channels;
  //   const patterns = this.props.patterns;

  //   let timelineData = [];

  //   channels.forEach((channel) => {
  //     let channelPatterns = [];
  //     patterns.forEach((pattern, i) => {
  //       if (pattern.channelID === channel._id) channelPatterns.push(pattern);
  //     });

  //     channelPatterns.sort((a, b) => a.x - b.x);

  //     let channelString = "";
  //     let maxTime = 0;
  //     channelPatterns.forEach((pattern) => {
  //       let patternPoints = PatternUtils.patternToString(pattern.datapoints);
  //       let startTime = pattern.x;
  //       let fillTime = startTime - maxTime;
  //       let fillIntensity = fillTime / 5;

  //       channelString += "1;".repeat(fillIntensity);
  //       channelString += patternPoints;

  //       maxTime += Math.max.apply(
  //         Math,
  //         pattern.datapoints.map((d) => d.time)
  //       );
  //     });
  //     timelineData.push(channelString.split(";"));
  //   });
  //   return timelineData;
  // }

  // timelinePlay() {
  //   const timelineData = this.getChannelData();
  //   const projectActuators = this.props.actuators.length;
  //   const channels = this.props.channels;

  //   let channelData = [];
  //   channels.forEach((channel) => {
  //     let actuators = [];
  //     for (let index = 0; index < channel.actuators.length; index++) {
  //       actuators.push(this.getIndexById(channel.actuators[index]));
  //     }
  //     channelData.push(actuators);
  //   });

  //   console.log(timelineData);

  //   const body = {
  //     timelineData: timelineData,
  //     projectActuators: projectActuators,
  //     channelData: channelData,
  //   };

  //   Database.postData("/play", body, "POST");
  // }

  // async handlePlay() {
  //   const timelineData = this.getChannelData();

  //   const actuators = this.props.actuators;
  //   const channels = this.props.channels;

  //   let maxLenght = 0;
  //   for (let index = 0; index < timelineData.length; index++) {
  //     if (timelineData[index].length > maxLenght) {
  //       maxLenght = timelineData[index].length;
  //     }
  //   }

  //   for (let k = 0; k < maxLenght; k++) {
  //     let actuatorArray = new Array(actuators.length).fill(0.01);
  //     for (let i = 0; i < timelineData.length; i++) {
  //       if (timelineData[i].length > 1) {
  //         if (typeof timelineData[i][k] === "undefined") {
  //           continue;
  //         } else {
  //           let value = parseInt(timelineData[i][k]) / 100;
  //           let currentActuators = channels[i].actuators;
  //           if (value !== 0) {
  //             if (k !== maxLenght - 1) {
  //               for (let j = 0; j < currentActuators.length; j++) {
  //                 let actuatorSelected = this.getIndexById(currentActuators[j]);
  //                 actuatorArray[actuatorSelected] = value;
  //               }
  //             }
  //           }
  //         }
  //       } else continue;
  //     }
  //     console.log(actuatorArray);
  //     const body = {
  //       dataString: actuatorArray,
  //     };
  //     Database.postData("/actuate", body, "POST");
  //     await this.sleep(5);
  //   }
  // }

  // sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

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
