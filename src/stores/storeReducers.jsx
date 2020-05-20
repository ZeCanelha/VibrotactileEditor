import { combineReducers } from "redux";
import configReducer from "./editor/editorReducer";
import guiReducer from "./gui/guiReducer";
import libraryReducer from "./library/libraryReducer";

const reducers = combineReducers({
  config: configReducer,
  gui: guiReducer,
  library: libraryReducer,
});

export default reducers;
