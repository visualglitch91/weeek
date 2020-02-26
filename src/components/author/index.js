import React from "react";
import { IonText, IonIcon } from "@ionic/react";
import { heart } from "ionicons/icons";

function Author({ className }) {
  return (
    <IonText
      color="medium"
      style={{ display: "block", fontFamily: "Pacifico", fontSize: 14 }}
      className={["ion-text-center", "ion-margin-top", className]
        .filter(Boolean)
        .join(" ")}
    >
      made with <IonIcon icon={heart} style={{ color: "#f5aeae" }} /> by erica
    </IonText>
  );
}

export default Author;
