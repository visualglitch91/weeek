window.firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});

export const db = window.firebase.firestore();

export const serverTimestamp =
  window.firebase.firestore.FieldValue.serverTimestamp;

export const auth = window.firebase.auth();

export const googleAuthProvider = new window.firebase.auth.GoogleAuthProvider();

db.enablePersistence();
