import { filterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

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
        <IconButton
          aria-label="delete"
          onClick={deleteToDoList}
          title="delete to-do list">
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItemFunc={addTask} />
      <div>
        {tasksList.map(({ id, isDone, title }) => {
          const onRemoveHandler = () => removeTaskHandler(id, toDoListId);
          const onChangeHandler = () => {
            changeStatus(id, toDoListId);
          };
          const onChangeTitle = (newValue: string) => {
            changeTaskTitle(newValue, toDoListId, id);
          };
          return (
            <div key={id} className={isDone ? "is-done" : ""}>
              <Checkbox checked={isDone} onChange={onChangeHandler} />
              <EditableSpan title={title} onChangeTitle={onChangeTitle} />
              <IconButton
                aria-label="delete"
                onClick={onRemoveHandler}
                title="delete task">
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          onClick={onAllClick}
          variant={filter === "all" ? "contained" : undefined}>
          All
        </Button>
        <Button
          onClick={onActiveClick}
          variant={filter === "active" ? "contained" : undefined}>
          Active
        </Button>
        <Button
          onClick={onCompletedClick}
          variant={filter === "completed" ? "contained" : undefined}>
          Completed
        </Button>
      </div>
    </div>
  );
};
