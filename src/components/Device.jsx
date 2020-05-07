import React from "react";
import { connect } from "react-redux";

import Actuator from "./Actuator";
import Pattern from "./Pattern";

import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const mapStateToProps = (state) => ({
  deviceImage: state.config.deviceImage,
  actuators: state.config.actuators,
});

class PatternEditor extends React.Component {
  render() {
    const actuatorList = [];
    for (let index = 0; index < this.props.actuators; index++) {
      actuatorList.push(<Actuator key={index} id={index} />);
    }

    let imagePreview;
    if (this.props.deviceImage) {
      let preview = URL.createObjectURL(this.props.deviceImage);
      imagePreview = <Image src={preview} />;
    }
    return (
      <Row className="justify-content-start pattern-editor bg-light border rounded">
        <div className="hardware-container bg-light border rounded">
          <div className="actuator-container bg-light border rounded">
            {actuatorList}
          </div>
          {this.props.deviceImage ? imagePreview : null}
        </div>
        {/* <div className="pattern-container bg-light border rounded">
        {<Pattern></Pattern> }
      </div> */}
      </Row>
    );
  }
}

export default connect(mapStateToProps)(PatternEditor);
