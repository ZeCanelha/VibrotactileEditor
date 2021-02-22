import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Row from "react-bootstrap/Row";
import Channel from "./Channel";
import Ruler from "./Ruler";
import Toolbar from "./Toolbar";
import "../../css/timeline.css";

import { updateTimelineTime } from "../../stores/timeline/timelineActions";

const mapStateToProps = (state) => ({
  timeline_list: state.timeline,
  pattern: state.pattern,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateTimelineTime }, dispatch);

class Timeline extends React.Component {
  constructor() {
    super();
    this.handleChangeTimelineTime = this.handleChangeTimelineTime.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (
      this.props.timeline_list.channel !== nextProps.timeline_list.channel ||
      this.props.pattern.patterns !== nextProps.pattern.patterns ||
      this.props.timeline_list.timelineTime !==
        nextProps.timeline_list.timelineTime
    )
      return true;
    return false;
  }
  renderTimelineChannels() {
    return (channel, index) => {
      console.log(channel);
      return <Channel key={index} id={index}></Channel>;
    };
  }
  handleChangeTimelineTime(event) {
    console.log(event);
    this.props.updateTimelineTime(event.target.value);
  }
  render() {
    return (
      <Row className="timeline-container no-gutters">
        <Row className="ruler-row no-gutters">
          <Ruler
            {...this.props}
            onTimelineChange={this.handleChangeTimelineTime}
          ></Ruler>
        </Row>

        <div className="channel-container">
          {this.props.timeline_list.channel.map(this.renderTimelineChannels())}
        </div>
        <Row className="toolbar-row no-gutters">
          <Toolbar></Toolbar>
        </Row>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
