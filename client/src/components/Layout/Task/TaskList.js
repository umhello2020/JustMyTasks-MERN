import React, { useEffect, useState } from 'react';
import Task from './Task';
import api from '../../../utils/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the server
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
