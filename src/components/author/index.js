import React from "react";
import { IonText } from "@ionic/react";

function Author() {
  return (
    <IonText
      color="medium"
      className="ion-text-center ion-margin-top"
      style={{ display: "block", fontFamily: "Pacifico", fontSize: 14 }}
    >
      made with <span style={{ color: "#f5aeae" }}>♥</span> by erica
    </IonText>
  );
}

export default Author;
