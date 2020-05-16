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
