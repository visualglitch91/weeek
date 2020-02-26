import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonIcon,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent
} from "@ionic/react";
import { addOutline, logOutOutline } from "ionicons/icons";
import { getCurrentWeek, presentAlert } from "../../utils";
import userService from "../../services/user";
import taskService from "../../services/tasks";
import Author from "../../components/author";
import TaskList from "./task-list";
import FormModal from "./form-modal";
import styles from "./index.module.css";

const REFRESHER_CONTENT = `
  <div class="${styles.refresherContent}">
    Pull to create a new task
  </div>
`;

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
            "Use the plus button or pull down to create a new task",
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

  function onPullToRefresh(event) {
    event.detail.complete();
    setTimeout(onNewTask, 200);
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
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          size="small"
          onClick={onNewTask}
          style={{
            "--color": "black",
            "--background":
              "linear-gradient(45deg, rgb(200, 240, 244), rgb(240, 187, 234))"
          }}
        >
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
      <IonHeader>
        <IonToolbar
          style={{
            "--background":
              "linear-gradient(0deg, rgb(200, 240, 244), rgb(240, 187, 234))"
          }}
        >
          <IonTitle style={{ fontFamily: "Pacifico", fontSize: 26 }}>
            Weeek
          </IonTitle>
          {process.env.REACT_APP_USE_FIREBASE && (
            <IonButtons slot="end">
              <IonButton
                style={{ fontSize: 20 }}
                color="danger"
                onClick={logout}
              >
                <IonIcon icon={logOutOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={onPullToRefresh}>
          <IonRefresherContent
            pullingIcon="nope"
            refreshingIcon="nope"
            pullingText={REFRESHER_CONTENT}
            refreshingText={REFRESHER_CONTENT}
          ></IonRefresherContent>
        </IonRefresher>
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
