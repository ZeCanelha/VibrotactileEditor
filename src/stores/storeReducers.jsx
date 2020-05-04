import { combineReducers } from "redux";
import configReducer from "./editor/editorReducer";

const reducers = combineReducers({
  config: configReducer,
});

export default reducers;
