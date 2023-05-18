import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_TASKS } from '../graphql/queries';
import TaskList from '../components/Layout/Task/TaskList';
import TaskForm from '../components/Layout/Task/TaskForm';

function MyPage() {
  const [tasks, setTasks] = useState([]);

  const { loading, data } = useQuery(GET_TASKS);
  const userData = data?.me || {};

  useEffect(() => {
    if (userData.tasks) {
      setTasks(userData.tasks);
    }
  }, [userData.tasks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage">
      <h1>Here are your tasks!</h1>
      <h2>Your Tasks</h2>
      <TaskList tasks={tasks} />
      <TaskForm />
    </div>
  );
}

export default MyPage;
