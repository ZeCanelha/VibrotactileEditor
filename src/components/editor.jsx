import React from "react";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import PatternEditor from "./spatialDisplay";
import Toolbar from "./toolbar";
import Modal from "./initialConfig";
import Timeline from "./timeline";

const mapStateToProps = (state) => ({ config: state.config });

const editor = (props) => {
  console.log(props);

  return (
    <Container fluid className="my-container">
      <Modal></Modal>
      <PatternEditor></PatternEditor>
      <Row className="timeline flex-column align-items-center justify-content-end">
        <Timeline></Timeline>
        <Row className="h-25 w-100 justify-content-around align-items-center">
          <Button className="toolbar-size border rounded" variant="light">
            Library
          </Button>
          <Toolbar></Toolbar>
          <Button className="toolbar-size border rounded" variant="light">
            Save
          </Button>
        </Row>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(editor);
