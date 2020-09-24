import React from "react";
import * as d3 from "d3";

class DisplayPattern extends React.Component {
  componentDidMount() {
    // Scale factor to fit the path in the container
    this.fitToParent();
  }

  componentDidUpdate() {
    this.fitToParent();
  }

  fitToParent() {
    const width = this.refs.svgRef.clientWidth;
    const height = this.refs.svgRef.clientHeight;
    const viewBox = "0 0 " + width + " " + height;
    let path = this.refs.path;
    let pathW = path.getBBox().width;
    let pathH = path.getBBox().height;
    let scaleX = width / pathW;
    let scaleY = height / pathH;
    d3.select(this.refs.svgRef).attr("viewBox", viewBox);
    d3.select(this.refs.path).attr(
      "transform",
      "scale(" +
        scaleX +
        "," +
        scaleY +
        ") translate(" +
        -path.getBBox().x +
        "," +
        -path.getBBox().y +
        ")"
    );
  }

  render() {
    return (
      <svg
        ref={"svgRef"}
        preserveAspectRatio="xMidYMid meet"
        className="display-pattern-container"
      >
        <path
          ref={"path"}
          d={this.props.path}
          fill="#5bc0de"
          stroke={"0275d8"}
          strokeWidth={"1.5px"}
        ></path>
      </svg>
    );
  }
}

export default DisplayPattern;
