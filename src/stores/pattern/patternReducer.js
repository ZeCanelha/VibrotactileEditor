import update from "immutability-helper";

const INITIAL_STATE = {
  patterns: [],
  isPatternDisplayed: false,
  currentPatternIndex: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PATTERN_UPDATE_DATAPOINTS":
      return {
        ...state,
        datapoints: update(state.patterns[action.payload.index].datapoints, {
          datapoints: { $set: action.payload.datapoints },
        }),
      };
    case "REMOVE_DATAPOINT":
      return update(state, {
        patterns: {
          [action.payload.index]: {
            datapoints: {
              $splice: [[action.payload.pointIndex, 1]],
            },
          },
        },
      });
    case "AREA_UPDATED":
      return update(state, {
        patterns: {
          [action.payload.index]: {
            area: { $set: action.payload.area },
          },
        },
      });
    case "ADD_PATTERN_TO_LIST":
      return update(state, {
        patterns: {
          $push: [action.payload],
        },
      });
    case "REMOVE_PATTERN_FROM_LIST":
      return update(state, {
        patterns: {
          $splice: [[action.payload, 1]],
        },
      });
    case "UPDATE_PATTERN_POSITION":
      return update(state, {
        patterns: {
          [action.payload.patternIndex]: {
            $set: {
              ...state.patterns[action.payload.patternIndex],
              x: action.payload.x,
              emptyTime: action.payload.emptyTime,
            },
          },
        },
      });
    case "UPDATE_DATA_STRING":
      return update(state, {
        patterns: {
          [action.payload.patternIndex]: {
            dataString: { $set: action.payload.points },
          },
        },
      });
    case "SET_DISPLAY_PATTERN":
      return { ...state, isPatternDisplayed: action.payload };
    case "SET_CURRENT_PATTERN":
      return { ...state, currentPatternIndex: action.payload };
    case "SET_LOADED_PATTERNS":
      return { ...state, patterns: action.payload };
    default:
      return state;
  }
}
