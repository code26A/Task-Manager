import React, { useState } from 'react';
import { FaCheckCircle, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function Dashboard({ tasks, setTasks, filter }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State for the Add Task Modal
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  }); // State for the new task

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "ongoing") return !task.completed && !isOverdue(task);
    if (filter === "completed") return task.completed;
    if (filter === "overdue") return !task.completed && isOverdue(task);
    return true;
  });

  // Check if task is overdue
  function isOverdue(task) {
    const today = new Date();
    return new Date(task.dueDate) < today && !task.completed;
  }

  // Delete a task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Open edit modal with the selected task
  function openEditModal(task) {
    setCurrentTask(task);
    setEditModalOpen(true);
  }

  // Update task details after editing
  function updateTask(updatedTask) {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditModalOpen(false);
  }

  // Handle Add Task Button click
  const handleAddTask = () => {
    setAddModalOpen(true); // Open Add Task Modal
  };

  // Handle form submit for adding a new task
  const handleSubmitAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      const taskId = Date.now(); // Unique task ID using current timestamp
      setTasks([...tasks, { ...newTask, id: taskId, completed: false }]);
      setAddModalOpen(false); // Close modal after adding the task
      setNewTask({ title: '', description: '', dueDate: '' }); // Reset form state
    } else {
      alert("Please fill in the title and due date");
    }
  };

  return (
    <div>
      <ul className="task-list">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue(task) ? 'overdue' : ''}`}
          >
            <div className="task-details">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due: {task.dueDate}</p>
            </div>
            
            {/* Show green tick for completed tasks */}
            {task.completed && <FaCheckCircle className="green-tick" />}

            <div className="task-actions">
              <button onClick={() => openEditModal(task)} className="edit-btn">
                <FaEdit /> Edit
              </button>
              <button onClick={() => deleteTask(task.id)} className="delete-btn">
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <div className="task-modal-overlay">
          <div className="task-modal">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              placeholder="Task Title"
            />
            <textarea
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              placeholder="Task Description"
            />
            <input
              type="date"
              value={currentTask.dueDate}
              onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
            />
            <div className="form-buttons">
              <button onClick={() => updateTask(currentTask)}>Save</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="task-modal-overlay">
          <div className="task-modal">
            <h3>Add New Task</h3>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task Title"
            />
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Task Description"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <div className="form-buttons">
              <button onClick={handleSubmitAddTask}>Add Task</button>
              <button onClick={() => setAddModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Button */}
      <button className="add-task" onClick={handleAddTask}>
        <FaPlus size={24} color="#fff" />
      </button>
    </div>
  );
}

export default Dashboard;
