import React from "react";
import { connect } from "react-redux";

import Actuator from "./actuator";

import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const mapStateToProps = (state) => ({
  deviceImage: state.config.deviceImage,
  actuators: state.config.actuators,
});

const patternEditor = (props) => {
  console.log(props.actuators);

  const actuatorList = [];
  for (let index = 0; index < props.actuators; index++) {
    actuatorList.push(<Actuator key={index} id={index} />);
  }

  let imagePreview;
  if (props.deviceImage) {
    let preview = URL.createObjectURL(props.deviceImage);
    imagePreview = <Image src={preview} />;
  }
  return (
    <Row className="justify-content-start pattern-editor">
      <div className="hardware-container bg-light border rounded">
        <div className="actuator-container bg-light border rounded">
          {actuatorList}
        </div>
        {props.deviceImage ? imagePreview : null}
      </div>
    </Row>
  );
};

export default connect(mapStateToProps)(patternEditor);
