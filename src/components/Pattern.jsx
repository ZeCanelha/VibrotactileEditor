import React from "react";
import * as d3 from "d3";

const width = 300;
const height = 150;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

// TODO: Update scales acording to given xScale -> User may choose different times

class PatternEditor extends React.Component {
  render() {
    return <svg width={width} height={height} ref="pattern"></svg>;
  }
}

export default PatternEditor;
