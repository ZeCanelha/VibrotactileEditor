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
const mapStateToProps = (state) => ({
  pattern: state.pattern,
});

class PatternWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
    };

    this.getParentSize = this.getParentSize.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.getParentSize();
    window.addEventListener("resize", this.getParentSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getParentSize);
  }

  getParentSize() {
    const { width } = this.state;
    const { height } = this.state;

    const currentContainerHeight = this.refs.patternContainer.getBoundingClientRect()
      .height;

    const currentContainerWidth = this.refs.patternContainer.getBoundingClientRect()
      .width;

    const shouldResize =
      height !== currentContainerHeight || width !== currentContainerWidth;

    if (shouldResize) {
      this.setState({
        height: currentContainerHeight,
        width: currentContainerWidth,
      });
    }
  }

  handleDragStart() {
    this.props.setDragActive();
  }
  handleDragEnd() {
    this.props.setDragFalse();
  }

  render() {
    const shouldRender = this.state.width !== null;
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    return (
      <div className="pattern-wrapper" ref={"patternContainer"}>
        <div
          className="pattern-container"
          draggable="true"
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        >
          <span className={"svg-editor-y-label"}>Intensity(%)</span>
          <span className={"svg-editor-x-label"}>Time(ms)</span>

          {shouldRender && <Pattern {...this.state} {...margin}></Pattern>}
        </div>
        <SaveToLibrary />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternWrapper);
