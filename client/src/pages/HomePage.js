import React from 'react';
import TaskList from '../components/Layout/Task/TaskList';
import Auth from '../utils/auth';
import styles from './Homepage.module.css';

const HomePage = () => {
  if (!Auth.loggedIn()) {
    return (
      <div className={styles.container}>
        <h2 className={styles.message}>
          You need to be logged in to see this page. Use the navigation links above to sign up or log in!
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Here are your tasks!</h1>
      <h2 className={styles.subtitle}>Your Tasks</h2>
      <TaskList />
    </div>
  );
};

export default HomePage;

