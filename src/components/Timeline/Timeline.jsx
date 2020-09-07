import React from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";

import Channel from "./Channel";

const mapStateToProps = (state) => ({
  timeline_list: state.timeline,
});

class Timeline extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.timeline_list.channel !== nextProps.timeline_list.channel)
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
        {this.props.timeline_list.channel.map(this.renderTimelineChannels())}
      </Row>
    );
  }
}

export default connect(mapStateToProps)(Timeline);
