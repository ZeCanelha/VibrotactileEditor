import { combineReducers } from "redux";
import configReducer from "./editor/editorReducer";
import guiReducer from "./gui/guiReducer";
import libraryReducer from "./library/libraryReducer";
import patternReducer from "./pattern/patternReducer";
import deviceReducer from "./device/deviceReducer";
import timelineReducer from "./timeline/timelineReducer";
import notificationReducer from "./notification/notificationReducer";
import displayReducer from "./display/displayReducer";

const reducers = combineReducers({
  config: configReducer,
  device: deviceReducer,
  timeline: timelineReducer,
  gui: guiReducer,
  library: libraryReducer,
  pattern: patternReducer,
  notification: notificationReducer,
  display: displayReducer,
});

export default reducers;
