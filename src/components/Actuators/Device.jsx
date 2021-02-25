import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateActuatorCoords,
  removeActuator,
  addNewActuator,
} from "../../stores/device/deviceActions";

import { showNotification } from "../../stores/gui/guiActions";
import { setAddActuatorNotification } from "../../stores/notification/notificationAction";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Actuators from "./Actuator";

import "../../css/device.css";

const mapStateToProps = (state) => ({
  deviceImage: state.device.deviceImage,
  actuators: state.device.actuators,
  actuators_coords: state.device.actuators_coords,
  setShow: state.gui.isInitialModalOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateActuatorCoords,
      removeActuator,
      addNewActuator,
      showNotification,
      setAddActuatorNotification,
    },
    dispatch
  );

class PatternEditor extends React.Component {
  constructor(props) {
    super(props);

    this.updateActuatorPosition = this.updateActuatorPosition.bind(this);
    this.removeActuator = this.removeActuator.bind(this);
    this.handleAddActuator = this.handleAddActuator.bind(this);
  }

  updateActuatorPosition(event, data, index) {
    const coords = {
      x: data.lastX,
      y: data.lastY,
      index: index,
    };

    this.props.updateActuatorCoords(coords);
  }

  removeActuator(index) {
    this.props.removeActuator(index);
  }

  handleAddActuator() {
    this.props.addNewActuator(this.props.actuators_coords);
    this.props.setAddActuatorNotification();
    this.props.showNotification();
  }

  render() {
    let imagePreview;
    if (this.props.deviceImage && !this.props.setShow) {
      //let preview = URL.createObjectURL(this.props.deviceImage);
      imagePreview = <Image src={this.props.deviceImage} fluid />;
    }
    return (
      <div className="hardware-container">
        {this.props.deviceImage ? imagePreview : null}
        <Actuators
          {...this.props}
          actuators={this.props.actuators_coords}
          handleStop={this.updateActuatorPosition}
          removeActuator={this.removeActuator}
        ></Actuators>
        <Button
          className="add-actuator-btn"
          size="sm"
          variant="primary"
          onClick={this.handleAddActuator}
        >
          Add Actuator
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
