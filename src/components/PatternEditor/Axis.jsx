import React from "react";
import * as d3 from "d3";

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node = this.refs.axis;
    let axis =
      this.props.orient === "left"
        ? d3.axisLeft().ticks(5).scale(this.props.scale)
        : d3.axisBottom().ticks(6).scale(this.props.scale);
    d3.select(node).transition().duration(500).call(axis);
  }

  render() {
    return (
      <g className="axis" ref={"axis"} transform={this.props.translate}></g>
    );
  }
}
