import moment from "moment";

const DATE_FORMAT = "YYYY-ww";

export function getCurrentWeek() {
  return moment().format(DATE_FORMAT);
}

export function weekDiff(a, b) {
  return moment(a, DATE_FORMAT).diff(moment(b, DATE_FORMAT), "weeks");
}

export function incrementWeek(week, increment) {
  return moment(week, DATE_FORMAT)
    .add(increment, "week")
    .format(DATE_FORMAT);
}

export function presentAlert(title, message, buttons) {
  const alert = document.createElement("ion-alert");

  alert.header = title;
  alert.message = Array.isArray(message) ? message.join("<br/><br/>") : message;
  alert.buttons = buttons;
  alert.backdropDismiss = false;

  document.body.appendChild(alert);
  alert.present();
}

export function clamp(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
}
