// TaskList.js
import React from 'react';
import { FaCheckCircle, FaUndo } from 'react-icons/fa';

function TaskList({ tasks, setTasks }) {
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => toggleComplete(task.id)}>
            {task.completed ? <FaUndo /> : <FaCheckCircle />}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
