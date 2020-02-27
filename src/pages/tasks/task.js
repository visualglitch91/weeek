import React from "react";
import {
  IonItemOptions,
  IonItem,
  IonItemSliding,
  IonItemOption,
  IonIcon
} from "@ionic/react";
import {
  createOutline,
  trashOutline,
  checkmarkOutline,
  closeOutline
} from "ionicons/icons";

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
      <IonItemOptions
        side="start"
        onIonSwipe={callbackAndCloseOptions(onToggleDone)}
      >
        <IonItemOption
          color="light"
          expandable
          onClick={callbackAndCloseOptions(onToggleDone)}
        >
          <IonIcon
            slot="icon-only"
            icon={task.done ? closeOutline : checkmarkOutline}
          />
        </IonItemOption>
      </IonItemOptions>
      <IonItem style={{ fontSize: 13 }}>
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
