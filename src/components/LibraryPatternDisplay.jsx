import React from "react";
import * as d3 from "d3";

const margin = { top: 5, right: 5, left: 5, bottom: 5 };

export default class LibraryDisplay extends React.Component {
  render() {
    return (
      <svg
        className="svg-container"
        width={this.props.width}
        height={this.props.height}
      >
        <path
          transform={"scale(0.40,0.30)"}
          d={this.props.path}
          fill="#69b3a2"
          stroke={"orange"}
        ></path>
        <text
          fill={"orange"}
          x={this.props.width / 2 - this.props.patternName.length}
          y={this.props.height - margin.bottom}
          className="pattern-display-text"
        >
          {this.props.patternName}
        </text>
      </svg>
    );
  }
}
