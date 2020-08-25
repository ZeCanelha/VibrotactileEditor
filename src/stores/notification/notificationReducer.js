const INITIAL_STATE = {
  actionTitle: "",
  actionBody: "",
};

const SAVE_NOTIFICATION = {
  title: "Vibrotactile Editor",
  body: "Project configurations saved!",
};

const LOAD_NOTIFICATION = {
  title: "Vibrotactile Editor",
  body: "Project configurations loaded!",
};

const ADD_ACTUATOR_NOTIFICAITON = {
  title: "Vibrotactile Editor",
  body: "Actuator added to the project!",
};

const REMOVE_ACTUATOR_NOTIFICAITON = {
  title: "Vibrotactile Editor",
  body: "Actuator removed from the project!",
};

const ADD_CHANNEL_NOTIFICATION = {
  title: "Vibrotactile Editor",
  body: "New channel added to the timeline!",
};

const REMOVE_CHANNEL_NOTIFICATION = {
  title: "Vibrotactile Editor",
  body: "Channel removed from the timeline!",
};

const IMPORT_PATTERN_NOTIFICATION = {
  title: "Vibrotactile Editor",
  body: "Vibration pattern imported to the editor!",
};

const ADD_PATTERN_TO_TIMELINE = {
  title: "Vibrotactile Editor",
  body: "Vibration pattern added to the timeline!",
};

const ADD_ACTUATOR_TO_CHANNEL_NOTIFICATION = {
  title: "Vibrotactile Editor",
  body: "Actuator(s) added to channel!",
};

const ADD_WARNING_MESSAGE_NOTIFICATION = {
  title: "Warning!",
};

const ADD_ERROR_MESSAGE_NOTIFICATION = {
  title: "Error!",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SAVE_NOTIFICATION":
      return {
        actionTitle: SAVE_NOTIFICATION.title,
        actionBody: SAVE_NOTIFICATION.body,
      };
    case "SET_ADD_ACTUATOR_NOTIFICATION":
      return {
        actionTitle: ADD_ACTUATOR_NOTIFICAITON.title,
        actionBody: ADD_ACTUATOR_NOTIFICAITON.body,
      };
    case "SET_REMOVE_ACTUATOR_NOTIFICATION":
      return {
        actionTitle: REMOVE_ACTUATOR_NOTIFICAITON.title,
        actionBody: REMOVE_ACTUATOR_NOTIFICAITON.body,
      };
    case "SET_ADD_CHANNEL_NOTIFICATION":
      return {
        actionTitle: ADD_CHANNEL_NOTIFICATION.title,
        actionBody: ADD_CHANNEL_NOTIFICATION.body,
      };
    case "SET_REMOVE_CHANNEL_NOTIFICATION":
      return {
        actionTitle: REMOVE_CHANNEL_NOTIFICATION.title,
        actionBody: REMOVE_CHANNEL_NOTIFICATION.body,
      };
    case "SET_IMPORT_PATTERN_NOTIFICATION":
      return {
        actionTitle: IMPORT_PATTERN_NOTIFICATION.title,
        actionBody: IMPORT_PATTERN_NOTIFICATION.body,
      };
    case "SET_ADD_PATTERN_NOTIFICATION":
      return {
        actionTitle: ADD_PATTERN_TO_TIMELINE.title,
        actionBody: ADD_PATTERN_TO_TIMELINE.body,
      };
    case "SET_LOAD_CONFIGURATIONS_NOTIFICATION":
      return {
        actionTitle: LOAD_NOTIFICATION.title,
        actionBody: LOAD_NOTIFICATION.body,
      };
    case "SET_ADD_ACTUATOR_TO_CHANNEL_NOTIFICATION":
      return {
        actionTitle: ADD_ACTUATOR_TO_CHANNEL_NOTIFICATION.title,
        actionBody: ADD_ACTUATOR_TO_CHANNEL_NOTIFICATION.body,
      };
    case "SET_ADD_WARNING_NOTIFICATION":
      return {
        actionTitle: ADD_WARNING_MESSAGE_NOTIFICATION.title,
        actionBody: action.payload,
      };
    case "SET_ADD_ERROR_NOTIFICATION":
      return {
        actionTitle: ADD_ERROR_MESSAGE_NOTIFICATION.title,
        actionBody: action.payload,
      };
    default:
      return state;
  }
}
