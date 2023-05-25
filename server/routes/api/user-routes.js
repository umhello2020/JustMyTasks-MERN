const express = require('express');
const { User } = require('../../models');

const router = express.Router();

// Route handler for creating a user
router.post('/', async (req, res) => {
  try {
    // Extract the user data from the request body
    const { username, email, password } = req.body;
    console.log('Received user data:', { username, email, password });

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Server error', error: error.message }); // Provide error message in the response
  }
});

module.exports = router;
