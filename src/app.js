import React, { useState, useEffect } from "react";
import { IonApp } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import Tasks from "./pages/tasks";
import Login from "./pages/login";
import { auth, googleAuthProvider } from "./firebase";

function login() {
  auth.signInWithPopup(googleAuthProvider);
}

function logout() {
  auth.signOut();
}

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => auth.onAuthStateChanged(setUser), []);

  return (
    <IonApp mode="md">
      {typeof user === "undefined" ? null : user === null ? (
        <Login login={login} />
      ) : (
        <Tasks user={user} logout={logout} />
      )}
    </IonApp>
  );
}

export default App;
