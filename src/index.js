import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./stores/storeReducers";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import StartConfig from "./components/Modal";
import Toolbar from "./components/Toolbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

class Editor extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Container fluid>
          <StartConfig></StartConfig>
          {/* Editor container */}
          <Row className="align-items-center justify-content-around h-50"></Row>
          {/* Timeline & Toolbar container */}
          <Row className="justify-content-md-center flex-column h-50">
            {/* Timeline */}
            <Row></Row>
            {/* Toolbar */}
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
      </Provider>
    );
  }
}

ReactDOM.render(<Editor />, document.getElementById("root"));
