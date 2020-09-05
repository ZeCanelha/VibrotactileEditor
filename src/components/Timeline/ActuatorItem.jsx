import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const addActuatorToChannel = (props, index) => {
  if (isChecked(props, index)) {
    props.removeActuator(props.id, props.channelActuators.indexOf(index));
  } else {
    props.addActuator(props.id, index);
  }
};

const isChecked = (props, id) => {
  return props.channelActuators.includes(id);
};

const renderRadioButtons = (props) => {
  let renderButtons = [];

  for (let index = 0; index < props.nActuators; index++) {
    renderButtons.push(
      <ToggleButton
        key={index}
        type="checkbox"
        variant="outline-primary"
        value={isChecked(props, index)}
        checked={isChecked(props, index)}
        onChange={(e) => addActuatorToChannel(props, index)}
      >
        {index}
      </ToggleButton>
    );
  }

  return renderButtons;
};

export default (props) => {
  return (
    <ButtonGroup toggle className="m-1 d-flex flex-wrap">
      {renderRadioButtons(props)}
    </ButtonGroup>
  );
};
