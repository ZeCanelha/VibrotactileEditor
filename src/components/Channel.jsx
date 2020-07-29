import React from "react";

import { removeChannel } from "../stores/timeline/timelineActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeChannel }, dispatch);
};

class Channel extends React.Component {
  constructor() {
    super();
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  handleDrop(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    let container = document.createElement("div");

    dropContainer.style.border = null;
    dropContainer.classList.add("border");
    container.classList.add("dropped-pattern");

    dropContainer.appendChild(container);
  }
  handleDragOver(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    dropContainer.classList.remove("border");
    dropContainer.style.border = "1px dashed #5cb85c";
  }
  handleDragLeave(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    dropContainer.style.border = null;
    dropContainer.classList.add("border");
  }

  render() {
    return (
      <Row className="channel-row no-gutters flex-column">
        <div className="channel-id border rounded">
          <Button
            className="remove-channel"
            onClick={() => this.props.removeChannel(this.props.id)}
            variant="light"
            size="sm"
          >
            <FontAwesomeIcon icon={faTimesCircle} size="xs" />
          </Button>
          Channel {this.props.id}
          <br></br>
          Actuators {this.props.actuators}
        </div>
        <div
          className="channel-track border rounded"
          onDrop={this.handleDrop}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          ref={"drop"}
        ></div>
      </Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(Channel);
