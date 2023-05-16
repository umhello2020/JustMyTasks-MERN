import React, { useState, useEffect } from 'react';

const TaskEdit = ({ task, onUpdate }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ title, description });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                type="text"
                placeholder="Title"
            />
            <label htmlFor="description">Description:</label>
            <input
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                type="text"
                placeholder="Description"
            />
            <button type="submit">Update Task</button>
        </form>
    );
}

export default TaskEdit;