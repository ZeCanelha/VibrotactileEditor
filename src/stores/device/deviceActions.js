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
      id: index,
      cx: 40 * index,
      cy: 0,
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

export function addNewActuator(oldArray) {
  // Always returning an ordered array
  let actuatorArray = oldArray;
  let newPosition = false;

  for (let index = 0; index < actuatorArray.length; index++) {
    const element = actuatorArray[index].id;
    if (element > index) {
      newPosition = index;
      break;
    }
  }

  if (newPosition === false) {
    actuatorArray.push({
      cx: 0,
      cy: 0,
      id: actuatorArray.length,
    });
  } else {
    actuatorArray.splice(newPosition, 0, {
      cx: 0,
      cy: 0,
      id: newPosition,
    });
  }

  return {
    type: "ADD_NEW_ACTUATOR",
    payload: {
      actuators: actuatorArray,
      numberOfActuators: actuatorArray.length,
    },
  };
}

export function removeActuator(index) {
  return {
    type: "REMOVE_ACTUATOR",
    payload: index,
  };
}
