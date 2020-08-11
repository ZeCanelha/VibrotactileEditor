import update from "immutability-helper";

const INITIAL_STATE = {
  id: 10,
  datapoints: [
    {
      time: 0,
      intensity: 50,
    },
    {
      time: 175,
      intensity: 50,
    },
    {
      time: 350,
      intensity: 50,
    },
  ],
  area: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "DATAPOINTS_CHANGE":
      return {
        ...state,
        datapoints: update(state.datapoints, {
          datapoints: { $set: action.payload },
        }),
      };
    case "AREA_UPDATED":
      return { ...state, area: action.payload };
    default:
      return state;
  }
}
