import React from 'react';
import { FaTasks, FaCheckCircle, FaHourglassStart, FaClipboardList, FaExclamationCircle } from 'react-icons/fa';

function Sidebar({ setFilter }) {
  return (
    <div className="sidebar">
      {/* Removed the Upcoming Tasks Button */}
      <button onClick={() => setFilter("ongoing")}>
        <FaClipboardList className="icon" /> Ongoing Tasks
      </button>
      <button onClick={() => setFilter("completed")}>
        <FaCheckCircle className="icon" /> Completed Tasks
      </button>
      <button onClick={() => setFilter("overdue")}>
        <FaExclamationCircle className="icon" /> Overdue Tasks
      </button>
    </div>
  );
}

export default Sidebar;
