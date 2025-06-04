import "./App.css";
import { useState } from "react";
import ToDolist from "./components/ToDoList";
import { v4 as uuidv4 } from "uuid";
import { TasksContext } from "./contexts/tasksContext";
//test

const initialtasks = [
  {
    id: uuidv4(),
    title: "تصميم واجهات المشروع",
    description: "انهاء الواجهات مع كتابة الاكواد",
    iscomplete: false,
  },
  {
    id: uuidv4(),
    title: "تصميم واجهات المشروع",
    description: "انهاء الواجهات مع كتابة الاكواد",
    iscomplete: false,
  },
  {
    id: uuidv4(),
    title: "تصميم واجهات المشروع",
    description: "انهاء الواجهات مع كتابة الاكواد",
    iscomplete: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(initialtasks);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        height: "100vh",
        direction: "rtl",
      }}
    >
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <ToDolist />
      </TasksContext.Provider>
    </div>
  );
}

export default App;
