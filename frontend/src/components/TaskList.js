import React from 'react';

const TaskList = ({ tasks, onTasksUpdated }) => {
  // Toggle completion status
  const toggleComplete = async (task) => {
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    onTasksUpdated();
  };

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE'
    });
    onTasksUpdated();
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id} className={task.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            className="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task)}
          />
          <div className="task-details">
            <span className="task-title">{task.title}</span>
            <div className="task-meta">
              {task.description && ` ${task.description} `}
              {task.priority && <> | <em>Priority:</em> {task.priority}</>}
              {task.dueDate && <> | <em>Due:</em> {new Date(task.dueDate).toLocaleDateString()}</>}
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
