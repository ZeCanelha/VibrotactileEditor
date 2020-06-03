import React from "react";
import { connect } from "react-redux";

import Actuator from "./Actuator";

import Image from "react-bootstrap/Image";

const mapStateToProps = (state) => ({
  deviceImage: state.config.deviceImage,
  actuators: state.config.actuators,
  setShow: state.gui.initialConfigModal,
});

class PatternEditor extends React.Component {
  render() {
    const actuatorList = [];
    for (let index = 0; index < this.props.actuators; index++) {
      actuatorList.push(<Actuator key={index} id={index} />);
    }

    let imagePreview;
    if (this.props.deviceImage && !this.props.setShow) {
      //let preview = URL.createObjectURL(this.props.deviceImage);
      imagePreview = <Image src={this.props.deviceImage} fluid />;
    }
    return (
      <div className="hardware-container bg-light border rounded">
        <div className="actuator-container bg-light border rounded">
          {actuatorList}
        </div>
        {this.props.deviceImage ? imagePreview : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(PatternEditor);
