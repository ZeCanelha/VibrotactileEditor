import update from "immutability-helper";

const INITIAL_STATE = {
  timelineDbInstance: "",
  timelineID: "",
  channel: [
    {
      _id: 0,
      pattern: [],
      actuators: [],
    },
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

    case "ADD_ACTUATOR_TO_CHANNEL":
      return update(state, {
        channel: {
          [action.payload.channelID]: {
            actuators: { $push: [action.payload.actuator] },
          },
        },
      });
    case "REMOVE_ACTUATOR_FROM_CHANNEL":
      return update(state, {
        channel: {
          [action.payload.channelID]: {
            actuators: { $splice: [[action.payload.index, 1]] },
          },
        },
      });
    case "ADD_PATTERN_TO_CHANNEL":
      return update(state, {
        channel: {
          [action.payload.channelID]: {
            pattern: { $push: [action.payload.patternObject] },
          },
        },
      });
    case "REMOVE_PATTERN_FROM_TIMELINE":
      return update(state, {
        channel: {
          [action.payload.channelID]: {
            pattern: { $splice: [[action.payload.index, 1]] },
          },
        },
      });
    case "SET_TIMELINE_ID":
      return { ...state, timelineID: action.payload };
    case "SET_TIMELINE_DB_INSTANCE":
      return { ...state, timelineDbInstance: action.payload };
    case "SET_LOADED_TIMELINE_DATA":
      return { ...state, channel: action.payload };

    default:
      return state;
  }
}
