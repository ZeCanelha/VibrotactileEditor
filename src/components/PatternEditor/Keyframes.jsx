import React from "react";
const renderKeyframes = (props) => {
  return (coords, index) => {
    const datapoints = {
      cx: props.xScale(coords.time),
      cy: props.yScale(coords.intensity),
      r: 5,
      key: index,
    };
    return <circle className="svg-editor-keyframes" {...datapoints}></circle>;
  };
};

export default (props) => {
  return (
    <g>{props.pattern[props.index].datapoints.map(renderKeyframes(props))}</g>
  );
};
