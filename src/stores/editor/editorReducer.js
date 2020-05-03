const INITIAL_STATE = {
  projectName: "New Project",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NAME_CHANGED":
      return { projectName: action.payload };
    default:
      return state;
  }
}
