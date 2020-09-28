import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default (props) => {
  return <ProgressBar animated now={props.value}></ProgressBar>;
};
