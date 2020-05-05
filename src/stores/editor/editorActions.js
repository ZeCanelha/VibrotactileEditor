export function changeProjectName(e) {
  console.log("Project name changed");
  return {
    type: "NAME_CHANGED",
    payload: e.target.value,
  };
}

export function addChannel() {
  return {
    type: "NEW_CHANNEL",
  };
}

export function removeChannel(id) {
  return {
    type: "REMOVE_CHANNEL",
    payload: id,
  };
}
