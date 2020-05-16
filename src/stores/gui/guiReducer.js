const INITIAL_STATE = {
  initialConfigModal: true,
  configDrawer: false,
  libraryModal: false,
  actuatorConfigModal: false,
  addChannelModal: false,
  addActuatorModal: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INITIAL_CONFIG_SAVE":
      return { ...state, initialConfigModal: false };
    case "OPEN_LIBRARY_MODAL":
      return { ...state, libraryModal: true };
    case "CLOSE_LIBRARY_MODAL":
      return { ...state, libraryModal: false };
    default:
      return state;
  }
}
