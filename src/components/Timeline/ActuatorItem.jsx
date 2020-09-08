import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const addActuatorToChannel = (props, id) => {
  if (isChecked(props, id)) {
    props.removeActuator(props.id, props.channelActuators.indexOf(id));
  } else {
    props.addActuator(props.id, id);
  }
};

const isChecked = (props, id) => {
  return props.channelActuators.includes(id);
};

const renderRadioButtons = (props) => {
  return (actuator, index) => {
    return (
      <ToggleButton
        key={index}
        type="checkbox"
        variant="outline-primary"
        value={isChecked(props, actuator.id)}
        checked={isChecked(props, actuator.id)}
        onChange={(e) => addActuatorToChannel(props, actuator.id)}
      >
        {actuator.number}
      </ToggleButton>
    );
  };
};

export default (props) => {
  return (
    <ButtonGroup toggle className="m-1 d-flex flex-wrap">
      {props.actuators.map(renderRadioButtons(props))}
    </ButtonGroup>
  );
};
