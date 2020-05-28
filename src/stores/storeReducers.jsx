import { combineReducers } from "redux";
import configReducer from "./editor/editorReducer";
import guiReducer from "./gui/guiReducer";
import libraryReducer from "./library/libraryReducer";
import patternReducer from "./pattern/patternReducer";

const reducers = combineReducers({
  config: configReducer,
  gui: guiReducer,
  library: libraryReducer,
  pattern: patternReducer,
});

export default reducers;
