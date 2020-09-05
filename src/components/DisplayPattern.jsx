import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { closeLibraryModal, openPatternModal } from "../stores/gui/guiActions";
import {
  setPatternDescription,
  setPatternName,
  updatePatternToDisplay,
  setPatternPath,
} from "../stores/display/displayActions";

const mapStateToProps = (state) => ({
  isDisplayedOnLibrary: state.display.isDisplayedOnLibrary,

  patterns: state.library.patterns,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeLibraryModal,
      openPatternModal,
      setPatternDescription,
      setPatternName,
      updatePatternToDisplay,
      setPatternPath,
    },
    dispatch
  );

class DisplayPattern extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  // handleClick: Associated with library modal. Opens modal with details

  searchPatternById(id) {
    for (let index = 0; index < this.props.patterns.length; index++) {
      if (this.props.patterns[index]._id === id)
        return this.props.patterns[index];
    }
  }

  handleClick() {
    // Set store with details to show
    let patternObject = this.searchPatternById(this.props.id);

    if (this.props.isDisplayedOnLibrary) {
      this.props.setPatternName(patternObject.name);
      this.props.setPatternDescription(patternObject.description);
      this.props.updatePatternToDisplay(this.props.id);
      this.props.setPatternPath(this.props.path);
    }

    this.props.closeLibraryModal();
    this.props.openPatternModal();
  }
  // handleDoubleClick: Associated with timeline. Opens pattern in the editor
  handleDoubleClick() {}

  componentDidMount() {
    // Scale factor to fit the path in the container

    if (this.props.logger) {
      console.log("logs");
    }

    const width = this.refs.svgRef.clientWidth;
    const height = this.refs.svgRef.clientHeight;
    const viewBox = "0 0 " + width + " " + height;
    let path = this.refs.path;
    let pathW = path.getBBox().width;
    let pathH = path.getBBox().height;

    console.log(path.getBBox());

    let scaleX = width / pathW;
    let scaleY = height / pathH;

    console.log(scaleX, scaleY);

    d3.select(this.refs.svgRef).attr("viewBox", viewBox);
    d3.select(this.refs.path).attr(
      "transform",
      "scale(" +
        scaleX +
        "," +
        scaleY +
        ") translate(" +
        -path.getBBox().x +
        "," +
        -path.getBBox().y +
        ")"
    );
  }

  render() {
    return (
      <svg
        ref={"svgRef"}
        preserveAspectRatio="xMidYMid meet"
        className="display-pattern-container"
        // onClick={this.handleClick}
      >
        <path
          ref={"path"}
          d={this.props.path}
          fill="#5bc0de"
          stroke={"0275d8"}
          strokeWidth={"1.5px"}
        ></path>
      </svg>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPattern);
