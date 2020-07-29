const INITIAL_STATE = {
  timelineID: null,
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
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
