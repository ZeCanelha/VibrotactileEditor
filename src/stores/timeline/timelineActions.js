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
