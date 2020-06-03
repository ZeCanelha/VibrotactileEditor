export function changeProjectDevice(e) {
  return {
    type: "DEVICE_CHANGED",
    payload: e.target.value,
  };
}

export function changeProjectName(e) {
  return {
    type: "NAME_CHANGED",
    payload: e.target.value,
  };
}

export function changeProjectActuator(e) {
  return {
    type: "ACTUATOR_CHANGED",
    payload: e.target.value,
  };
}

export function changeDeviceImage(e) {
  return {
    type: "DEVICEIMAGE_CHANGED",
    payload: e.target.files[0],
  };
}

export function addChannel() {
  return {
    type: "NEW_CHANNEL",
  };
}

export function loadConfigs(config) {
  return {
    type: "CONFIG_LOADED",
    payload: config,
  };
}

export function removeChannel(id) {
  return {
    type: "REMOVE_CHANNEL",
    payload: id,
  };
}

export function addActuator() {
  return {
    type: "ADD_ACTUATOR",
  };
}

export function saveConfiguration(config) {
  return {
    type: "SAVE_CONFIGURATION",
    payload: config,
  };
}
