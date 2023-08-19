import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { ToDoListPRops } from "./TodoList";
import { useState } from "react";

export type filterValuesType = "all" | "completed" | "active";

function App() {
  const tasksList: TaskType[] = [
    { id: 1, title: "task #1", isDone: false },
    { id: 2, title: "task #2", isDone: true },
    { id: 3, title: "task #3", isDone: true },
    { id: 4, title: "task #4", isDone: false },
  ];
  const [tasks, setTasks] = useState(tasksList);
  const [filter, setFilter] = useState<filterValuesType>("all");

  const removeTaskHandler = (id: number) => {
    setTasks(() => {
      return [...tasks].filter((el) => el.id !== id);
    });
  };
const changeFilter = (value:filterValuesType) => {
  setFilter(value)
}
  let tasksForToDoList = tasks;

  switch (filter) {
    case "completed":
      tasksForToDoList = tasks.filter((el) => el.isDone);
      break;
    case "active":
      tasksForToDoList = tasks.filter((el) => !el.isDone);
      break;
  }

  const props1: ToDoListPRops = {
    title: "What to learn",
    tasksList: tasksForToDoList,
    removeTaskHandler: removeTaskHandler,
    setFilter: setFilter,
  };

  return (
    <div className="App">
      <TodoList {...props1} />
    </div>
  );
}

export default App;
