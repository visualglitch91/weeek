const eventEmitter = document.createElement("div");
const tasks = (() => {
  try {
    return JSON.parse(window.localStorage.getItem("weeek_tasks")) || {};
  } catch (err) {
    return {};
  }
})();

function processChange() {
  window.localStorage.setItem("weeek_tasks", JSON.stringify(tasks));
  eventEmitter.dispatchEvent(new Event("change"));
}

export function subscribe(handler) {
  function onChange() {
    handler(Object.values(tasks));
  }

  onChange();
  eventEmitter.addEventListener("change", onChange);
  return () => eventEmitter.removeEventListener("change", onChange);
}

export function update(id, values, { merge = false } = {}) {
  tasks[id] = merge ? { ...tasks[id], ...values, id } : { ...values, id };
  processChange();
}

export function create(values) {
  const timestamp = Date.now();

  tasks[timestamp] = {
    ...values,
    id: timestamp,
    created_at: timestamp
  };

  processChange();
}

export function remove(id) {
  delete tasks[id];
  processChange();
}
