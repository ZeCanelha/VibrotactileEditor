import React from "react";
import Database from "../../utils/database";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showNotification } from "../../stores/gui/guiActions";
import {
  setAddChannelNotification,
  setCustomNotifications,
} from "../../stores/notification/notificationAction";

import { addChannelToTimeline } from "../../stores/timeline/timelineActions";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showNotification,

      setAddChannelNotification,
      setCustomNotifications,
      addChannelToTimeline,
    },
    dispatch
  );

const mapStateToProps = (state) => ({
  patterns: state.pattern.patterns,
  channels: state.timeline.channel,
  actuators: state.device.actuators_coords,
  timelineTime: state.timeline.timelineTime,
});

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.playVibration = this.playVibration.bind(this);
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

  handleAddChannel() {
    this.props.addChannelToTimeline();
    this.props.setAddChannelNotification();
    this.props.showNotification();
  }

  render() {
    return (
      <React.Fragment>
        <div className="channel-id">
          <Button className="add-channel-btn" variant="primary" size="sm">
            Add Channel
          </Button>
        </div>
        <div className="channel-track toolbar-channel">
          <button className="play-btn">
            <FontAwesomeIcon icon={faPlay} size={"lg"} />
          </button>
          <div className="toolbar-buttons">
            <Button className="sl-btn" variant="primary" size="sm">
              Library
            </Button>
            <Button className="sl-btn" variant="primary" size="sm">
              Save
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
