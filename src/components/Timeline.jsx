import React from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";

import Channel from "./Channel";

const mapStateToProps = (state) => ({
  timeline_list: state.timeline,
});

class Timeline extends React.Component {
  items = [];
  componentDidMount() {
    console.log("render times");
    const channels = this.props.timeline_list.channel;
    this.items = channels.map((item) => (
      <Channel
        key={item._id}
        id={item._id}
        actuators={item.actuators}
        patterns={item.pattern}
      />
    ));
  }
  render() {
    return <Row className="timeline-container no-gutters ">{this.items}</Row>;
  }
}

export default connect(mapStateToProps)(Timeline);
