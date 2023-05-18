import React from 'react';
import TaskList from '../components/Layout/Task/TaskList';
import Auth from '../utils/auth';

const HomePage = () => {
    if (!Auth.loggedIn()) {
        return (
           <h2>
                You need to be logged in to see this page. Use the navigation links above to sign up or log in!
              </h2>
        );
    }

    return (
        <div className="homepage">
            <h1>Here are your tasks!</h1>
            <h2>Your Tasks</h2>
            <TaskList />
        </div>
    );
};

export default HomePage;
