import React from "react";

import Display from "./DisplayPattern";

import {
  removeChannel,
  addPatternToTimeline,
} from "../stores/timeline/timelineActions";
import {
  setAddPatternToTimelineNotification,
  setRemoveChannelNotification,
} from "../stores/notification/notificationAction";
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
      addPatternToTimeline,
      setAddPatternToTimelineNotification,
      setRemoveChannelNotification,
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
    this.handleRemoveChannel = this.handleRemoveChannel.bind(this);
  }

  channelDisplay = null;

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    // Se um novo pattern for adicionado a um canal da timeline, re-render dos channels

    if (prevProps.timeline.channel !== this.props.timeline.channel) {
      console.log("Novo pattern adicionado a um canal");
      this.channelDisplay = this.renderPatternsToTimeline();
      this.forceUpdate();
    }
  }

  renderPatternsToTimeline() {
    // TODO: Col must have dynamic width according to the pattern time
    // TODO: lookup do ID na bd e buscar o path; assim fica sempre o mesmo

    let renderArray = [];
    for (
      let index = 0;
      index < this.props.timeline.channel[this.props.id].pattern.length;
      index++
    ) {
      renderArray.push(
        <Col
          className="timeline-display"
          key={this.props.pattern.id}
          xs={6}
          md={4}
        >
          <Display
            key={this.props.pattern.id}
            id={this.props.pattern.id}
            path={this.props.pattern.area}
          ></Display>
        </Col>
      );
    }

    return renderArray;
  }

  // TODO:  Removable if not the only channel.
  handleRemoveChannel() {
    this.props.removeChannel(this.props.id);
    this.props.setRemoveChannelNotification();
    this.props.showNotification();
  }

  handleDrop(event) {
    event.preventDefault();

    this.props.addPatternToTimeline(this.props.pattern.id, this.props.id);

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
            onClick={this.handleRemoveChannel}
            variant="light"
            size="sm"
          >
            <FontAwesomeIcon icon={faTimesCircle} size="xs" />
          </Button>
          Channel {this.props.id + 1}
          <br></br>
          Actuators {this.props.actuators}
        </div>
        <div
          className="channel-track border rounded"
          onDrop={this.handleDrop}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          ref={"drop"}
        >
          {this.channelDisplay}
        </div>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
