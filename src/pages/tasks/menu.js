import React from "react";
import { IonIcon, IonFab, IonFabButton, IonFabList } from "@ionic/react";
import {
  addOutline,
  chevronUp,
  eyeOutline,
  eyeOffOutline,
  logOutOutline
} from "ionicons/icons";

function Menu({ showCompleted, onShowCompletedToggle, onNewTask, onLogout }) {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton className="gradient-button">
        <IonIcon icon={chevronUp} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton className="gradient-button" onClick={onNewTask}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
        <IonFabButton
          className="gradient-button"
          onClick={onShowCompletedToggle}
        >
          <IonIcon icon={showCompleted ? eyeOutline : eyeOffOutline} />
        </IonFabButton>
        <IonFabButton className="gradient-button" onClick={onLogout}>
          <IonIcon icon={logOutOutline} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
}

export default Menu;
