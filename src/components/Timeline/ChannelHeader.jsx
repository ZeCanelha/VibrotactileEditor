import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const channelActuators = (props) => {
  return (actuator) => {
    if (props.actuators.includes(actuator.id))
      return " " + (actuator.id + 1) + " ";
  };
};

export default (props) => {
  return (
    <div className="channel-id">
      {props.id > 2 ? (
        <FontAwesomeIcon
          className="remove-channel"
          onClick={props.handleRemoveChannel}
          icon={faTimesCircle}
          size="1x"
        />
      ) : null}

      <div className="channel-id-column">
        <span>Channel {props.id + 1}</span>
        <Button variant="link" size="sm" onClick={props.handleActuatorModal}>
          Actuators
        </Button>
        <span className="actuator-array">
          [{props.list.map(channelActuators(props))}]
        </span>
      </div>
    </div>
  );
};
