import React from "react";

class DisplayPattern extends React.Component {
  render() {
    return (
      <svg>
        <path
          transform={"scale(0.18,0.18)"}
          d={this.props.path}
          fill="#5bc0de"
          stroke={"0275d8"}
        ></path>
      </svg>
    );
  }
}

export default DisplayPattern;
