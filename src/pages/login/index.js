import React from "react";
import { IonPage, IonContent, IonButton, IonTitle } from "@ionic/react";
import Author from "../../components/author";

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
              fontSize: 48
            }}
          >
            Weeek
          </IonTitle>
          <IonButton
            style={{
              "--color": "black",
              "--background":
                "linear-gradient(45deg, rgba(234, 146, 151, 0.5), rgba(224, 120, 214, 0.5))"
            }}
            expand="block"
            onClick={login}
          >
            Sign-in with Google
          </IonButton>
          <Author />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
