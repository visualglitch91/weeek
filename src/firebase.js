export function initializeApp() {
  window.firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  });

  db().enablePersistence();
}

export function db() {
  return window.firebase.firestore();
}

export function serverTimestamp() {
  return window.firebase.firestore.FieldValue.serverTimestamp();
}

export function auth() {
  return window.firebase.auth();
}

export function createGoogleAuthProvider() {
  return new window.firebase.auth.GoogleAuthProvider();
}
