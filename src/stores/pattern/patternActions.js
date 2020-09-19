import Util from "../../utils/util.js";

export function updateDataPoints(patternIndex, _datapoints) {
  return {
    type: "PATTERN_UPDATE_DATAPOINTS",
    payload: { index: patternIndex, datapoints: _datapoints },
  };
}

export function updateAreaChart(_index, _area) {
  return {
    type: "AREA_UPDATED",
    payload: { index: _index, area: _area },
  };
}

export function setPatternId(id = null) {
  if (id) {
    return {
      type: "SET_PATTERN_ID",
      payload: id,
    };
  }
  return {
    type: "SET_PATTERN_ID",
    payload: Util.generateUUI(),
  };
}

export function removeDatapoint(patternIndex, _pointIndex) {
  return {
    type: "REMOVE_DATAPOINT",
    payload: { index: patternIndex, pointIndex: _pointIndex },
  };
}

//TODO: add default config here or create util to create pattern defaults
export function addPatternToList(pattern) {
  return {
    type: "ADD_PATTERN_TO_LIST",
    payload: pattern,
  };
}

export function removePatternFromList(index) {
  return {
    type: "REMOVE_PATTERN_FROM_LIST",
    payload: index,
  };
}

export function setDisplayPattern() {
  return {
    type: "SET_DISPLAY_PATTERN",
  };
}

export function setCurrentPattern(index) {
  return {
    type: "SET_CURRENT_PATTERN",
    payload: index,
  };
}
