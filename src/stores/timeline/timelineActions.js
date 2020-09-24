import Util from "../../utils/util.js";

export function addChannelToTimeline() {
  let defaultChannel = {
    _id: Util.generateUUI(),
    pattern: [],
    actuators: [],
  };
  return {
    type: "ADD_CHANNEL_TO_TIMELINE",
    payload: defaultChannel,
  };
}

export function removeChannel(index) {
  return {
    type: "REMOVE_CHANNEL",
    payload: index,
  };
}

export function addPatternToChannel(_patternID, cId, _x = 0, _y = 0) {
  return {
    type: "ADD_PATTERN_TO_CHANNEL",
    payload: {
      patternID: { patternID: _patternID, x: _x, y: _y },
      channelID: cId,
    },
  };
}
export function removePatternFromChannel(index, channelID) {
  return {
    type: "REMOVE_PATTERN_FROM_CHANNEL",
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

export function setAddActuatorToChannel(channelID, actuatorID) {
  return {
    type: "ADD_ACTUATOR_TO_CHANNEL",
    payload: { channelID: channelID, actuator: actuatorID },
  };
}

export function setRemoveActuatorFromChannel(channelID, index) {
  return {
    type: "REMOVE_ACTUATOR_FROM_CHANNEL",
    payload: { channelID: channelID, index: index },
  };
}
