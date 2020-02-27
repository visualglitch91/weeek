import React from "react";
import { IonList, IonItemDivider, IonLabel } from "@ionic/react";
import { getCurrentWeek, weekDiff } from "../../utils";
import Task from "./task";
import styles from "./task-list.module.css";

function TaskSection({ children }) {
  return (
    <IonItemDivider sticky className={styles.divider}>
      <IonLabel>{children}</IonLabel>
    </IonItemDivider>
  );
}

function TaskList({ tasks, showCompleted, onToggleDone, onModify, onRemove }) {
  const currentWeek = getCurrentWeek();
  const pastTasks = [];
  const lastWeekTasks = [];
  const thisWeekTasks = [];
  const nextWeekTasks = [];
  const futureTasks = [];

  tasks.forEach(task => {
    const diff = weekDiff(task.week, currentWeek);

    if (!showCompleted && task.done) {
      return;
    }

    if (diff < -1 && !task.done) pastTasks.push(task);
    else if (diff === -1) lastWeekTasks.push(task);
    else if (diff === 0) thisWeekTasks.push(task);
    else if (diff === 1) nextWeekTasks.push(task);
    else if (diff > 1) futureTasks.push(task);
  });

  function renderTasks(tasks) {
    return tasks.map(task => (
      <Task
        key={task.id}
        task={task}
        onToggleDone={onToggleDone}
        onModify={onModify}
        onRemove={onRemove}
      />
    ));
  }

  function renderSection(label, tasks) {
    if (tasks.length) {
      return (
        <>
          <TaskSection>{label}</TaskSection>
          {renderTasks(tasks)}
        </>
      );
    }

    return null;
  }

  return (
    <IonList lines="none" className={`ion-no-padding ${styles.wrapper}`}>
      {renderSection("Past", pastTasks)}
      {renderSection("Last week", lastWeekTasks)}
      {renderSection("This week", thisWeekTasks)}
      {renderSection("Next week", nextWeekTasks)}
      {renderSection("Future", futureTasks)}
    </IonList>
  );
}

export default TaskList;
