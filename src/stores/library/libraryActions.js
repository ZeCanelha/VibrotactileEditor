export function setPatterns(obj) {
  return {
    type: "SET_PATTERNS",
    payload: obj,
  };
}

export function updateSearchQuery(event) {
  return {
    type: "UPDATE_SEARCH_QUERY",
    payload: event.target.value,
  };
}
