export function changeProjectDevice(e) {
  return {
    type: "DEVICE_CHANGED",
    payload: e.target.value,
  };
}

export function changeDeviceImage(img) {
  return {
    type: "DEVICEIMAGE_CHANGED",
    payload: img,
  };
}

export function changeProjectActuator(e) {
  return {
    type: "ACTUATOR_CHANGED",
    payload: e.target.value,
  };
}

export function updateActuatorCoords(coords) {
  return {
    type: "ACTUATOR_COORDS_UPDATED",
    payload: coords,
  };
}

export function loadDeviceConfigurations(configs) {
  return {
    type: "DEVICE_CONFIGURATIONS_LOADED",
    payload: configs,
  };
}

export function addNewActuatord() {
  return {
    type: "ADD_NEW_ACTUATOR",
  };
}
