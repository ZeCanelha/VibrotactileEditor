// dummy patterns to test some functionalities
const INITIAL_STATE = {
  patterns: [],
  searchQuery: "",
};

// Fix state to add objects to state
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_PATTERNS":
      return { ...state, patterns: action.payload };
    case "UPDATE_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}
