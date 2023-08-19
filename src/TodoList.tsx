import { ChangeEvent, useState, KeyboardEvent } from "react";
import { filterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type ToDoListProps = {
  title: string;
  tasksList: TaskType[];
  removeTaskHandler: (id: string) => void;
  changeFilter: (value: filterValuesType) => void;
  addTaskFunc: (name: string) => void;
};

export const TodoList = ({
  title,
  tasksList,
  removeTaskHandler,
  changeFilter,
  addTaskFunc,
}: ToDoListProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = () => {
    addTaskFunc(newTaskTitle);
    setNewTaskTitle("");
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      addTask();
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onAllClick = () => changeFilter("all");
  const onActiveClick = () => changeFilter("active");
  const onCompletedClick = () => changeFilter("completed");

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onKeyDown={onInputKeyDown}
          onChange={onChangeHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasksList.map(({ id, isDone, title }) => {
          const onRemoveHandler = () => removeTaskHandler(id);
          return (
            <li key={id}>
              <input type="checkbox" name="" id={id} checked={isDone} />
              <span>{title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClick}>All</button>
        <button onClick={onActiveClick}>Active</button>
        <button onClick={onCompletedClick}>Completed</button>
      </div>
    </div>
  );
};
