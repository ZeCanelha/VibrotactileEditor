const INITIAL_STATE = {
  currentDisplayedPattern: null,
  patternPath: null,
  patternName: "",
  patternDescription: "",
  isDisplayedOnLibrary: true,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_CURRENT_PATTERN_TO_DISPLAY":
      return {
        ...state,
        currentDisplayedPattern: action.payload,
      };
    case "SET_PATTERN_PATH":
      return { ...state, patternPath: action.payload };
    case "SET_PATTERN_NAME":
      return {
        ...state,
        patternName: action.payload,
      };
    case "SET_PATTERN_DESCRIPTION":
      return { ...state, patternDescription: action.payload };
    case "SET_DISPLAYED_ON_LIBRARY":
      return { ...state, isDisplayedOnLibrary: true };
    case "SET_DISPLAYED_ON_TIMELINE":
      return { ...state, isDisplayedOnLibrary: false };
    case "SET_DISPLAYED_ON_DETAIL":
      return { ...state, isDisplayedOnDetail: true };

    default:
      return state;
  }
}
