import "./App.css";
import { TodoList } from "./TodoList";
import { ToDoListPRops } from "./TodoList";

const props1: ToDoListPRops = {
  title: "What to learn",
  tasksList: [
    { id: 1, title: "task #1", isDone: false },
    { id: 2, title: "task #2", isDone: false },
    { id: 3, title: "task #3", isDone: false },
  ],
};
const props2 = {
  title: "What to learn",
  tasksList: [
    { id: 1, title: "task #1", isDone: false },
    { id: 12, title: "task #12", isDone: true },
    { id: 23, title: "task #23", isDone: false },
  ],
};
const props3 = {
  title: "What to learn",
  tasksList: [
    { id: 31, title: "task #31", isDone: true },
    { id: 42, title: "task #42", isDone: false },
    { id: 53, title: "task #53", isDone: false },
  ],
};
function App() {
  return (
    <div className="App">
      <TodoList title={props1.title} tasksList={props1.tasksList} />
      <TodoList title={props2.title} tasksList={props2.tasksList} />
      <TodoList title={props3.title} tasksList={props3.tasksList} />
    </div>
  );
}

export default App;
