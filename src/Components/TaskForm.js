// TaskForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';

// Ensure modal root is set if using `react-modal`
Modal.setAppElement('#root');

function TaskForm({ closeModal, setTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="task-modal"
      overlayClassName="task-modal-overlay"
    >
      <h3>Add New Task</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <div className="form-buttons">
        <button onClick={addTask}>Add Task</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
}

export default TaskForm;
