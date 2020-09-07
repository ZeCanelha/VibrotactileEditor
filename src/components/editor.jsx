import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import DeviceEdior from "./Actuators/Device";
import Toolbar from "./Toolbar";
import Modal from "./Startup";
import Timeline from "./Timeline/Timeline";
import Library from "./Library/Library";
import Save from "./Save";
import Drawer from "./Drawer";
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
          <Row className="justify-content-start pattern-editor bg-light border rounded">
            <DeviceEdior></DeviceEdior>
            <PatternEditor></PatternEditor>
          </Row>

          <Row className="timeline flex-column align-items-center justify-content-end">
            <Timeline></Timeline>
            <Row className="h-25 w-100 justify-content-around align-items-center">
              <Library></Library>
              <Toolbar></Toolbar>
              <Save></Save>
            </Row>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Editor;
