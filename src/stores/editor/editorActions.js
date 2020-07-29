export function changeProjectName(e) {
  return {
    type: "NAME_CHANGED",
    payload: e.target.value,
  };
}

export function defineProjectId(id) {
  return {
    type: "PROJECT_ID_DEFINED",
    payload: id,
  };
}

export function loadConfigs(config) {
  return {
    type: "CONFIG_LOADED",
    payload: config,
  };
}

export function addActuator() {
  return {
    type: "ADD_ACTUATOR",
  };
}
