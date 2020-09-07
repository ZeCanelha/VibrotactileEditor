import update from "immutability-helper";

const INITIAL_STATE = {
  hardwareDevice: "",
  deviceImage: null,
  actuators: 1,
  actuators_coords: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "DEVICE_CHANGED":
      return { ...state, hardwareDevice: action.payload };
    case "ACTUATOR_CHANGED":
      return { ...state, actuators: action.payload };
    case "ADD_NEW_ACTUATOR":
      return {
        ...state,
        actuators: state.actuators + 1,
      };
    case "ACTUATOR_COORDS_UPDATED":
      return update(state, {
        actuators_coords: {
          [action.payload.index]: {
            cx: { $set: action.payload.x },
            cy: { $set: action.payload.y },
          },
        },
      });
    case "DEVICEIMAGE_CHANGED":
      return { ...state, deviceImage: action.payload };
    case "DEVICE_CONFIGURATIONS_LOADED":
      return {
        ...state,
        hardwareDevice: action.payload.hardwareDevice,
        deviceImage: action.payload.deviceImage,
        actuators: action.payload.actuators,
        actuators_coords: action.payload.actuators_coords,
      };

    default:
      return state;
  }
}
