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
    default:
      return state;
  }
}
