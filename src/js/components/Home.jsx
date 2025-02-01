import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const API_URL = "https://playground.4geeks.com/todo/todos/marioorol"; // Replace with your username

const Home = () => {
  const [task, setTask] = useState("");
  const [listOfTasks, setListOfTasks] = useState([]);
  const [userCreated, setUserCreated] = useState(false); // Track user creation

  // Function to create the user if they don't exist
  const createUser = () => {
    const todo = []; // Create an empty task list

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("User created successfully!");
          setUserCreated(true); // Mark the user as created
        } else {
          console.error("Failed to create user");
        }
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  // Function to fetch tasks from backend
  const fetchTasks = () => {
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User not found, creating user...");
        }
      })
      .then((data) => {
        setListOfTasks(data); // Store tasks in state
      })
      .catch((error) => {
        console.error(error.message);
        if (!userCreated) createUser(); // Only create user if not already created
      });
  };

  // Fetch tasks on first load
  useEffect(() => {
    fetchTasks();
  }, [userCreated]); // Re-fetch tasks only if user is newly created

  // Function to add a task
  const addTask = () => {
    if (task.trim() !== "") {
      const updatedTasks = [...listOfTasks, { label: task, done: false }];

      fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify(updatedTasks),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            setListOfTasks(updatedTasks);
            setTask("");
          } else {
            console.error("Failed to update tasks");
          }
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = listOfTasks.filter((_, i) => i !== index);

    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(updatedTasks),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setListOfTasks(updatedTasks);
        } else {
          console.error("Failed to delete task");
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Function to clear all tasks
  const clearAllTasks = () => {
    fetch(API_URL, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setListOfTasks([]);
        } else {
          console.error("Failed to clear tasks");
        }
      })
      .catch((error) => console.error("Error clearing tasks:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <TaskInput task={task} setTask={setTask} addTask={addTask} />
          <TaskList listOfTasks={listOfTasks} deleteTask={deleteTask} />
          <button className="btn btn-warning mt-3" onClick={clearAllTasks}>
            Clear All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
