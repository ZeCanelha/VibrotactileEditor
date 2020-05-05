export function changeProjectDevice(e) {
  console.log("Device changed");
  return {
    type: "DEVICE_CHANGED",
    payload: e.target.value,
  };
}

export function changeProjectName(e) {
  console.log("Project name changed");
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
