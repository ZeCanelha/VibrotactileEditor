import update from "immutability-helper";

const INITIAL_STATE = {
  timelineID: null,
  channel: [
    {
      _id: 1,
      pattern: [],
      actuators: [],
    },
    {
      _id: 2,
      pattern: [],
      actuators: [],
    },
    {
      _id: 3,
      pattern: [],
      actuators: [],
    },
  ],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "REMOVE_CHANNEL":
      return {
        ...state,
        channel: [
          ...state.channel.filter((item) => {
            return item._id !== action.payload;
          }),
        ],
      };
    case "SET_NEW_ACTUATOR":
      return {
        ...state,
        channel: update(state.channel, {}),
      };

    default:
      return state;
  }
}
