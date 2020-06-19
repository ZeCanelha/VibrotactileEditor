import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openConfigDrawer, closeConfigDrawer } from "../stores/gui/guiActions";
import {
  changeProjectName,
  changeProjectActuator,
  changeProjectDevice,
  changeDeviceImage,
} from "../stores/editor/editorActions";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Database from "../utils/database";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => ({
  openDrawer: state.gui.configDrawer,
  config: state.config,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openConfigDrawer,
      closeConfigDrawer,
      changeProjectName,
      changeProjectActuator,
      changeProjectDevice,
      changeDeviceImage,
    },
    dispatch
  );

const openSidebar = "sidebar open";
const idleSidebar = "sidebar";

class Drawer extends React.Component {
  constructor() {
    super();
    this.drawerReference = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  handleClick(event) {
    if (this.props.openDrawer) {
      if (
        this.drawerReference &&
        !this.drawerReference.current.contains(event.target)
      ) {
        this.props.closeConfigDrawer();
      }
    }
  }

  handleToogle() {
    if (this.props.openDrawer) this.props.closeConfigDrawer();
    else this.props.openConfigDrawer();
  }

  handleSave() {
    Database.saveProjectConfiguration(
      this.props.config.hardwareDevice,
      this.props.config.deviceImage,
      this.props.config.projectName,
      this.props.config.actuators,
      this.props.config.actuators_coords
    ).then((data) => {
      console.log(data);
      this.props.closeConfigDrawer();
    });
  }

  render() {
    let sidebarClass = this.props.openDrawer ? openSidebar : idleSidebar;
    let iconRender = this.props.openDrawer ? faTimes : faBars;

    return (
      <React.Fragment>
        <div className={sidebarClass} ref={this.drawerReference}>
          <div className="sidebar-header">
            <h4>Configurations</h4>
          </div>
          <div className="sidebar-body">
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Hardware Device</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={"Type here your microcontroller"}
                  value={this.props.config.hardwareDevice}
                  onChange={this.props.changeProjectDevice}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here your project name"
                  value={this.props.config.projectName}
                  onChange={this.props.changeProjectName}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Number of actuators</Form.Label>
                <Form.Control
                  onChange={this.props.changeProjectActuator}
                  as="select"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </Form.Control>
              </Form.Group>
              <Form.File
                id="custom-file"
                label="Upload your prototype image"
                // onChange={(e) => this.handleImageUpload(e)}
                custom
              />
            </Form>
          </div>
          <div className="sidebar-footer">
            <Button variant="dark" block onClick={this.handleSave}>
              Save configuration
            </Button>
          </div>
          <Button
            variant="light"
            onClick={() => this.handleToogle()}
            className="sidebar-toggle"
          >
            <FontAwesomeIcon icon={iconRender} />
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
