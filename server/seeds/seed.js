const db = require('../config/connection');
const { User, Task } = require('../models');
const userData = require('./userData.json');
const taskData = require('./taskData.json');

db.once('open', async () => {
  try {
    await Task.deleteMany({});
    await User.deleteMany({});

    const users = await User.create(userData);

    for (let i = 0; i < taskData.length; i++) {
      const { _id } = await Task.create(taskData[i]);
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const user = users[randomUserIndex];

      user.tasks.push(_id);
      await user.save();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seed data inserted successfully!');
  process.exit(0);
});
