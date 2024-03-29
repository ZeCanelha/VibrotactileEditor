const INITIAL_STATE = {
  isInitialModalOpen: true,
  isConfigDrawerOpen: false,
  isLibraryModalOpen: false,
  isLibraryPatternModalOpen: false,
  isActuatorConfigModalOpen: false,
  isAddChannelModalOpen: false,
  isSaveModalOpen: false,
  isNotificationOpen: false,
  isAddActuatorToChannelModalOpen: false,
  isDragActive: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INITIAL_CONFIG_SAVE":
      return { ...state, isInitialModalOpen: false };
    case "OPEN_LIBRARY_MODAL":
      return { ...state, isLibraryModalOpen: true };
    case "CLOSE_LIBRARY_MODAL":
      return { ...state, isLibraryModalOpen: false };
    case "OPEN_PATTERN_MODAL":
      return { ...state, isLibraryPatternModalOpen: true };
    case "CLOSE_PATTERN_MODAL":
      return { ...state, isLibraryPatternModalOpen: false };
    case "OPEN_SAVE_MODAL":
      return { ...state, isSaveModalOpen: true };
    case "CLOSE_SAVE_MODAL":
      return { ...state, isSaveModalOpen: false };
    case "OPEN_CONFIG_DRAWER":
      return { ...state, isConfigDrawerOpen: true };
    case "CLOSE_CONFIG_DRAWER":
      return { ...state, isConfigDrawerOpen: false };
    case "SHOW_NOTIFICATION":
      return { ...state, isNotificationOpen: true };
    case "CLOSE_NOTIFICATION":
      return { ...state, isNotificationOpen: false };
    case "OPEN_ADD_ACTUATOR_TO_CHANNEL_MODAL":
      return { ...state, isAddActuatorToChannelModalOpen: true };
    case "CLOSE_ADD_ACTUATOR_TO_CHANNEL_MODAL":
      return { ...state, isAddActuatorToChannelModalOpen: false };
    case "SET_DRAG_ACTIVE":
      return { ...state, isDragActive: true };
    case "SET_DRAG_FALSE":
      return { ...state, isDragActive: false };
    default:
      return state;
  }
}
