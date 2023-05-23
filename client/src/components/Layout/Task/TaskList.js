import React, { useEffect, useState } from 'react';
import Task from './Task';
import styles from './TaskList.module.css';
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
    <div className={styles.taskList}>
      {tasks.length ? (
        <ul className={styles.list}>
          {tasks.map(task => (
            <Task key={task._id} task={task} />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;

