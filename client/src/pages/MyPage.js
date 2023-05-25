import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_TASKS } from '../utils/queries';
import TaskList from '../components/Layout/Task/TaskList';
import TaskForm from '../components/Layout/Task/TaskForm';
import styles from './MyPage.module.css';

function MyPage() {
  const [tasks, setTasks] = useState([]);

  const { loading, data } = useQuery(GET_TASKS);
  const userData = data?.me || {};

  useEffect(() => {
    if (userData.tasks) {
      setTasks(userData.tasks);
    }
  }, [userData.tasks]);

  const handleTaskCreate = (taskData) => {
    // Handle task creation logic
    // Update tasks state after task creation
    const createdTask = { id: 'new-task-id', ...taskData };
    setTasks((prevTasks) => [...prevTasks, createdTask]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.myPage}>
      <h1 className={styles.myPageHeader}>Here are your tasks!</h1>
      <h2>Your Tasks</h2>
      <TaskList tasks={tasks} />
      <div className={styles.taskForm}>
        <TaskForm onTaskCreate={handleTaskCreate} />
      </div>
    </div>
  );
}

export default MyPage;



