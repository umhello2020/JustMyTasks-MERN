const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token:', err.message);
      return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  login: function (credentials) {
    // Assuming you have a User model/schema
    const { username, password } = credentials;

    // Check if the username and password match a user in the database
    // You'll need to implement your own logic for this
    const user = User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password is valid
    const isValidPassword = user.comparePassword(password);

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Generate and return a token
    const token = this.signToken({ username, email: user.email, _id: user._id });
    return token;
  },
};
