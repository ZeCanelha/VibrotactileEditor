const INITIAL_STATE = {
  isInitialModalOpen: true,
  isConfigDrawerOpen: false,
  isLibraryModalOpen: false,
  isLibraryPatternModalOpen: false,
  isActuatorConfigModalOpen: false,
  isAddChannelModalOpen: false,
  isAddActuatorModalOpen: false,
  isSaveModalOpen: false,
  isSaveNotificationOpen: false,
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
    case "SHOW_SAVE_NOTIFICATION":
      return { ...state, isSaveNotificationOpen: true };
    case "CLOSE_SAVE_NOTIFICATION":
      return { ...state, isSaveNotificationOpen: false };
    default:
      return state;
  }
}
