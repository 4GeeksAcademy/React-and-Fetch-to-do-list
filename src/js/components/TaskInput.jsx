import React from "react";

const TaskInput = ({ task, setTask, addTask }) => {
  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTask();
          }
        }}
      />
      <button className="btn btn-success mt-3" onClick={addTask}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
