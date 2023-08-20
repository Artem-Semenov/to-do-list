import { v1 } from "uuid";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { useState } from "react";

export type filterValuesType = "all" | "completed" | "active";

function App() {
  type ToDoListsType = {
    filter: filterValuesType;
    id: string;
    title: string;
  };

  type TasksObjType = {
    [x: string]: TaskType[];
  };

  let toDoListId1 = v1();
  let toDoListId2 = v1();

  const [toDoLists, settoDoLists] = useState<ToDoListsType[]>([
    { id: toDoListId1, title: "names", filter: "all" },
    { id: toDoListId2, title: "surnames", filter: "active" },
  ]);

  const [tasks, setTasks] = useState<TasksObjType>({
    [toDoListId1]: [
      { id: v1(), title: "task #1", isDone: false },
      { id: v1(), title: "task #2", isDone: true },
      { id: v1(), title: "task #3", isDone: true },
      { id: v1(), title: "task #4", isDone: false },
      { id: v1(), title: "task #4", isDone: false },
    ],
    [toDoListId2]: [
      { id: v1(), title: "task #1", isDone: false },
      { id: v1(), title: "task #2", isDone: true },
      { id: v1(), title: "task #3", isDone: true },
      { id: v1(), title: "task #4", isDone: false },
      { id: v1(), title: "task #4", isDone: false },
    ],
  });

  const removeTaskHandler = (id: string, toDoListId: string) => {
    let tasksList = tasks[toDoListId];
    let filteredTasks = tasksList.filter((el) => el.id !== id);
    tasks[toDoListId] = filteredTasks;
    setTasks({ ...tasks });
  };

  const changeFilter = (value: filterValuesType, toDoListId: string) => {
    const copyList = [...toDoLists];
    const listToChange = copyList.find((el) => el.id === toDoListId);
    if (listToChange) {
      listToChange.filter = value;
      settoDoLists(copyList);
    }
  };

  const changeStatus = (id: string, toDoListId: string) => {
    let tasksList = tasks[toDoListId];
    const taskToChange = tasksList.find((el) => el.id === id);
    if (taskToChange) {
      taskToChange.isDone = !taskToChange.isDone;
      setTasks({ ...tasks });
    }
  };

  const addTask = (name: string, toDoListId: string) => {
    let task = {
      id: v1(),
      isDone: false,
      title: name,
    };
    let tasksList = tasks[toDoListId];
    let newTasksList = [task, ...tasksList];
    tasks[toDoListId] = newTasksList;
    setTasks({ ...tasks });
  };

  const removeToDoList = (toDoListId: string) => {
    let toDoListsFilteredCopy = [...toDoLists].filter(
      (el) => el.id !== toDoListId
    );
    delete tasks[toDoListId];
    settoDoLists(toDoListsFilteredCopy);
    setTasks({ ...tasks });
  };

  return (
    <div className="App">
      {toDoLists.map((el) => {
        let tasksForToDoList = tasks[el.id];

        switch (el.filter) {
          case "completed":
            tasksForToDoList = tasksForToDoList.filter((el) => el.isDone);
            break;
          case "active":
            tasksForToDoList = tasksForToDoList.filter((el) => !el.isDone);
            break;
        }

        return (
          <TodoList
            toDoListId={el.id}
            key={el.id}
            title={el.title}
            tasksList={tasksForToDoList}
            removeTaskHandler={removeTaskHandler}
            changeFilter={changeFilter}
            addTaskFunc={addTask}
            changeStatus={changeStatus}
            filter={el.filter}
            removeToDoList={removeToDoList}
          />
        );
      })}
    </div>
  );
}

export default App;
