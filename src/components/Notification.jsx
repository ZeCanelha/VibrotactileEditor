import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeNotification } from "../stores/gui/guiActions";

import Toast from "react-bootstrap/Toast";

const mapStateToProps = (state) => ({
  showNotification: state.gui.isNotificationOpen,
  notificationContent: state.notification,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeNotification }, dispatch);

class Notification extends React.Component {
  render() {
    return (
      <Toast
        onClose={this.props.closeNotification}
        show={this.props.showNotification}
        delay={3000}
        style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">
            {this.props.notificationContent.actionTitle}
          </strong>
        </Toast.Header>
        <Toast.Body>{this.props.notificationContent.actionBody}</Toast.Body>
      </Toast>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
