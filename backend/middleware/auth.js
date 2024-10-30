// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
const { email, password, role } = req.body;
console.log('Received login data:', req.body);

try {
  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found:', email);
    return res.status(400).json({ message: 'User not found' });
  }

  if (user.role !== role) {
    console.log(`Role mismatch: expected ${user.role} but received ${role}`);
    return res.status(400).json({ message: 'Invalid role' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Invalid credentials for:', email);
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
} catch (error) {
  console.error('Error logging in user:', error);
  res.status(500).json({ message: 'Error logging in' });
}
});

module.exports = router;