export function setCustomPatterns(obj) {
  console.log("ey");

  return {
    type: "SET_CUSTOM_PATTERNS",
    payload: obj,
  };
}

export function setPresetPatterns(obj) {
  return {
    type: "SET_PRESET_PATTERNS",
    payload: obj,
  };
}

export function updateSearchQuery(event) {
  return {
    type: "UPDATE_SEARCH_QUERY",
    payload: event.target.value,
  };
}

export function updateDisplayRowSize(size) {
  return {
    type: "UPDATE_DISPLAYROW_SIZE",
    payload: size,
  };
}
