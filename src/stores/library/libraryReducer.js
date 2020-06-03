// dummy patterns to test some functionalities
const INITIAL_STATE = {
  customPatterns: [],
  presetPatterns: null,
  searchQuery: "",
  displayRowSize: {
    width: 200,
    height: 150,
  },
};

// Fix state to add objects to state
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_CUSTOM_PATTERNS":
      return { ...state, customPatterns: action.payload };
    case "SET_PRESET_PATTERNS":
      return { ...state, presetPatterns: action.payload };
    case "UPDATE_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "UPDATE_DISPLAYROW_SIZE":
      return { ...state, displayRowSize: action.size };
    default:
      return state;
  }
}
