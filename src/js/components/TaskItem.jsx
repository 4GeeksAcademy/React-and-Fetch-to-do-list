import React from "react";

const TaskItem = ({ task, index, deleteTask }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center task-item">
      {task}
      <button
        className="btn btn-danger btn-sm delete-btn"
        onClick={() => deleteTask(index)}
      >
        X
      </button>
    </li>
  );
};

export default TaskItem;
