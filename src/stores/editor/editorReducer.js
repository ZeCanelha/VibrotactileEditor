const INITIAL_STATE = {
  projectId: "",
  projectName: "New Project",
  hardwareDevice: "",
  deviceImage: null,
  actuators: 1,
  actuators_coords: [],
  timeline: {
    timeline_id: 1,
    channel: [
      {
        _id: 1,
        pattern: null,
        actuators: [],
      },
      {
        _id: 2,
        pattern: null,
        actuators: [],
      },
      {
        _id: 3,
        pattern: null,
        actuators: [],
      },
    ],
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PROJECT_ID_DEFINED":
      return { ...state, projectId: action.payload };
    case "NAME_CHANGED":
      return { ...state, projectName: action.payload };
    case "DEVICE_CHANGED":
      return { ...state, hardwareDevice: action.payload };
    case "ACTUATOR_CHANGED":
      return { ...state, actuators: action.payload };
    case "ACTUATOR_COORDS_UPDATED":
      return {
        ...state,
        actuators_coords: action.payload,
      };
    case "DEVICEIMAGE_CHANGED":
      return { ...state, deviceImage: action.payload };
    case "REMOVE_CHANNEL":
      return {
        ...state,
        timeline: {
          ...state.timeline,
          channel: [
            ...state.timeline.channel.filter((item) => {
              return item._id !== action.payload;
            }),
          ],
        },
      };
    case "CONFIG_LOADED":
      return {
        ...state,
        projectId: action.payload._id,
        projectName: action.payload.name,
        hardwareDevice: action.payload.device,
        deviceImage: action.payload.device_image,
        actuators: action.payload.n_actuators,
        actuators_coords: action.payload.actuator_coords,
      };

    default:
      return state;
  }
}
