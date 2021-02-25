import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import DeviceEditor from "./Actuators/Device";
import Modal from "./Configurations/Startup";
import Timeline from "./Timeline/Timeline";
import Drawer from "./Configurations/Drawer";
import Notification from "./Notification";
import PatternEditor from "./PatternEditor/Wrapper";

class Editor extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Drawer></Drawer>
        <Notification />
        <Container fluid className="my-container">
          <Modal></Modal>
          <Row className="pattern-editor">
            <DeviceEditor></DeviceEditor>
            <PatternEditor></PatternEditor>
          </Row>

          <Row className="timeline">
            <Timeline></Timeline>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Editor;
