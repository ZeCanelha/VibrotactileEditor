import React from "react";

import { removeChannel } from "../stores/editor/editorActions";
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
        <div className="channel-track border rounded"></div>
      </Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(Channel);