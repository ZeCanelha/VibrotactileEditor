const INITIAL_STATE = {
  initialConfigModal: true,
  configDrawer: false,
  libraryModal: false,
  libraryPatternModal: false,
  actuatorConfigModal: false,
  addChannelModal: false,
  addActuatorModal: false,
  saveModal: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INITIAL_CONFIG_SAVE":
      return { ...state, initialConfigModal: false };
    case "OPEN_LIBRARY_MODAL":
      return { ...state, libraryModal: true };
    case "CLOSE_LIBRARY_MODAL":
      return { ...state, libraryModal: false };
    case "OPEN_PATTERN_MODAL":
      return { ...state, libraryPatternModal: true };
    case "CLOSE_PATTERN_MODAL":
      return { ...state, libraryPatternModal: false };
    case "OPEN_SAVE_MODAL":
      return { ...state, saveModal: true };
    case "CLOSE_SAVE_MODAL":
      return { ...state, saveModal: false };
    default:
      return state;
  }
}
