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
  patternInEditor: state.pattern.isPatternDisplayed,
});

//TODO: patter in display ternary

class PatternWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
    };

    this.getParentSize = this.getParentSize.bind(this);
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

  render() {
    const shouldRender = this.state.width !== null;
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    return (
      <div className="pattern-wrapper" ref={"patternContainer"}>
        {this.props.patternInEditor ? (
          <React.Fragment>
            <div className="pattern-container">
              <span className={"svg-editor-y-label"}>Intensity(%)</span>
              <span className={"svg-editor-x-label"}>Time(ms)</span>

              {shouldRender && <Pattern {...this.state} {...margin}></Pattern>}
            </div>
            <SaveToLibrary />
          </React.Fragment>
        ) : (
          <div className="pattern-text-editor ">
            <p>Select pattern to edit</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternWrapper);
