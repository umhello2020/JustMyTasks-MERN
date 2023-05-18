// import user model
const User = require('../models/User');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    try {
      const user = await User.create(body);

      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  },

  async updateUser({ body }, res) {
    const { username, email, password } = body;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { email, password },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Can't find this user" });
      }

      const token = signToken(updatedUser);
      res.json({ token, user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating user' });
    }
  },

  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    try {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
    }
  },
};
