const INITIAL_STATE = {
  projectName: "New Project",
  hardwareDevice: "",
  deviceImage: null,
  actuators: 0,
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
    case "CONFIG_CHANGE":
      return { ...state, projectName: action.payload };
    default:
      return state;
  }
}
