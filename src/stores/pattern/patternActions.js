export function updateDataPoints(datapoints) {
  return {
    type: "DATAPOINTS_CHANGE",
    payload: datapoints,
  };
}

export function importDataPints(datapoints) {
  return {
    type: "DATAPOINTS_IMPORTED",
    payload: datapoints,
  };
}

export function updateAreaChart(path) {
  return {
    type: "AREA_UPDATED",
    payload: path,
  };
}

export function setPatternId(id) {
  return {
    type: "SET_PATTERN_ID",
    payload: id,
  };
}
