import React from "react";
import { IonPage, IonContent, IonButton, IonTitle } from "@ionic/react";

function Login({ login }) {
  return (
    <IonPage id="login">
      <IonContent fullscreen>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
          className="ion-justify-content-center ion-align-items-center ion-padding"
        >
          <IonTitle
            style={{
              flex: "unset",
              fontFamily: "Pacifico",
              fontSize: 48,
              marginBottom: 24
            }}
          >
            Weeek
          </IonTitle>
          <IonButton expand="block" color="primary" onClick={login}>
            Sign-in with Google
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
