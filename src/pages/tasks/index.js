import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonIcon
} from "@ionic/react";
import { addOutline, logOutOutline } from "ionicons/icons";
import { getCurrentWeek, presentAlert } from "../../utils";
import userService from "../../services/user";
import taskService from "../../services/tasks";
import Author from "../../components/author";
import TaskList from "./task-list";
import FormModal from "./form-modal";

function TasksPage({ logout }) {
  const [formTask, setFormTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = taskService.subscribe(setTasks);
    return unsubscribe;
  }, []);

  useEffect(() => {
    userService.getSettings().then(({ seenTutorial }) => {
      if (!seenTutorial) {
        presentAlert(
          null,
          [
            "Swipes task right to mark them done/undone",
            "Swipe tasks left to change or delete them"
          ],
          ["Got it!"]
        );

        userService.updateSettings({ seenTutorial: true }, { merge: true });
      }
    });
  }, []);

  function onToggleDone({ id, done }) {
    taskService.update(id, { done: !done }, { merge: true });
  }

  function onModify(task) {
    setFormTask(task);
  }

  function onRemove({ id }) {
    taskService.remove(id);
  }

  function onNewTask() {
    setFormTask({
      id: null,
      text: "",
      week: getCurrentWeek(),
      done: false
    });
  }

  function onFormSave({ id, ...values }) {
    if (id) {
      taskService.update(id, values);
    } else {
      taskService.create(values);
    }

    setFormTask(null);
  }

  function onFormCancel() {
    setFormTask(null);
  }

  return (
    <IonPage id="tasks">
      <FormModal task={formTask} onSave={onFormSave} onCancel={onFormCancel} />
      <IonHeader>
        <IonToolbar
          style={{
            "--background":
              "linear-gradient(0deg, rgb(200, 240, 244), rgb(240, 187, 234))"
          }}
        >
          <IonButtons slot="end">
            <IonButton
              style={{ fontSize: 20 }}
              color="primary"
              onClick={onNewTask}
            >
              <IonIcon icon={addOutline} />
            </IonButton>
            {process.env.REACT_APP_USE_FIREBASE && (
              <IonButton
                style={{ fontSize: 20 }}
                color="danger"
                onClick={logout}
              >
                <IonIcon icon={logOutOutline} />
              </IonButton>
            )}
          </IonButtons>
          <IonTitle style={{ fontFamily: "Pacifico", fontSize: 26 }}>
            Weeek
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TaskList
          tasks={tasks}
          onToggleDone={onToggleDone}
          onModify={onModify}
          onRemove={onRemove}
        />
        <Author className="ion-margin-bottom" />
      </IonContent>
    </IonPage>
  );
}

export default TasksPage;
