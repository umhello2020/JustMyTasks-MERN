const express = require('express');
const userRoutes = require('./api/user-routes');

const router = express.Router();

router.use('/api/users', userRoutes);

module.exports = router;
