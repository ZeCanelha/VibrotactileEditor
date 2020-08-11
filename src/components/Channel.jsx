import React from "react";

import Display from "./DisplayPattern";

import { removeChannel, setActuator } from "../stores/timeline/timelineActions";
import { setAddPatternToTimelineNotification } from "../stores/notification/notificationAction";
import { showNotification } from "../stores/gui/guiActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      removeChannel,
      setActuator,
      setAddPatternToTimelineNotification,
      showNotification,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  pattern: state.pattern,
});

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  handleDrop(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    let container = document.createElement("div");

    dropContainer.style.border = null;
    dropContainer.classList.add("border");
    container.classList.add("dropped-pattern");

    dropContainer.appendChild(container);

    this.props.setAddPatternToTimelineNotification();
    this.props.showNotification();
  }
  handleDragOver(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    dropContainer.classList.remove("border");
    dropContainer.style.border = "1px dashed #5cb85c";
  }
  handleDragLeave(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    dropContainer.style.border = null;
    dropContainer.classList.add("border");
  }

  render() {
    return (
      <Row className="channel-row no-gutters flex-column">
        <div className="channel-id border rounded">
          <Button
            className="remove-channel"
            onClick={() => this.props.removeChannel(this.props.id)}
            variant="light"
            size="sm"
          >
            <FontAwesomeIcon icon={faTimesCircle} size="xs" />
          </Button>
          Channel {this.props.id}
          <br></br>
          Actuators {this.props.actuators}
        </div>
        <div
          className="channel-track border rounded"
          onDrop={this.handleDrop}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          ref={"drop"}
        ></div>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
