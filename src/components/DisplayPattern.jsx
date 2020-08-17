import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { closeLibraryModal, openPatternModal } from "../stores/gui/guiActions";

const mapStateToProps = (state) => ({
  library: state.library,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeLibraryModal, openPatternModal }, dispatch);

class DisplayPattern extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount() {
    // Scale factor to fit the path in the container

    const width = this.refs.svgRef.clientWidth;
    const height = this.refs.svgRef.clientHeight;

    const viewBox = "0 0 " + width + " " + height;

    d3.select(this.refs.svgRef).attr("viewBox", viewBox);

    let path = this.refs.path;

    console.log(path.getBBox());

    let pathW = path.getBBox().width;
    let pathH = path.getBBox().height;

    let scaleX = (width - width / 10) / pathW;
    let scaleY = (height - height / 10) / pathH;

    console.log(scaleX, scaleY);

    d3.select(this.refs.path).attr(
      "transform",
      "scale(" + scaleX + "," + scaleY + ")"
    );
  }

  // handleClick: Associated with library modal. Opens modal with details

  handleClick() {
    this.props.closeLibraryModal();
    this.props.openPatternModal();
  }
  // handleDoubleClick: Associated with timeline. Opens pattern in the editor
  handleDoubleClick() {}

  render() {
    return (
      <svg
        ref={"svgRef"}
        preserveAspectRatio="xMidYMid meet"
        className="display-pattern-container"
        onClick={this.handleClick}
      >
        <path
          ref={"path"}
          d={this.props.path}
          fill="#5bc0de"
          stroke={"0275d8"}
        ></path>
      </svg>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPattern);
