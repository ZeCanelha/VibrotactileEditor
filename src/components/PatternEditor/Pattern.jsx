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
} from "../../stores/pattern/patternActions";

const PATTERN_OFFSET = 25;
let thisObject = null;

const mapStateToProps = (state) => ({
  pattern: state.pattern,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateAreaChart,
      updateDataPoints,
    },
    dispatch
  );

class Pattern extends React.Component {
  componentDidMount() {
    let theobject = this;
    thisObject = theobject;
    d3.select(this.refs.svg).on("dblclick", function () {
      let coords = d3.mouse(this);
      theobject.addDatapoint(coords);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pattern.datapoints !== this.props.pattern.datapoints) {
      d3.select(".d3-tip").remove();
      let newArea = this.areaGenerator();
      this.props.updateAreaChart(newArea(this.props.pattern.datapoints));
      this.addEventListeners();
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
      .data(this.props.pattern.datapoints)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
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

    let datapoints = thisObject.props.pattern.datapoints;
    datapoints.splice(i, 1);
    datapoints.push(newPoints);
    datapoints.sort((a, b) => a.time - b.time);
    thisObject.props.updateDataPoints(datapoints);
  }

  addDatapoint(coords) {
    console.log(coords);
    let newPoints = {
      time: Math.round(this.xScale().invert(coords[0])),
      intensity: Math.round(this.yScale().invert(coords[1])),
    };
    let datapoints = this.props.pattern.datapoints;

    if (newPoints.time < 0) newPoints.time = 0;
    if (newPoints.intensity > 100) newPoints.intensity = 100;
    if (newPoints.intensity < 0) newPoints.intensity = 0;

    // Returns the insertion point for x in array to maintain sorted order

    let index = PatternUtils.getInsertionPoint(datapoints, newPoints.time);

    datapoints.splice(index, 0, newPoints);
    this.props.updateDataPoints(datapoints);
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
    return d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.props.pattern.datapoints, (d) => d.time) + PATTERN_OFFSET,
      ])
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
        <path className="svg-editor-area" d={this.props.pattern.area}></path>
        <Keyframes {...scales} {...this.props}></Keyframes>
        <Axis {...scales} {...this.props}></Axis>
      </svg>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
