import React from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";

import Channel from "./channel";

const mapStateToProps = (state) => ({
  timeline_list: state.config.timeline,
});

const timeline = (props) => {
  console.log(props);
  const channels = props.timeline_list.channel;
  const items = channels.map((item) => (
    <Channel
      key={item._id}
      id={item._id}
      actuators={item.actuatos}
      patterns={item.patterns}
    />
  ));
  return <Row className="timeline-container no-gutters ">{items}</Row>;
};

export default connect(mapStateToProps)(timeline);
