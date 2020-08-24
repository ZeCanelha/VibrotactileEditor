import React from "react";

import Display from "./DisplayPattern";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  removeChannel,
  addPatternToTimeline,
} from "../stores/timeline/timelineActions";
import {
  setAddPatternToTimelineNotification,
  setRemoveChannelNotification,
} from "../stores/notification/notificationAction";
import { showNotification } from "../stores/gui/guiActions";

import {
  setPatternId,
  setInitialDatapoints,
} from "../stores/pattern/patternActions";

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
      setPatternId,
      setInitialDatapoints,
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

  channelDisplay = [];

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    // Se um novo pattern for adicionado a um canal da timeline, re-render dos channels

    if (
      prevProps.timeline.channel[this.props.id] !==
      this.props.timeline.channel[this.props.id]
    ) {
      console.log("Novo pattern adicionado a um canal");
      this.renderPatternsToTimeline();
      this.forceUpdate();
    }
  }

  renderPatternsToTimeline() {
    this.channelDisplay.push(
      <Col
        className="timeline-display"
        key={this.props.pattern.patternID}
        xs={6}
        md={4}
      >
        <Display
          key={this.props.pattern.patternID}
          id={this.props.pattern.patternID}
          path={this.props.pattern.area}
        ></Display>
      </Col>
    );

    this.props.setInitialDatapoints();
    this.props.setPatternId();
  }

  // TODO:  Removable if not the only channel.
  handleRemoveChannel() {
    this.props.removeChannel(this.props.id);
    this.props.setRemoveChannelNotification();
    this.props.showNotification();
  }

  handleDrop(event) {
    event.preventDefault();

    let dropContainer = this.refs.drop;
    dropContainer.style.border = null;
    dropContainer.classList.add("border");

    this.props.addPatternToTimeline(
      this.props.pattern.patternID,
      this.props.id
    );
    this.props.setAddPatternToTimelineNotification();
    this.props.showNotification();

    // Dar reset ao padrão e criar um novo ID
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
              <Button variant="link" size="sm">
                Actuators
              </Button>
            </div>
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
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
