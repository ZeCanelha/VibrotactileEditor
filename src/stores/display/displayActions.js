export function updatePatternToDisplay(id) {
  return {
    type: "SET_CURRENT_PATTERN_TO_DISPLAY",
    payload: id,
  };
}

export function setPatternPath(path) {
  return {
    type: "SET_PATTERN_PATH",
    payload: path,
  };
}

export function setPatternName(name) {
  return {
    type: "SET_PATTERN_NAME",
    payload: name,
  };
}

export function setPatternDescription(description) {
  return {
    type: "SET_PATTERN_DESCRIPTION",
    payload: description,
  };
}

export function setDisplayedOnLibrary() {
  return {
    type: "SET_DISPLAYED_ON_LIBRARY",
  };
}

export function setDisplayedOnTimeline() {
  return {
    type: "SET_DISPLAYED_ON_TIMELINE",
  };
}

export function setDisplayedOnDetail() {
  return {
    type: "SET_DISPLAYED_ON_DETAIL",
  };
}
