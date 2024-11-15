import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Sidebar from './Sidebar';

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'High',
  });
  const [filter, setFilter] = useState('all');

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks
    .filter(task => {
      if (filter === "ongoing") return !task.completed && !isOverdue(task);
      if (filter === "completed") return task.completed;
      if (filter === "overdue") return !task.completed && isOverdue(task);
      return true;
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  function isOverdue(task) {
    const today = new Date();
    return new Date(task.dueDate) < today && !task.completed;
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleTaskCompletion(id) {
    setTasks(tasks.map(task => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  }

  function openEditModal(task) {
    setCurrentTask(task);
    setEditModalOpen(true);
  }

  function updateTask(updatedTask) {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditModalOpen(false);
  }

  const handleAddTask = () => {
    setAddModalOpen(true);
  };

  const handleSubmitAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      const taskId = Date.now();
      setTasks([...tasks, { ...newTask, id: taskId, completed: false }]);
      setAddModalOpen(false);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'High' });
    } else {
      alert("Please fill in the title and due date");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setFilter={setFilter} />

      <div className="tasks-container">
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
                <p>Priority: {task.priority}</p>
              </div>

              <div className="task-actions">
                <button onClick={() => toggleTaskCompletion(task.id)} className="complete-btn">
                  {task.completed ? <FaCheckCircle color="green" /> : <FaCheckCircle color="gray" />}
                  {task.completed ? " Completed" : " Mark as Complete"}
                </button>
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
              <select
                name="priority"
                id="priority"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <div className="form-buttons">
                <button onClick={handleSubmitAddTask}>Add Task</button>
                <button onClick={() => setAddModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Add Task Button */}
        <button className="add-task" onClick={handleAddTask}>
          <FaPlus size={40} color="#fff" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
