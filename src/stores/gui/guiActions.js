export function closeInitialConfig() {
  return {
    type: "INITIAL_CONFIG_SAVE",
  };
}

export function openLibraryModal() {
  return {
    type: "OPEN_LIBRARY_MODAL",
  };
}

export function closeLibraryModal() {
  return {
    type: "CLOSE_LIBRARY_MODAL",
  };
}

export function openPatternModal() {
  return {
    type: "OPEN_PATTERN_MODAL",
  };
}

export function closePatternModal() {
  return {
    type: "CLOSE_PATTERN_MODAL",
  };
}

export function openSaveModal() {
  return {
    type: "OPEN_SAVE_MODAL",
  };
}

export function closeSaveModal() {
  return {
    type: "CLOSE_SAVE_MODAL",
  };
}

export function openConfigDrawer() {
  return {
    type: "OPEN_CONFIG_DRAWER",
  };
}

export function closeConfigDrawer() {
  return {
    type: "CLOSE_CONFIG_DRAWER",
  };
}

export function showSaveNotification() {
  return {
    type: "SHOW_SAVE_NOTIFICATION",
  };
}

export function closeSaveNotification() {
  return {
    type: "CLOSE_SAVE_NOTIFICATION",
  };
}
