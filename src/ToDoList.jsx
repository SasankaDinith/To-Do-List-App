import React, { useState } from "react";
import "./App.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function AddTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, completed: null }]); 
      setNewTask("");
    } else {
      alert("Please enter the task");
    }
  }

  function HandleInputChange(event) {
    setNewTask(event.target.value);
  }

  function ToggleTask(index) {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index
          ? { ...task, completed: task.completed === null ? true : !task.completed }
          : task
      )
    );
  }

  function TasksUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function TasksDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function DeleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  return (
    <div className="main">
      <div>
        <h1>To Do List</h1>
        <input type="text" value={newTask} onChange={HandleInputChange} />
        <button onClick={AddTask}>Add Task</button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              className={`text ${task.completed === true ? "completed" : ""}`}
              onClick={() => ToggleTask(index)}
            >
              {task.text} {task.completed !== null && ` : ${task.completed ? " Completed" : " Not Completed"}`}
            </span>
            <button className="delete-button" onClick={() => DeleteTask(index)}>
              Delete
            </button>
            <button className="move-button" onClick={() => TasksUp(index)}>
              Up
            </button>
            <button className="move-button" onClick={() => TasksDown(index)}>
              Down
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
