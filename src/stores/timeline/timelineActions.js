import Util from "../../utils/util.js";

export function addChannel() {
  return {
    type: "ADD_CHANNEL",
  };
}

export function removeChannel(id) {
  return {
    type: "REMOVE_CHANNEL",
    payload: id,
  };
}

export function setActuator(actuatorID, channelID) {
  return {
    type: "SET_NEW_ACTUATOR",
    payload: { actId: actuatorID, chanID: channelID },
  };
}

export function addPatternToTimeline(patternObject, cId) {
  return {
    type: "ADD_PATTERN_TO_CHANNEL",
    payload: { patternObject: patternObject, channelID: cId },
  };
}
export function removePatternFromTimeline(index, channelID) {
  return {
    type: "REMOVE_PATTERN_FROM_TIMELINE",
    payload: { index: index, channelID: channelID },
  };
}

export function setTimelineID(id = null) {
  if (id) {
    return {
      type: "SET_TIMELINE_ID",
      payload: id,
    };
  }

  return {
    type: "SET_TIMELINE_ID",
    payload: Util.generateUUI(),
  };
}

export function setTimelineDBInstance(dbInstanceId) {
  return {
    type: "SET_TIMELINE_DB_INSTANCE",
    payload: dbInstanceId,
  };
}

export function setLoadedDataToTimeline(channels) {
  return {
    type: "SET_LOADED_TIMELINE_DATA",
    payload: channels,
  };
}

export function setUploadingDataTrue() {
  return {
    type: "SET_UPLOADING_DATA_TRUE",
  };
}

export function setUploadingDataFalse() {
  return {
    type: "SET_UPLOADING_DATA_FALSE",
  };
}
