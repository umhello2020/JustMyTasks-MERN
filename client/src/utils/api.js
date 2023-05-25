import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

const apiEndpoints = {
  createUser: (userData) => {
    return api.post('/users', userData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating user:', error);
        throw error;
      });
  },

  loginUser: (userData) => {
    return api.post('/users/login', userData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error logging in:', error);
        throw error;
      });
  },

  getTasks: () => {
    return api.get('/tasks')
      .then(response => response.data)
      .catch(error => {
        console.error('Error getting tasks:', error);
        throw error;
      });
  },

  createTask: (taskData) => {
    return api.post('/tasks', taskData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating task:', error);
        throw error;
      });
  },

  updateTask: (taskId, taskData) => {
    return api.put(`/tasks/${taskId}`, taskData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating task:', error);
        throw error;
      });
  },
};

export default apiEndpoints;


