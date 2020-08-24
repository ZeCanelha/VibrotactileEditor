import Util from "../../utils/util.js";

export function changeProjectName(e) {
  return {
    type: "NAME_CHANGED",
    payload: e.target.value,
  };
}

export function setProjectId() {
  return {
    type: "SET_PROJECT_ID",
    payload: Util.generateUUI(),
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

export function setDBInstance(dbID) {
  return {
    type: "SET_DB_INSTANCE_ID",
    payload: dbID,
  };
}
