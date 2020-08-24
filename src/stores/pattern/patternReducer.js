import update from "immutability-helper";

const INITIAL_STATE = {
  patternID: "",
  datapoints: [],
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
    case "DATAPOINTS_IMPORTED":
      return {
        ...state,
        datapoints: action.payload,
      };
    case "AREA_UPDATED":
      return { ...state, area: action.payload };
    case "SET_PATTERN_ID":
      return { ...state, patternID: action.payload };
    case "SET_INITIAL_DATAPOINTS":
      return {
        ...state,
        datapoints: action.payload,
      };

    default:
      return state;
  }
}
