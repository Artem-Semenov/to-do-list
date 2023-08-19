import { filterValuesType } from "./App";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type ToDoListPRops = {
  title: string;
  tasksList: TaskType[];
  removeTaskHandler: (id: number) => void;
  setFilter: (value: filterValuesType) => void;
};
export const TodoList = ({
  title,
  tasksList,
  removeTaskHandler,
  setFilter,
}: ToDoListPRops) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {tasksList.map(({ id, isDone, title }) => (
          <li key={id}>
            <input type="checkbox" name="" id={String(id)} checked={isDone} />
            <span>{title}</span>
            <button
              onClick={() => {
                removeTaskHandler(id);
              }}>
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            setFilter("all");
          }}>
          All
        </button>
        <button
          onClick={() => {
            setFilter("active");
          }}>
          Active
        </button>
        <button
          onClick={() => {
            setFilter("completed");
          }}>
          Completed
        </button>
      </div>
    </div>
  );
};
