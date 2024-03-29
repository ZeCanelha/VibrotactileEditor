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

export function setDisplayPattern(bool) {
  return {
    type: "SET_DISPLAY_PATTERN",
    payload: bool,
  };
}

export function setCurrentPattern(index) {
  return {
    type: "SET_CURRENT_PATTERN",
    payload: index,
  };
}

export function setLoadedPatterns(patterns) {
  return {
    type: "SET_LOADED_PATTERNS",
    payload: patterns,
  };
}

export function updatePatternPosition(_patternIndex, coords) {
  return {
    type: "UPDATE_PATTERN_POSITION",
    payload: {
      patternIndex: _patternIndex,
      x: coords.x,
      emptyTime: coords.emptyTime,
    },
  };
}

export function updateDataString(_patternIndex, _points) {
  return {
    type: "UPDATE_DATA_STRING",
    payload: {
      patternIndex: _patternIndex,
      points: _points,
    },
  };
}

export function updateEditingTool(tool) {
  return {
    type: "UPDATE_EDITING_TOOL",
    payload: tool,
  };
}

export function clearPatterns() {
  return {
    type: "CLEAR_PATTERNS",
  };
}
