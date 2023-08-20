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
  removeTaskHandler: (id: string, toDoListId: string) => void;
  changeFilter: (value: filterValuesType, toDoListId: string) => void;
  addTaskFunc: (name: string, toDoListId: string) => void;
  changeStatus: (id: string, toDoListId: string) => void;
  filter: filterValuesType;
  toDoListId: string;
  removeToDoList: (toDoListId: string) => void;
};

export const TodoList = ({
  title,
  tasksList,
  removeTaskHandler,
  changeFilter,
  addTaskFunc,
  changeStatus,
  filter,
  toDoListId,
  removeToDoList,
}: ToDoListProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    const taskTitle = newTaskTitle.trim();
    if (!taskTitle) {
      setError("Field is required");
      return;
    }
    addTaskFunc(taskTitle, toDoListId);
    setNewTaskTitle("");
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onAllClick = () => changeFilter("all", toDoListId);

  const onActiveClick = () => changeFilter("active", toDoListId);

  const onCompletedClick = () => changeFilter("completed", toDoListId);

  const deleteToDoList = () => removeToDoList(toDoListId);

  return (
    <div>
      <h3>
        {title} <button onClick={deleteToDoList}>X</button>
      </h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onKeyDown={onInputKeyDown}
          onChange={onChangeHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {tasksList.map(({ id, isDone, title }) => {
          const onRemoveHandler = () => removeTaskHandler(id, toDoListId);
          const onChangeHandler = () => {
            changeStatus(id, toDoListId);
          };
          return (
            <li key={id} className={isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                name=""
                id={id}
                checked={isDone}
                onChange={onChangeHandler}
              />
              <span>{title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={onAllClick}
          className={filter === "all" ? "active-filter" : ""}>
          All
        </button>
        <button
          onClick={onActiveClick}
          className={filter === "active" ? "active-filter" : ""}>
          Active
        </button>
        <button
          onClick={onCompletedClick}
          className={filter === "completed" ? "active-filter" : ""}>
          Completed
        </button>
      </div>
    </div>
  );
};
