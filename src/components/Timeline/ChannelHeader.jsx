import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
  return (
    <div className="channel-id border rounded">
      <Button
        className="remove-channel"
        onClick={props.handleRemoveChannel}
        variant="light"
        size="sm"
      >
        <FontAwesomeIcon icon={faTimesCircle} size="xs" />
      </Button>
      <div className="channel-id-column">
        <p>Channel {props.id + 1}</p>
        <Button variant="link" size="sm" onClick={props.handleActuatorModal}>
          Actuators
        </Button>
      </div>
    </div>
  );
};
