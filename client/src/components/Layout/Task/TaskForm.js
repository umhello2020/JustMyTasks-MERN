import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TASK } from '../../graphql/mutations';

const TaskForm = () => {
    const [formState, setFormState] = useState({ title: '', description: '' });
    const [addTask, { error }] = useMutation(ADD_TASK);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addTask({
                variables: { ...formState }
            });

            setFormState({
                title: '',
                description: ''
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h3>Add Task</h3>
            <form onSubmit={handleFormSubmit}>
                <input
                    className="form-input"
                    placeholder="Title"
                    name="title"
                    type="text"
                    value={formState.title}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="Description"
                    name="description"
                    type="text"
                    value={formState.description}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            {error && <div>Sign up failed</div>}
        </div>
    );
};

export default TaskForm;