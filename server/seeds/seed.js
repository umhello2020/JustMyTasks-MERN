const db = require('../config/connection');
const { User, Task } = require('../models');
const userData = require('./userData.json');
const taskData = require('./taskData.json');
const mongoose = require('mongoose');

db.once('open', async () => {
  try {
    await Task.deleteMany({});
    await User.deleteMany({});

    const users = await User.create(userData);

    for (let i = 0; i < taskData.length; i++) {
      const { taskId, title, description, completed, user } = taskData[i];
      const createdTask = await Task.create({
        taskId,
        title,
        description,
        completed,
        user: mongoose.Types.ObjectId(user), // Cast user to ObjectId
      });

      const foundUser = await User.findOne({ username: user });
      if (foundUser) {
        foundUser.tasks.push(createdTask._id);
        await foundUser.save();
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seed data inserted successfully!');
  process.exit(0);
});
