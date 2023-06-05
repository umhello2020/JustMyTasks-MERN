const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = (req, res, next) => {
  console.log('Hello')
  let token = req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    return res.status(400).json({ message: 'You have no token!' });
  }

  console.log('Token:', token); // Log the token value

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch (err) {
    console.log('Invalid token:', err.message);
    return res.status(400).json({ message: 'Invalid token!' });
  }

  next();
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const login = async (credentials) => {
  console.log('logged in')
  const { username, password } = credentials;
  console.log('Searching for user:', username);
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await user.isCorrectPassword(password);

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = signToken({ username, email: user.email, _id: user._id });
  return token;
};

module.exports = { authMiddleware, signToken, login };
