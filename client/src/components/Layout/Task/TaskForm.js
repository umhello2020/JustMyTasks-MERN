import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TASK } from '../../../utils/mutations';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const [formState, setFormState] = useState({ title: '', description: '' });
  const [createTask, { error }] = useMutation(CREATE_TASK);

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


