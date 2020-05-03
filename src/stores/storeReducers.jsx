import { combineReducers } from "redux";
import projectNameReducer from "./editor/editorReducer";

const reducers = combineReducers({
  projectName: projectNameReducer,
});

export default reducers;
