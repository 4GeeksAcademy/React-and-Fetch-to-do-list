import React, { useEffect, useState } from "react";

// Create your first component
const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [listOfTasks, setListOfTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const userName = "marioorol";
  const API_URL = "https://playground.4geeks.com/todo/";

  useEffect(() => {
    createUser();
  }, []);

  // Create the new user in the server using a POST method
  const createUser = async () => {
    try {
      const response = await fetch(API_URL + "users/" + userName, {
        method: "POST",
      });

      if (!response.ok && response.status === 400) {
        console.log("User already exists");
        getTodos();
      } else {
        console.log("Adding new user");
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  // Fetch all the todos using the GET method
  const getTodos = async () => {
    try {
      const response = await fetch(API_URL + "users/" + userName, {
        method: "GET",
      });

      if (response.status === 400) {
        createUser();
        return;
      }

      const data = await response.json();
      setListOfTasks(data.todos); // Set the entire list
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch(API_URL + "todos/" + userName, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newTask, done: false }),
      });

      if (response.ok) {
        getTodos(); // Refresh the list
        setNewTask(""); // Clear input
      }
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(API_URL + "todos/" + id, {
        method: "DELETE",
      });
      getTodos();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  // Edit a task - Enter edit mode
  const handleEditTask = (id, label) => {
    setEditingTaskId(id);
    setEditedTask(label);
  };

  // Update task in the API
  const updateTask = async (id) => {
    if (!editedTask.trim()) return;

    try {
      const response = await fetch(API_URL + "todos/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: editedTask, done: false }),
      });

      if (response.ok) {
        setEditingTaskId(null); // Exit edit mode
        getTodos(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // Clear all tasks
  const clearAllTasks = async () => {
    try {
      await fetch(API_URL + "users/" + userName, {
        method: "DELETE",
      });
      setListOfTasks([]); // Clear the local state
    } catch (error) {
      console.error("Error clearing tasks", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary fw-bold">Mario Orol</h1>
      <h2 className="text-center text-secondary">To-Do List</h2>

      <div
        className="card shadow-sm mt-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body">
          {/* Input Box */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            />
            <button className="btn btn-primary" onClick={handleAddTask}>
              Add
            </button>
          </div>

          {/* Task List */}
          <ul className="list-group mt-3">
            {listOfTasks.length === 0 ? (
              <li className="list-group-item text-center text-muted">
                No tasks yet. Add a new one!
              </li>
            ) : (
              listOfTasks.map((t) => (
                <li
                  key={t.id}
                  className="list-group-item d-flex justify-content-between align-items-center shadow-sm"
                >
                  {editingTaskId === t.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && updateTask(t.id)}
                    />
                  ) : (
                    <span className="fw-bold">{t.label}</span>
                  )}

                  <div>
                    {editingTaskId === t.id ? (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateTask(t.id)}
                      >
                        ✅
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditTask(t.id, t.label)}
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      className="btn btn-white btn-sm"
                      onClick={() => deleteTask(t.id)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Clear All Button */}
          {listOfTasks.length > 0 && (
            <>
              <button
                className="btn btn-outline-danger mt-3 w-100"
                onClick={clearAllTasks}
              >
                Clear All Tasks
              </button>
              <p className="text-center mt-2 text-muted">
                {listOfTasks.length}{" "}
                {listOfTasks.length === 1 ? "task" : "tasks"} remaining
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
