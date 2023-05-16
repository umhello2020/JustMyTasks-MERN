import React from 'react';
import Task from './Task';

const TaskList = ({ tasks }) => (
    <div>
        {tasks.map(task => (
            <Task key={task._id} task={task} />
        ))}
    </div>
);

export default TaskList;