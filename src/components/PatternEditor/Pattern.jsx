import React from "react";
import Keyframes from "./Keyframes";
import Axis from "./PatternAxis";
import PatternUtils from "../../utils/patternUtil";

import * as d3 from "d3";
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
      let newArea = this.areaGenerator();
      this.props.updateAreaChart(newArea(this.props.pattern.datapoints));
      this.addEventListeners();
    }
  }

  addEventListeners() {
    let svg = d3.select(this.refs.svg);
    svg
      .selectAll("circle")
      .data(this.props.pattern.datapoints)
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

  handleMouseOver(d) {
    d3.select(this).attr("r", "6");
  }
  handleMouseOut() {
    d3.select(this).attr("r", "4");
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
