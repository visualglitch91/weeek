import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
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
    if (!showCompleted && task.done) {
      return;
    }

    const diff = weekDiff(task.week, currentWeek);
    const element = (
      <Task
        task={task}
        onToggleDone={onToggleDone}
        onModify={onModify}
        onRemove={onRemove}
      />
    );

    if (diff < -1 && !task.done) pastTasks.push({ key: task.id, element });
    else if (diff === -1) lastWeekTasks.push({ key: task.id, element });
    else if (diff === 0) thisWeekTasks.push({ key: task.id, element });
    else if (diff === 1) nextWeekTasks.push({ key: task.id, element });
    else if (diff > 1) futureTasks.push({ key: task.id, element });
  });

  let items = [];

  [
    [pastTasks, "Past tasks", "PAST_TASKS"],
    [lastWeekTasks, "Last week", "LAST_WEEK"],
    [thisWeekTasks, "This week", "THIS_WEEK"],
    [nextWeekTasks, "Next week", "NEXT_WEEK"],
    [futureTasks, "Future", "FUTURE"]
  ].forEach(([tasks, label, key]) => {
    if (tasks.length > 0) {
      items = items.concat(
        { key, element: <TaskSection>{label}</TaskSection> },
        tasks
      );
    }
  });

  const [refMap] = useState(() => new WeakMap());
  const transitions = useTransition(items, item => item.key, {
    trail: 100,
    from: {
      opacity: 0,
      height: 0,
      transform: "translate3d(-100%,0px,0)"
    },
    enter: item => async next => {
      await next({ height: 0.1 });
      await next({
        height: refMap.get(item).firstChild.offsetHeight,
        transform: "translate3d(0%,0,0)",
        opacity: 1
      });
    },
    leave: { height: 0, opacity: 0 }
  });

  return (
    <IonList lines="none" className={`ion-no-padding ${styles.wrapper}`}>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          style={props}
          className={styles.animatedListItem}
          ref={ref => ref && refMap.set(item, ref)}
          id={`test-${key}`}
        >
          {item.element}
        </animated.div>
      ))}
    </IonList>
  );
}

export default TaskList;
