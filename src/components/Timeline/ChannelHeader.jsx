import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const channelActuators = (props) => {
  console.log(props);
  return (actuator, index) => {
    if (props.actuators.includes(actuator.id))
      return " " + actuator.number + " ";
  };
};

export default (props) => {
  return (
    <div className="channel-id">
      {/* <Button
        className="remove-channel"
        onClick={props.handleRemoveChannel}
        variant="light"
        size="sm"
      >
        <FontAwesomeIcon icon={faTimesCircle} size="xs" />
      </Button> */}
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
