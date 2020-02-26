let settings = (() => {
  try {
    return JSON.parse(window.localStorage.getItem("weeek_settings")) || {};
  } catch (err) {
    return {};
  }
})();

function processChange() {
  window.localStorage.setItem("weeek_settings", JSON.stringify(settings));
}

export function getUID() {
  return "LOCAL_USER";
}

export function login() {}

export function logout() {}

export function onAuthStateChanged(handler) {
  handler({ uid: "LOCAL_USER" });
  return () => {};
}

export function getSettings() {
  return Promise.resolve(settings);
}

export function updateSettings(values, { merge = false } = {}) {
  settings = merge ? { ...settings, ...values } : values;
  processChange();
}
