import React, { useState, useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { getCurrentWeek, presentAlert } from "../../utils";
import useLocalState from "../../hooks/use-local-state";
import userService from "../../services/user";
import taskService from "../../services/tasks";
import Author from "../../components/author";
import TaskList from "./task-list";
import FormModal from "./form-modal";
import useHeader from "./use-header";
import Menu from "./menu";
import PullToCreate from "./pull-to-create";

function TasksPage({ logout: onLogout }) {
  const [formTask, setFormTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [ionContentRef, header] = useHeader();

  const [showCompleted, setShowCompleted] = useLocalState(
    `weeek__${userService.getUID()}__show_completed`,
    true
  );

  useEffect(() => taskService.subscribe(setTasks), []);

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

  function onShowCompletedToggle() {
    setShowCompleted(x => !x);
  }

  function onToggleDone({ id, done }) {
    taskService.update(id, { done: !done }, { merge: true });
  }

  function onModify(task) {
    setFormTask(task);
  }

  function onRemove({ id }) {
    presentAlert(
      null,
      "Are you sure you want to delete this task? This cannont be undone.",
      [
        {
          text: "Take me back",
          role: "cancel"
        },
        {
          text: "Delete it!",
          cssClass: "alert-button-danger",
          handler: () => {
            taskService.remove(id);
          }
        }
      ]
    );
  }

  function onNewTask() {
    setFormTask({
      id: null,
      text: "",
      week: getCurrentWeek(),
      done: false
    });
  }

  function onPullToCreate() {
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
      <Menu
        showCompleted={showCompleted}
        onShowCompletedToggle={onShowCompletedToggle}
        onNewTask={onNewTask}
        onLogout={onLogout}
      />
      {header}
      <IonContent ref={ionContentRef}>
        <PullToCreate onPull={onPullToCreate} />
        <TaskList
          showCompleted={showCompleted}
          tasks={tasks}
          onToggleDone={onToggleDone}
          onModify={onModify}
          onRemove={onRemove}
        />
        <div className="ion-padding-vertical">
          <Author className="ion-margin-vertical" />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default TasksPage;
