import React from "react";

const renderTicks = (large) => {
  let ticks = (
    <div className={"tick-container"} key={large}>
      <label className={"label-large"}>{large}</label>
      <div className={"tick large"}></div>
      <div className={"tick"}></div>
      <div className={"tick"}></div>
      <div className={"tick"}></div>
      <div className={"tick"}></div>
      <div className={"tick medium"}></div>
      <div className={"tick"}></div>
      <div className={"tick"}></div>
      <div className={"tick"}></div>
      <div className={"tick"}></div>
    </div>
  );

  return ticks;
};

const renderRuler = (timelineTime) => {
  const elements = [];
  const tick = Math.round(timelineTime / 10);

  for (let index = 0; index < 10; index++) {
    elements.push(renderTicks(tick * index, 0));
  }

  // elements.push(
  //   <div className={"tick-container"}>
  //     <label className={"label-large"}>{timelineTime}</label>
  //     <div className={"tick large"}></div>
  //   </div>
  // );

  return elements;
};

export default (props) => {
  return (
    <div className={"ruler"}>
      {renderRuler(props.timeline_list.timelineTime)}
    </div>
  );
};
