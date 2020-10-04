const INITIAL_STATE = {
  dbInstance: "",
  projectId: "",
  projectName: "New Project",
  serialPort: ""
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_PROJECT_ID":
      return { ...state, projectId: action.payload };
    case "SET_PROJECT_NAME":
      return { ...state, projectName: action.payload };
    case "CONFIG_LOADED":
      return {
        ...state,
        dbInstance: action.payload.dbInstanceId,
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        serialPort: action.payload.serialPort,
      };
    case "SET_DB_INSTANCE_ID":
      return {
        ...state,
        dbInstance: action.payload,
      };
    default:
      return state;
  }
}
