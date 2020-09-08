import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateActuatorCoords,
  removeActuator,
} from "../../stores/device/deviceActions";

import Image from "react-bootstrap/Image";
import Actuators from "./Actuator";

const mapStateToProps = (state) => ({
  deviceImage: state.device.deviceImage,
  actuators: state.device.actuators,
  actuators_coords: state.device.actuators_coords,
  setShow: state.gui.isInitialModalOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateActuatorCoords, removeActuator }, dispatch);

class PatternEditor extends React.Component {
  constructor(props) {
    super(props);

    this.updateActuatorPosition = this.updateActuatorPosition.bind(this);
    this.removeActuator = this.removeActuator.bind(this);
  }

  updateActuatorPosition(event, data, index) {
    const coords = {
      x: data.lastX,
      y: data.lastY,
      index: index,
    };

    this.props.updateActuatorCoords(coords);
  }

  //TODO: Remover por index ou por ID
  removeActuator(index) {
    this.props.removeActuator(index);
  }

  render() {
    let imagePreview;
    if (this.props.deviceImage && !this.props.setShow) {
      //let preview = URL.createObjectURL(this.props.deviceImage);
      imagePreview = <Image src={this.props.deviceImage} fluid />;
    }
    return (
      <div className="hardware-container bg-light border rounded">
        {this.props.deviceImage ? imagePreview : null}
        <Actuators
          {...this.props}
          actuators={this.props.actuators_coords}
          handleStop={this.updateActuatorPosition}
          removeActuator={this.removeActuator}
        ></Actuators>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
