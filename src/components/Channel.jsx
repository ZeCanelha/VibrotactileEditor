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

const channel = (props) => {
  return (
    <Row className="channel-row rounded border  no-gutters flex-column">
      <div className="channel-id border rounded">
        <Button
          className="remove-channel"
          onClick={() => props.removeChannel(props.id)}
          variant="light"
          size="sm"
        >
          <FontAwesomeIcon icon={faTimesCircle} size="xs" />
        </Button>
        Channel {props.id}
        <br></br>
        Actuators {props.actuators}
      </div>
      <div className="channel-track rounded"></div>
    </Row>
  );
};

export default connect(null, mapDispatchToProps)(channel);
