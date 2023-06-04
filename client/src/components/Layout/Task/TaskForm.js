import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../../../utils/mutations';
import { GET_ME, GET_TASKS } from '../../../utils/queries';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const [formState, setFormState] = useState({ title: '', description: '' });
  const [createTask, { error }] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      try {
        const { me } = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...me, tasks: [...me.tasks, createTask] } },
        });
      } catch (e) {
        console.error(e);
      }
      try {
        const { tasks } = cache.readQuery({ query: GET_TASKS });
        cache.writeQuery({
          query: GET_TASKS,
          data: { tasks: [...tasks, createTask] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createTask({
        variables: { ...formState },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });

      setFormState({ title: '', description: '' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.taskForm}>
      <h3>Add Task</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.formInput}
          placeholder="Title"
          name="title"
          type="text"
          value={formState.title}
          onChange={handleChange}
        />
        <textarea
          className={styles.formTextarea}
          placeholder="Description"
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div>Task creation failed</div>}
    </div>
  );
};

export default TaskForm;

