import React from "react";
import * as d3 from "d3";

import PatternUtils from "../utils/patternUtil";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  updateAreaChart,
  updateDataPoints,
} from "../stores/pattern/patternActions";

const margin = { top: 10, right: 0, bottom: 0, left: 40 };

const mapStateToProps = (state) => ({
  datapoints: state.pattern.datapoints,
  area: state.pattern.area,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateAreaChart,
      updateDataPoints,
    },
    dispatch
  );

class PatternEditor extends React.Component {
  xScale = null;
  yScale = null;

  addDatapoint(coords) {
    let newPoints = {
      time: Math.round(this.xScale.invert(coords[0])),
      intensity: Math.round(this.yScale.invert(coords[1])),
    };
    // update datapoints in time
    let datapoints = this.props.datapoints;

    // Bisect function - Returns the insertion point for x in array to maintain sorted order

    let bisect = d3.bisector((d) => d.time).right;
    let index = bisect(datapoints, newPoints.time);

    datapoints.splice(index, 0, newPoints);
    this.props.updateDataPoints(datapoints);

    // TODO assign the attributes to an object
  }

  drawKeyFrames() {
    let svg = d3.select(this.refs.pattern);
    svg
      .selectAll("circle")
      .data(this.props.datapoints)
      .join(
        (enter) => enter.append("circle"),
        (update) => update,
        (exit) => exit.remove()
      )
      .attr("cx", (d) => this.xScale(d.time))
      .attr("cy", (d) => this.yScale(d.intensity))
      .attr("r", 5)
      .attr("fill", "#d9534f");
    // .on("mouseover", this.handleMouseOver)
    // .on("mouseout", this.handleMouseOut)
    // .call(
    //   d3
    //     .drag()
    //     .on("start", this.draggStarted)
    //     .on("drag", this.dragged)
    //     .on("end", this.dragended)
    // );
  }

  componentDidMount() {
    let theobject = this;

    const width = this.refs.pattern.clientWidth;
    const height = this.refs.pattern.clientHeight;

    // Create scales

    this.xScale = PatternUtils.createScale("xScale", width, height, margin);
    this.yScale = PatternUtils.createScale("yScale", width, height, margin);

    this.xScale.domain([0, 350]);
    this.yScale.domain([100, 0]);

    // Create Axis

    const xAxis = PatternUtils.createAxis("x", this.xScale);
    const yAxis = PatternUtils.createAxis("y", this.yScale);

    yAxis.ticks(4);

    // Call the axis

    d3.select(this.refs.xAxis)
      .attr("transform", "translate(" + [0, height - margin.bottom] + ")")
      .call(xAxis);
    d3.select(this.refs.yAxis)
      .attr("transform", "translate(" + [margin.left, 0] + ")")
      .call(yAxis);

    // Set the datapoints

    const areaGenerator = PatternUtils.createChart(
      "area",
      this.props.datapoints,
      this.xScale,
      this.yScale,
      height,
      margin
    );

    // Draw keyframes

    this.drawKeyFrames();

    // Update areaChart in store

    this.props.updateAreaChart(areaGenerator);

    // Add event to the svg

    d3.select(this.refs.pattern).on("dblclick", function () {
      let coords = d3.mouse(this);
      theobject.addDatapoint(coords);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(this.props.datapoints);

    if (prevProps.datapoints !== this.props.datapoints) {
      console.log("Diff props");
    }
  }
  render() {
    const svg_style = {
      // border: "1px solid #5bc0de",
      width: "50%",
      height: "100%",
    };
    return (
      <svg
        style={svg_style}
        viewBox="0 0 525 275"
        preserveAspectRatio="xMidYMid meet"
        ref="pattern"
      >
        <path d={this.props.area} fill="#5bc0de" stroke="#0275d8"></path>
        <g>
          <g ref={"xAxis"}></g>
          <g ref={"yAxis"}></g>
        </g>
      </svg>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
