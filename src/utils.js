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
