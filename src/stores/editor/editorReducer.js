const INITIAL_STATE = {
  projectId: "",
  projectName: "New Project",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PROJECT_ID_DEFINED":
      return { ...state, projectId: action.payload };
    case "NAME_CHANGED":
      return { ...state, projectName: action.payload };
    case "CONFIG_LOADED":
      return {
        ...state,
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
      };

    default:
      return state;
  }
}
