import React from "react";
import Draggable from "react-draggable";

// Recebe como props o número de actuadores
class Actuator extends React.Component {
  renderActuatorItens() {
    return (actuator, index) => {
      return (
        <Draggable
          key={index}
          bounds={"parent"}
          handle=".handle"
          position={{ x: actuator.cx, y: actuator.cy }}
          grid={[5, 5]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={(e, d) => this.props.handleStop(e, d, index)}
        >
          <div className="handle actuator-circle">
            <span>{index}</span>
          </div>
        </Draggable>
      );
    };
  }

  render() {
    return this.props.actuators.map(this.renderActuatorItens());
  }
}

export default Actuator;
