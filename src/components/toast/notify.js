let notifyApi = null;

export function registerNotifier(api) {
  notifyApi = api;
  return () => {
    if (notifyApi === api) {
      notifyApi = null;
    }
  };
}

export function notify(message, tone = "info") {
  if (notifyApi && typeof notifyApi.push === "function") {
    return notifyApi.push(message, tone);
  }
  window.alert(message);
}

export function notifySuccess(message) {
  return notify(message, "success");
}

export function notifyError(message) {
  return notify(message, "error");
}

export function notifyInfo(message) {
  return notify(message, "info");
}
