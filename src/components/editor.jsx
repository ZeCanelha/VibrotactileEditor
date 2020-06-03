import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import DeviceEdior from "./Device";
import Toolbar from "./Toolbar";
import Modal from "./Startup";
import Timeline from "./Timeline";
import PatternEditor from "./Pattern";
import Library from "./Library";
import Save from "./Save";

class Editor extends React.Component {
  render() {
    return (
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
    );
  }
}

export default Editor;
