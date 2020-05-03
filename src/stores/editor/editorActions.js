export function changeProjectName(e) {
  console.log("Project name changed");
  return {
    type: "NAME_CHANGED",
    payload: e.target.value,
  };
}
