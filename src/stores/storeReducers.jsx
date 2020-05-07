import { combineReducers } from "redux";
import configReducer from "./editor/editorReducer";
import guiReducer from "./gui/guiReducer";

const reducers = combineReducers({
  config: configReducer,
  gui: guiReducer,
});

export default reducers;
