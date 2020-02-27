import React, { useState } from "react";
import {
  IonLabel,
  IonItem,
  IonButton,
  IonInput,
  IonText,
  IonRadio,
  IonRadioGroup,
  IonContent
} from "@ionic/react";
import Dialog from "@material-ui/core/Dialog";
import { getCurrentWeek, incrementWeek } from "../../utils";

function WeekOption({ label, value }) {
  return (
    <IonItem lines="full">
      <IonLabel>{label}</IonLabel>
      <IonRadio slot="end" value={value} />
    </IonItem>
  );
}

function Form({ task, onSave, onCancel }) {
  const currentWeek = getCurrentWeek();
  const [values, setValues] = useState(null);
  const modify = Boolean(values && values.id);

  function onWillPresent() {
    setValues({ ...task });
  }

  function onDidDismiss() {
    setValues(null);
  }

  function onValueChange(key) {
    return e => setValues({ ...values, [key]: e.target.value });
  }

  function submit() {
    onSave(values);
  }

  return (
    <Dialog
      fullWidth
      open={Boolean(task)}
      onEntering={onWillPresent}
      onExited={onDidDismiss}
      container={document.querySelector("ion-app")}
    >
      <div>
        <IonItem>
          <IonText
            className="ion-padding-vertical"
            style={{ fontSize: 18, fontFamily: "Pacifico" }}
          >
            {modify ? "Update task" : "New task"}
          </IonText>
        </IonItem>
        {values && (
          <>
            <IonItem>
              <IonLabel position="floating">Task</IonLabel>
              <IonInput
                value={values.text}
                placeholder="Buy groceries..."
                onIonChange={onValueChange("text")}
              ></IonInput>
            </IonItem>
            <IonRadioGroup
              value={values.week}
              onIonChange={onValueChange("week")}
            >
              <WeekOption label="This week" value={currentWeek} />
              <WeekOption
                label="Next week"
                value={incrementWeek(currentWeek, 1)}
              />
              <WeekOption
                label="In 2 weeks"
                value={incrementWeek(currentWeek, 2)}
              />
              <WeekOption
                label="In 3 weeks"
                value={incrementWeek(currentWeek, 3)}
              />
              <WeekOption
                label="In 4 weeks"
                value={incrementWeek(currentWeek, 4)}
              />
            </IonRadioGroup>
            <div className="ion-margin-top ion-text-end">
              <IonButton color="secondary" onClick={onCancel} fill="clear">
                Cancel
              </IonButton>
              <IonButton
                disabled={values.text === ""}
                color="primary"
                onClick={submit}
                fill="clear"
              >
                Save
              </IonButton>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default Form;
