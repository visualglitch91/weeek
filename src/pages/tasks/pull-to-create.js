import React from "react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import styles from "./pull-to-create.module.css";

const REFRESHER_CONTENT = `
  <div class="${styles.refresherContent}">
    Pull to create a new task
  </div>
`;

function PullToCreate({ onPull }) {
  function onPullToRefresh(event) {
    event.detail.completed();
    onPull();
  }

  return (
    <IonRefresher
      style={{ height: 120 }}
      pullMin={120}
      slot="fixed"
      onIonRefresh={onPullToRefresh}
    >
      <IonRefresherContent
        pullingIcon="nope"
        refreshingIcon="nope"
        pullingText={REFRESHER_CONTENT}
        refreshingText={REFRESHER_CONTENT}
      ></IonRefresherContent>
    </IonRefresher>
  );
}

export default PullToCreate;
