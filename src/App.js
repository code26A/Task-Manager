import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Filter tasks based on search query
  const handleSearch = () => {
    const result = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(result); // Set the filtered tasks state
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <h1>Task Manager</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>

      <div className="sidebar-container">
        <Sidebar setFilter={setFilter} />
      </div>
      <div className="dashboard-container">
        <Dashboard tasks={filteredTasks.length > 0 ? filteredTasks : tasks} setTasks={setTasks} filter={filter} />
      </div>
    </div>
  );
}

export default App;
