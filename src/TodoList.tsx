import { filterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
  addItemFunc: (name: string, toDoListId: string) => void;
  changeStatus: (id: string, toDoListId: string) => void;
  filter: filterValuesType;
  toDoListId: string;
  removeToDoList: (toDoListId: string) => void;
  changeTaskTitle: (
    newValue: string,
    toDoListId: string,
    taskId: string
  ) => void;
  changeListTitle: (newValue: string, toDoListId: string) => void;
};

export const TodoList = ({
  title,
  tasksList,
  removeTaskHandler,
  changeFilter,
  addItemFunc,
  changeStatus,
  filter,
  toDoListId,
  removeToDoList,
  changeTaskTitle,
  changeListTitle,
}: ToDoListProps) => {
  const onAllClick = () => changeFilter("all", toDoListId);

  const onActiveClick = () => changeFilter("active", toDoListId);

  const onCompletedClick = () => changeFilter("completed", toDoListId);

  const deleteToDoList = () => removeToDoList(toDoListId);

  const addTask = (title: string) => {
    addItemFunc(title, toDoListId);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          onChangeTitle={(newValue: string) =>
            changeListTitle(newValue, toDoListId)
          }
        />{" "}
        <button onClick={deleteToDoList}>X</button>
      </h3>
      <AddItemForm addItemFunc={addTask} />
      <ul>
        {tasksList.map(({ id, isDone, title }) => {
          const onRemoveHandler = () => removeTaskHandler(id, toDoListId);
          const onChangeHandler = () => {
            changeStatus(id, toDoListId);
          };
          const onChangeTitle = (newValue: string) => {
            changeTaskTitle(newValue, toDoListId, id);
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
              <EditableSpan title={title} onChangeTitle={onChangeTitle} />
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
