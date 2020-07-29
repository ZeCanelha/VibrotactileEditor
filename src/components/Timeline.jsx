import React from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";

import Channel from "./Channel";

const mapStateToProps = (state) => ({
  timeline_list: state.timeline,
});

class Timeline extends React.Component {
  render() {
    const channels = this.props.timeline_list.channel;
    const items = channels.map((item) => (
      <Channel
        key={item._id}
        id={item._id}
        actuators={item.actuatos}
        patterns={item.patterns}
      />
    ));
    return <Row className="timeline-container no-gutters ">{items}</Row>;
  }
}

export default connect(mapStateToProps)(Timeline);
