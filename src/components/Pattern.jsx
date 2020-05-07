import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PatternEditor = (props) => {
  const width = 100;
  const height = 100;

  const dummyData = [0, 1, 2, 3, 4, 5];
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dummyData)])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dummyData)])
    .range([height, 0]);

  return <h1>PatternEditor</h1>;
};

export default PatternEditor;
