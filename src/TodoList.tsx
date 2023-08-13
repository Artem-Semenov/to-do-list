export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type ToDoListPRops = {
    title: string;
    tasksList: TaskType[];
};
export const TodoList = ({ title,  tasksList}: ToDoListPRops) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {tasksList.map((el) => (
          <li key={el.id}>
            <input
              type="checkbox"
              name=""
              id={String(el.id)}
              checked={el.isDone}
            />
            <span>{el.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Complited</button>
      </div>
    </div>
  );
};
