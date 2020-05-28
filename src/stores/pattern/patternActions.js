export function updateDataPoints(datapoints) {
  return {
    type: "DATAPOINTS_CHANGE",
    payload: datapoints,
  };
}

export function updateAreaChart(path) {
  return {
    type: "AREA_UPDATED",
    payload: path,
  };
}
