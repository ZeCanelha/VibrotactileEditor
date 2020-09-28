import React from "react";
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

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddActuator = this.handleAddActuator.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay() {
    console.log("play");
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
            <Button variant="light">
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

export default connect(null, mapDispatchToProps)(Toolbar);
