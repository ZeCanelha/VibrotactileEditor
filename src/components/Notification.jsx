import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeSaveNotification } from "../stores/gui/guiActions";

import Toast from "react-bootstrap/Toast";

const mapStateToProps = (state) => ({
  showNotification: state.gui.isSaveNotificationOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeSaveNotification }, dispatch);

class Notification extends React.Component {
  render() {
    return (
      <Toast
        onClose={this.props.closeSaveNotification}
        show={this.props.showNotification}
        delay={3000}
        style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Vibrotactile Editor</strong>
        </Toast.Header>
        <Toast.Body>Project configurations saved!</Toast.Body>
      </Toast>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
