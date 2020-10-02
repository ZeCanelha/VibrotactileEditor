import React from "react";
import Keyframes from "./Keyframes";
import Axis from "./PatternAxis";
import PatternUtils from "../../utils/patternUtil";

import * as d3 from "d3";
import d3Tip from "d3-tip";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateAreaChart,
  updateDataPoints,
  removeDatapoint,
  updateDataString,
} from "../../stores/pattern/patternActions";

const PATTERN_OFFSET = 25;
let thisObject = null;
let pathRef = null;

const mapStateToProps = (state) => ({
  pattern: state.pattern.patterns,
  render: state.pattern,
  index: state.pattern.currentPatternIndex,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateAreaChart,
      updateDataPoints,
      removeDatapoint,
      updateDataString,
    },
    dispatch
  );

class Pattern extends React.Component {
  componentDidMount() {
    let theobject = this;
    pathRef = d3.select(this.refs.pathEl);
    thisObject = theobject;
    let newArea = this.areaGenerator();
    this.props.updateAreaChart(
      this.props.index,
      newArea(this.props.pattern[this.props.index].datapoints)
    );
    d3.select(this.refs.svg).on("dblclick", function () {
      let coords = d3.mouse(this);
      theobject.addDatapoint(coords);
    });
    this.addEventListeners();
  }

  datapointsToString(points, timeMax = 350) {
    let dataString = "";
    for (let index = 0; index < points.length; index++) {
      if (Math.ceil(this.xScale().invert(points[index].x)) >= timeMax) {
        break;
      } else {
        dataString +=
          "(" +
          Math.floor(this.xScale().invert(points[index].x)) +
          "," +
          Math.floor(this.yScale().invert(points[index].y)) +
          ")";
      }
    }
    console.log(dataString);
    return dataString;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.render !== this.props.render ||
      prevProps.width !== this.props.width ||
      prevProps.heigth !== this.props.height
    ) {
      d3.select(".d3-tip").remove();
      let newArea = this.areaGenerator();

      let points = PatternUtils.patternToString(pathRef.node());
      this.props.updateDataString(
        this.props.index,
        this.datapointsToString(points)
      );
      this.props.updateAreaChart(
        this.props.index,
        newArea(this.props.pattern[this.props.index].datapoints),
        this.datapointsToString(points)
      );
      this.addEventListeners();
    }
  }

  removeDatapoint(d, i) {
    if (d3.event.shiftKey) {
      console.log("shift");
      this.props.removeDatapoint(this.props.index, i);
    }
  }

  addEventListeners() {
    let tip = d3Tip()
      .attr("class", "d3-tip")
      .html(function (d) {
        return "(" + d.time + "," + d.intensity + ")";
      });

    let svg = d3.select(this.refs.svg);
    svg.call(tip);
    svg
      .selectAll("circle")
      .data(this.props.pattern[this.props.index].datapoints)

      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .on("click", (d, i) => this.removeDatapoint(d, i))
      .call(
        d3
          .drag()
          .on("start", this.dragStarted)
          .on("drag", this.dragged)
          .on("end", this.dragEnded)
      );
  }

  dragStarted() {
    console.log("Drag Started");
  }
  dragged() {
    d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
  }
  dragEnded(d, i) {
    let newPoints = {
      time: Math.round(thisObject.xScale().invert(d3.event.x)),
      intensity: Math.round(thisObject.yScale().invert(d3.event.y)),
    };

    if (newPoints.time < 0) newPoints.time = 0;
    if (newPoints.intensity > 100) newPoints.intensity = 100;
    if (newPoints.intensity < 0) newPoints.intensity = 0;

    let datapoints =
      thisObject.props.pattern[thisObject.props.index].datapoints;
    datapoints.splice(i, 1);
    datapoints.push(newPoints);
    datapoints.sort((a, b) => a.time - b.time);
    thisObject.props.updateDataPoints(thisObject.props.index, datapoints);
  }

  addDatapoint(coords) {
    console.log(coords);
    let newPoints = {
      time: Math.round(this.xScale().invert(coords[0])),
      intensity: Math.round(this.yScale().invert(coords[1])),
    };
    let datapoints = this.props.pattern[this.props.index].datapoints;
    console.log(datapoints);

    if (newPoints.time < 0) newPoints.time = 0;
    if (newPoints.intensity > 100) newPoints.intensity = 100;
    if (newPoints.intensity < 0) newPoints.intensity = 0;

    // Returns the insertion point for x in array to maintain sorted order

    let index = PatternUtils.getInsertionPoint(datapoints, newPoints.time);

    datapoints.splice(index, 0, newPoints);
    this.props.updateDataPoints(this.props.index, datapoints);
  }
  areaGenerator() {
    return PatternUtils.createChart(
      "area",
      this.xScale(),
      this.yScale(),
      this.props.height
    );
  }

  xScale() {
    let scaleMax = d3.max(
      this.props.pattern[this.props.index].datapoints,
      (d) => d.time
    );
    if (!scaleMax || scaleMax < 350) scaleMax = 350;
    return d3
      .scaleLinear()
      .domain([0, scaleMax + PATTERN_OFFSET])
      .range([this.props.left, this.props.width - this.props.right]);
  }

  yScale() {
    return d3
      .scaleLinear()
      .domain([100, 0])
      .range([this.props.top, this.props.height - this.props.bottom]);
  }

  render() {
    const scales = { xScale: this.xScale(), yScale: this.yScale() };

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        ref={"svg"}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={"pathEl"}
          className="svg-editor-area"
          d={this.props.pattern[this.props.index].area}
        ></path>
        <Keyframes {...scales} {...this.props}></Keyframes>
        <Axis {...scales} {...this.props}></Axis>
      </svg>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
