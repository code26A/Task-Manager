import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // All tasks
  const [filter, setFilter] = useState('upcoming'); // Filter for task categories
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // Filter tasks based on search query and selected filter
  const filteredTasks = tasks
    .filter(task => {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter(task => {
      // Filter based on task categories (e.g., upcoming, completed, overdue)
      if (filter === "upcoming") return !task.completed && !isOverdue(task);
      if (filter === "completed") return task.completed;
      if (filter === "overdue") return !task.completed && isOverdue(task);
      return true; // Show all tasks by default
    });

  // Function to check if task is overdue
  function isOverdue(task) {
    const today = new Date();
    return new Date(task.dueDate) < today && !task.completed;
  }

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <div className='header-heading'>
        <h3>Task Manager</h3>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div >
        {/* Sidebar */}
        

        {/* Dashboard */}
        <div className="dashboard-container">
          <Dashboard tasks={filteredTasks.length > 0 ? filteredTasks : tasks} setTasks={setTasks} filter={filter} searchQuery={searchQuery}/>
        </div>
      </div>
    </div>
  );
}

export default App;
