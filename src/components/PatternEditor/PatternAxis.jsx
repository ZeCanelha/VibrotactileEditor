import React from "react";
import Axis from "./Axis";

export default (props) => {
  const xSettings = {
    translate: `translate(0, ${props.height - props.bottom})`,
    scale: props.xScale,
    orient: "bottom",
  };
  const ySettings = {
    translate: `translate(${props.left}, 0)`,
    scale: props.yScale,
    orient: "left",
  };
  return (
    <g className="xy-axis">
      <Axis {...xSettings}></Axis>
      <Axis {...ySettings}></Axis>
    </g>
  );
};
