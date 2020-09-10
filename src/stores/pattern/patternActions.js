import Util from "../../utils/util.js";

export function updateDataPoints(datapoints) {
  return {
    type: "DATAPOINTS_CHANGE",
    payload: datapoints,
  };
}

export function importDatapoints(datapoints) {
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

export function setInitialDatapoints() {
  const datapoints = [
    {
      time: 0,
      intensity: 50,
    },
    {
      time: 175,
      intensity: 50,
    },
    {
      time: 350,
      intensity: 50,
    },
  ];
  return {
    type: "SET_INITIAL_DATAPOINTS",
    payload: datapoints,
  };
}
