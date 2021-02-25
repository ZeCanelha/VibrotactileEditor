import React from "react";
import SaveToLibrary from "./SaveToLibrary";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPlusCircle,
  faCut,
} from "@fortawesome/free-solid-svg-icons";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopOver: false,
      target: null,
    };
    this.ref = React.createRef();
    this.handleInfoClick = this.handleInfoClick.bind(this);
  }

  handleInfoClick(event) {
    this.setState({
      showPopOver: !this.state.showPopOver,
      target: event.target,
    });
  }

  render() {
    const activeAddContainer = classNames({
      "tool-container": true,
      active: this.props.activeTool === "add",
    });
    const activeDeleteContainer = classNames({
      "tool-container": true,
      active: this.props.activeTool === "delete",
    });

    return (
      <div className="pattern-toolbar">
        <div className="toolbar-tools">
          <div className={activeAddContainer}>
            <div className="icon-container" onClick={this.props.updateAddTool}>
              <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
            </div>
            <span>Add Datapoint</span>
          </div>
          <div className={activeDeleteContainer}>
            <div
              className="icon-container"
              onClick={this.props.updateDeleteTool}
            >
              <FontAwesomeIcon icon={faCut}></FontAwesomeIcon>
            </div>
            <span>Delete Datapoint</span>
          </div>
          <div className="tool-container">
            <div
              className="icon-container"
              ref={this.ref}
              onMouseEnter={this.handleInfoClick}
              onMouseLeave={this.handleInfoClick}
            >
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              <Overlay
                show={this.state.showPopOver}
                target={this.state.target}
                placement="bottom"
                container={this.ref.current}
                containerPadding={20}
              >
                <Popover id="popover-contained">
                  <Popover.Content>
                    <strong>Left+Click</strong>: Add datapoint
                    <br></br>
                    <strong>Shift+Click</strong>: Remove datapoint
                    <br></br>
                    <strong>Left+Click+Hold</strong>: Drag datapoint
                  </Popover.Content>
                </Popover>
              </Overlay>
            </div>
            <span>Information</span>
          </div>
        </div>
        <div className="toolbar-button">
          <SaveToLibrary />
        </div>
      </div>
    );
  }
}
