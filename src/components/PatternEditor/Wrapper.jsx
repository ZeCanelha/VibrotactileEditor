import React from "react";
import Pattern from "./Pattern";
import SaveToLibrary from "./SaveToLibrary";

import { bindActionCreators } from "redux";
import { setDragActive, setDragFalse } from "../../stores/gui/guiActions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDragActive,
      setDragFalse,
    },
    dispatch
  );

class PatternWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: null,
      containerHeight: null,
    };

    this.getParentSize = this.getParentSize.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.getParentSize();
    window.addEventListener("resize", this.getParentSize());
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getParentSize());
  }

  getParentSize() {
    // TODO: learn HOC to introduce responsiveness on window resize

    const currentContainerHeight = this.refs.pattern.getBoundingClientRect()
      .height;

    const currentContainerWidth = this.refs.pattern.getBoundingClientRect()
      .width;

    this.setState({
      containerHeight: currentContainerHeight,
      containerWidth: currentContainerWidth,
    });
  }

  handleDragStart() {
    this.props.setDragActive();
  }
  handleDragEnd() {
    this.props.setDragFalse();
  }

  render() {
    const size = {
      width: this.state.containerWidth,
      height: this.state.containerHeight,
    };
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    return (
      <div className="pattern-wrapper">
        <div
          className="pattern-container"
          ref="pattern"
          draggable="true"
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        >
          <span className={"svg-editor-y-label"}>Intensity(%)</span>
          <span className={"svg-editor-x-label"}>Time(ms)</span>
          <Pattern {...size} {...margin}></Pattern>
        </div>
        <SaveToLibrary />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(PatternWrapper);
