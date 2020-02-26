import { auth, db, createGoogleAuthProvider } from "../../firebase";

export function getUID() {
  return auth().currentUser.uid;
}

export function login() {
  return auth().signInWithPopup(createGoogleAuthProvider());
}

export function logout() {
  return auth().signOut();
}

export function onAuthStateChanged(handler) {
  return auth().onAuthStateChanged(handler);
}

export function getSettings() {
  return db()
    .collection("users")
    .doc(getUID())
    .get()
    .then(doc => doc.data());
}

export function updateSettings(values, options) {
  return db()
    .collection("users")
    .doc(getUID())
    .set(values, options);
}
