import React from "react";

const renderKeyframes = (props) => {
  return (coords, index) => {
    console.log(coords);
    const datapoints = {
      cx: props.xScale(coords.time),
      cy: props.yScale(coords.intensity),
      r: 4,
      key: index,
    };
    return <circle {...datapoints}></circle>;
  };
};

export default (props) => {
  console.log(props);
  return <g>{props.pattern.datapoints.map(renderKeyframes(props))}</g>;
};
