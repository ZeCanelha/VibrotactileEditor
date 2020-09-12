import Util from "../../utils/util";

let newID = 1;

export function changeProjectDevice(hardwareDevice) {
  return {
    type: "SET_HARDWARE_DEVICE",
    payload: hardwareDevice,
  };
}

export function changeDeviceImage(img) {
  return {
    type: "DEVICEIMAGE_CHANGED",
    payload: img,
  };
}

export function changeProjectActuator(nActuators) {
  let actuatorArray = [];

  for (let index = 0; index < nActuators; index++) {
    const actuator = {
      number: index + 1,
      cx: 40 * index,
      cy: 0,
      id: Util.generateUUI(),
    };
    actuatorArray.push(actuator);
  }
  return {
    type: "ACTUATOR_CHANGED",
    payload: actuatorArray,
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

export function addNewActuator() {
  const actuator = {
    number: "#" + newID++,
    cx: 0,
    cy: 0,
    id: Util.generateUUI(),
  };

  return {
    type: "ADD_NEW_ACTUATOR",
    payload: actuator,
  };
}

export function removeActuator(index) {
  return {
    type: "REMOVE_ACTUATOR",
    payload: index,
  };
}
