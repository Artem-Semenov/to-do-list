import { v1 } from "uuid";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { ToDoListProps } from "./TodoList";
import { useState } from "react";

export type filterValuesType = "all" | "completed" | "active";

function App() {
  const tasksList: TaskType[] = [
    { id: v1(), title: "task #1", isDone: false },
    { id: v1(), title: "task #2", isDone: true },
    { id: v1(), title: "task #3", isDone: true },
    { id: v1(), title: "task #4", isDone: false },
    { id: v1(), title: "task #4", isDone: false },
  ];

  const [tasks, setTasks] = useState(tasksList);
  const [filter, setFilter] = useState<filterValuesType>("all");

  const removeTaskHandler = (id: string) => {
    setTasks(() => {
      return [...tasks].filter((el) => el.id !== id);
    });
  };

  const changeFilter = (value: filterValuesType) => {
    setFilter(value);
  };

  const addTask = (name: string) => {
    let newTask: TaskType = {
      id: v1(),
      isDone: false,
      title: name,
    };
    setTasks([newTask, ...tasks]);
  };

  let tasksForToDoList = tasks;

  switch (filter) {
    case "completed":
      tasksForToDoList = tasks.filter((el) => el.isDone);
      break;
    case "active":
      tasksForToDoList = tasks.filter((el) => !el.isDone);
      break;
  }

  const props1: ToDoListProps = {
    title: "What to learn",
    tasksList: tasksForToDoList,
    removeTaskHandler: removeTaskHandler,
    changeFilter: changeFilter,
    addTaskFunc: addTask,
  };

  return (
    <div className="App">
      <TodoList {...props1} />
    </div>
  );
}

export default App;
