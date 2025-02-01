import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ listOfTasks, deleteTask }) => {
  return (
    <div>
      <ul className="list-group mt-3">
        {listOfTasks.length === 0 ? (
          <p className="mt-3">No tasks, add a task</p>
        ) : (
          listOfTasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              deleteTask={deleteTask}
            />
          ))
        )}
      </ul>
      {/* Items Left Counter */}
      {listOfTasks.length > 0 && (
        <p className="mt-3">
          {listOfTasks.length} item{listOfTasks.length !== 1 ? "s" : ""} left
        </p>
      )}
    </div>
  );
};

export default TaskList;
