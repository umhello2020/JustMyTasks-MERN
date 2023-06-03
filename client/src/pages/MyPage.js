import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TASKS, CREATE_TASK } from '../utils/queries';
import TaskList from '../components/Layout/Task/TaskList';
import TaskForm from '../components/Layout/Task/TaskForm';
import styles from './MyPage.module.css';

function MyPage() {
  const [tasks, setTasks] = useState([]);
  const [createTask, { error }] = useMutation(CREATE_TASK);

  const { loading, data } = useQuery(GET_TASKS);
  const userData = data?.me || {};

  useEffect(() => {
    if (userData.tasks) {
      setTasks(userData.tasks);
    }
  }, [userData.tasks]);

  const handleTaskCreate = async (taskData) => {
    try {
      const { data } = await createTask({
        variables: { ...taskData },
      });

      setTasks((prevTasks) => [...prevTasks, data.createTask]);
    } catch (error) {
      console.error('Error creating task:', error);

      // Handle the error here
      if (error.message === 'You have no token!') {
        // Display a custom error message or perform an action
        console.log('Please log in to create a task.');
        // You can also redirect the user to the login page
        // window.location.href = '/login';
      } else {
        // Display a generic error message
        console.log('An error occurred while creating the task.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>An error occurred.</p>;
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





