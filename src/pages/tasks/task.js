import React from "react";
import {
  IonItemOptions,
  IonItem,
  IonItemSliding,
  IonItemOption,
  IonIcon,
  IonCheckbox
} from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";

const DONE_TEXT_STYLE = {
  color: "#888",
  textDecoration: "line-through"
};

function Task({ task, onToggleDone, onModify, onRemove }) {
  const slidingRef = React.useRef();

  function callbackAndCloseOptions(callback) {
    return () => {
      callback(task);
      slidingRef.current.close();
    };
  }

  return (
    <IonItemSliding ref={slidingRef}>
      <IonItem>
        <IonCheckbox
          color="light"
          slot="start"
          checked={task.done}
          onIonChange={callbackAndCloseOptions(onToggleDone)}
        />
        <span style={task.done ? DONE_TEXT_STYLE : null}>{task.text}</span>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          color="primary"
          onClick={callbackAndCloseOptions(onModify)}
        >
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={callbackAndCloseOptions(onRemove)}
        >
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}

export default Task;
