import React from "react";
import Keyframes from "./Keyframes";
import Axis from "./PatternAxis";
import * as d3 from "d3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateAreaChart,
  updateDataPoints,
} from "../../stores/pattern/patternActions";
import { setDragActive, setDragFalse } from "../../stores/gui/guiActions";

const margin = { top: 10, right: 30, bottom: 30, left: 40 };

const mapStateToProps = (state) => ({
  pattern: state.pattern,
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

class Pattern extends React.Component {
  componentDidMount() {
    let theobject = this;
    d3.select(this.refs.svg).on("dblclick", function () {
      let coords = d3.mouse(this);
      theobject.addDatapoint(coords);
    });
  }

  addDatapoint(coords) {
    // Adicionar o keyframe ao array de pontos
  }

  xScale() {
    return d3
      .scaleLinear()
      .domain([0, d3.max(this.props.pattern.datapoints, (d) => d.time)])
      .range([margin.left, 200]);
  }

  yScale() {
    return d3.scaleLinear().domain([100, 0]).range([margin.top, 300]);
  }

  render() {
    const scales = { xScale: this.xScale(), yScale: this.yScale() };
    return (
      <svg
        width={300}
        height={200}
        style={{ backgroundColor: "yellow" }}
        ref={"svg"}
      >
        <Keyframes {...scales} {...this.props}></Keyframes>
        {/* <Axis {...scales} {...this.props}></Axis> */}
      </svg>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
