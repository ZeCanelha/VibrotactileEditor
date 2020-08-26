import React from "react";
import * as d3 from "d3";

import PatternUtils from "../utils/patternUtil";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  updateAreaChart,
  updateDataPoints,
} from "../stores/pattern/patternActions";

import { setDragActive, setDragFalse } from "../stores/gui/guiActions";

const margin = { top: 10, right: 30, bottom: 30, left: 40 };
let fix = null;

const mapStateToProps = (state) => ({
  datapoints: state.pattern.datapoints,
  area: state.pattern.area,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateAreaChart,
      updateDataPoints,
      setDragActive,
      setDragFalse,
    },
    dispatch
  );

class PatternEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragStart() {
    this.props.setDragActive();
  }
  handleDragEnd() {
    this.props.setDragFalse();
  }

  xScale = null;
  yScale = null;
  areaGenerator = null;

  addDatapoint(coords) {
    let newPoints = {
      time: Math.round(this.xScale.invert(coords[0])),
      intensity: Math.round(this.yScale.invert(coords[1])),
    };

    // Set the boundaries
    // fix max value. rn fixed
    if (
      newPoints.time > 0 &&
      newPoints.time < 350 &&
      newPoints.intensity <= 100 &&
      newPoints.intensity >= 0
    ) {
      // update datapoints in time
      let datapoints = this.props.datapoints;

      // Returns the insertion point for x in array to maintain sorted order

      let index = PatternUtils.getInsertionPoint(datapoints, newPoints.time);

      datapoints.splice(index, 0, newPoints);
      this.props.updateDataPoints(datapoints);
    }

    // TODO assign the attributes to an object
  }

  handleMouseOver() {
    d3.select(this).attr("r", "8");
  }
  handleMouseOut() {
    d3.select(this).attr("r", "5");
  }

  dragStarted(d) {
    console.log("started");
  }
  dragged(d) {
    d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
  }
  dragEnded(d) {
    let index = PatternUtils.getInsertionPoint(
      fix.props.datapoints,
      d3.event.x
    );
    let newPoints = {
      time: Math.round(fix.xScale.invert(d3.event.x)),
      intensity: Math.round(fix.yScale.invert(d3.event.y)),
    };
    let datapoints = fix.props.datapoints;
    datapoints.splice(index, 0, newPoints);
    fix.props.updateDataPoints(datapoints);
  }

  drawKeyFrames() {
    let svg = d3.select(this.refs.svg);
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
      .attr("fill", "#d9534f")
      .on("mouseover", this.handleMouseOver)
      .on("mouseout", this.handleMouseOut)
      .call(
        d3
          .drag()
          .on("start", this.dragStarted)
          .on("drag", this.dragged)
          .on("end", this.dragEnded)
      );
  }

  componentDidMount() {
    let theobject = this;
    fix = this;

    const width = this.refs.pattern.clientWidth;
    const height = this.refs.pattern.clientHeight;

    const viewBox = "0 0 " + width + " " + height;

    // Set witdh and viewBox

    // d3.select(this.refs.svg).attr("width", width).attr("height", height);
    d3.select(this.refs.svg).attr("viewBox", viewBox);

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

    this.areaGenerator = PatternUtils.createChart(
      "area",
      this.xScale,
      this.yScale,
      height,
      margin
    );

    // Draw keyframes

    this.drawKeyFrames();

    // Update areaChart in store

    this.props.updateAreaChart(this.areaGenerator(this.props.datapoints));

    // Add event to the svg

    d3.select(this.refs.svg).on("dblclick", function () {
      let coords = d3.mouse(this);
      theobject.addDatapoint(coords);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datapoints !== this.props.datapoints) {
      console.log(this.props.datapoints);
      this.drawKeyFrames();
      this.props.updateAreaChart(this.areaGenerator(this.props.datapoints));
    }
  }
  render() {
    return (
      <div
        className="pattern-container"
        ref="pattern"
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      >
        <svg ref="svg" preserveAspectRatio="xMidYMid meet">
          <path d={this.props.area} fill="#5bc0de" stroke="#0275d8"></path>
          <g>
            <g ref={"xAxis"}></g>
            <g ref={"yAxis"}></g>
          </g>
        </svg>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
