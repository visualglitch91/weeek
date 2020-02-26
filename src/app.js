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
import userService from "./services/user";
import { presentAlert } from "./utils";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => userService.onAuthStateChanged(setUser), []);

  useEffect(() => {
    if (!process.env.REACT_APP_USE_FIREBASE) {
      presentAlert(
        null,
        [
          "This version you are running is not connected to firebase,",
          "that means that all the data will be stored locally on this device."
        ].join(" "),
        ["Okay!"]
      );
    }
  }, []);

  return (
    <IonApp mode="md">
      {typeof user === "undefined" ? null : user === null ? (
        <Login login={userService.login} />
      ) : (
        <Tasks logout={userService.logout} />
      )}
    </IonApp>
  );
}

export default App;
