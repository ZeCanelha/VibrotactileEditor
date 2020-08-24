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

export function addPatternToTimeline(pId, cId) {
  return {
    type: "ADD_PATTERN_TO_CHANNEL",
    payload: { patternID: pId, channelID: cId },
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
