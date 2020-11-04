import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Channel from "./Channel";
import Ruler from "./Ruler";
import "../../css/timeline.css";

const mapStateToProps = (state) => ({
  timeline_list: state.timeline,
  pattern: state.pattern,
});

class Timeline extends React.Component {
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
  render() {
    return (
      <Row className="timeline-container no-gutters">
        <Ruler {...this.props}></Ruler>
        {this.props.timeline_list.channel.map(this.renderTimelineChannels())}
      </Row>
    );
  }
}

export default connect(mapStateToProps)(Timeline);
