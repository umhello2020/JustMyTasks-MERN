import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const apiEndpoints = {
    createUser: (userData) => {
        return api.post('/users', userData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    },

  getTasks: () => {
    return api.get('/tasks')
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  },

  createTask: (taskData) => {
    return api.post('/tasks', taskData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  },

    updateTask: (taskId, taskData) => {
        return api.put(`/tasks/${taskId}`, taskData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }


};

export default apiEndpoints;
