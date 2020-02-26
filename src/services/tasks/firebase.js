import { db, serverTimestamp } from "../../firebase";
import userService from "../user";

export function subscribe(handler) {
  return db()
    .collection("tasks")
    .where("user", "==", userService.getUID())
    .orderBy("created_at", "asc")
    .orderBy("week", "asc")
    .onSnapshot(snapshot => {
      const nextTasks = [];

      snapshot.forEach(doc => {
        nextTasks.push({ id: doc.id, ...doc.data() });
      });

      handler(nextTasks);
    });
}

export function update(id, values, options) {
  return db()
    .collection("tasks")
    .doc(id)
    .set(values, options);
}

export function create(values) {
  return db()
    .collection("tasks")
    .add({
      ...values,
      user: userService.getUID(),
      created_at: serverTimestamp()
    });
}

export function remove(id) {
  return db()
    .collection("tasks")
    .doc(id)
    .delete();
}
