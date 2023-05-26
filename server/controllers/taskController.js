const Task = require('../models/Task');

module.exports = {
  async createTask({ body }, res) {
    try {
      const task = await Task.create(body);

      if (!task) {
        return res.status(400).json({ message: 'Something went wrong!' });
      }

      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating task' });
    }
  },

  async updateTask({ params, body }, res) {
    try {
      const updatedTask = await Task.findByIdAndUpdate({ _id: params._id }, body, { new: true });

      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(updatedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating task' });
    }
  },

  async deleteTask({ params }, res) {
    try {
      const deletedTask = await Task.findByIdAndDelete({ _id: params._id });

      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(deletedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting task' });
    }
  },
};
