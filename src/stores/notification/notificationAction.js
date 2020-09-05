export function setSaveNotification() {
  return {
    type: "SET_SAVE_NOTIFICATION",
  };
}
export function setAddActuatorNotification() {
  return {
    type: "SET_ADD_ACTUATOR_NOTIFICATION",
  };
}

export function setRemoveActuatorNotification() {
  return {
    type: "SET_REMOVE_ACTUATOR_NOTIFICATION",
  };
}
export function setAddChannelNotification() {
  return {
    type: "SET_ADD_CHANNEL_NOTIFICATION",
  };
}
export function setRemoveChannelNotification() {
  return {
    type: "SET_REMOVE_CHANNEL_NOTIFICATION",
  };
}
export function setImportPatternNotification() {
  return {
    type: "SET_IMPORT_PATTERN_NOTIFICATION",
  };
}
export function setAddPatternToTimelineNotification() {
  return {
    type: "SET_ADD_PATTERN_NOTIFICATION",
  };
}

export function setRemovePatternFromTimelineNotification() {
  return {
    type: "SET_REMOVE_PATTERN_NOTIFICATION",
  };
}

export function setLoadConfigurationsNotification() {
  return {
    type: "SET_LOAD_CONFIGURATIONS_NOTIFICATION",
  };
}

export function setAddActuatorToChannelNotification() {
  return {
    type: "SET_ADD_ACTUATOR_TO_CHANNEL_NOTIFICATION",
  };
}

export function setAddWarningNotification(warningText) {
  return {
    type: "SET_ADD_WARNING_NOTIFICATION",
    payload: warningText,
  };
}

export function setAddErrorNotification(errorText) {
  return {
    type: "SET_ADD_ERROR_NOTIFICATION",
    payload: errorText,
  };
}
