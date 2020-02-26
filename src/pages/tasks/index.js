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
import { getCurrentWeek } from "../../utils";
import { db, serverTimestamp } from "../../firebase";
import Author from "../../components/author";
import TaskList from "./task-list";
import FormModal from "./form-modal";

function TasksPage({ user, logout }) {
  const [formTask, setFormTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("tasks")
      .where("user", "==", user.uid)
      .orderBy("created_at", "asc")
      .orderBy("week", "asc")
      .onSnapshot(snapshot => {
        const nextTasks = [];

        snapshot.forEach(doc => {
          nextTasks.push({ id: doc.id, ...doc.data() });
        });

        setTasks(nextTasks);
      });

    return unsubscribe;
  }, [user.uid]);

  function onToggleDone({ id, done }) {
    db.collection("tasks")
      .doc(id)
      .set({ done: !done }, { merge: true });
  }

  function onModify(task) {
    setFormTask(task);
  }

  function onRemove({ id }) {
    db.collection("tasks")
      .doc(id)
      .delete();
  }

  function onNewTask() {
    setFormTask({
      id: null,
      text: "",
      week: getCurrentWeek(),
      done: false,
      user: user.uid
    });
  }

  function onFormSave({ id, ...values }) {
    if (id) {
      db.collection("tasks")
        .doc(id)
        .set(values);
    } else {
      db.collection("tasks").add({ ...values, created_at: serverTimestamp() });
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
              "linear-gradient(45deg, rgba(234, 146, 151, 0.5), rgba(224, 120, 214, 0.5))"
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
            <IonButton style={{ fontSize: 20 }} color="danger" onClick={logout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
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
        <Author />
      </IonContent>
    </IonPage>
  );
}

export default TasksPage;
