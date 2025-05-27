import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      await axios.post('http://localhost:5000/api/tasks', newTask);
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className="container">
      <h1>Task Management Dashboard</h1>
      <p>Welcome! Start adding and managing your tasks here.</p>
      <TaskForm onAddTask={handleAddTask} />
      <h2>Your Tasks:</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <TaskList tasks={tasks} onTasksUpdated={fetchTasks} />
      )}
    </div>
  );
}

export default Home;
