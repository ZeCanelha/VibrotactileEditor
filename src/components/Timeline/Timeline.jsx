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
    const channels = this.props.timeline_list.channel;
    this.items = channels.map((item) => (
      <Channel key={item._id} id={item._id} />
    ));
  }
  render() {
    return <Row className="timeline-container no-gutters">{this.items}</Row>;
  }
}

export default connect(mapStateToProps)(Timeline);
