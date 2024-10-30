// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs consistently
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
const { name, email, password, role } = req.body;
console.log('Received signup data:', req.body);

try {
const existingUser = await User.findOne({ email });
if (existingUser) {
    console.log('User already exists with this email:', email);
    return res.status(400).json({ message: 'User already exists' });
}

const hashedPassword = await bcrypt.hash(password, 10);
console.log('Hashed password generated:', hashedPassword);

const newUser = new User({ name, email, password: hashedPassword, role });
await newUser.save();
console.log('User created successfully:', newUser);

res.status(201).json({ message: 'User created successfully' });
} catch (error) {
console.error('Error creating user:', error);
res.status(500).json({ message: 'Error creating user' });
}
});

// Login route
router.post('/login', async (req, res) => {
const { email, password, role } = req.body;
console.log('Received login data:', { email, password, role });

try {
const user = await User.findOne({ email, role });
if (!user) {
    console.log(`User not found with email ${email} and role ${role}`);
    return res.status(400).json({ message: 'User not found' });
}

console.log('User found for login:', user);
console.log('Stored hashed password in DB:', user.password);
console.log('Password entered by user:', password);

// Perform bcrypt comparison
const isMatch = await bcrypt.compare(password, user.password);
console.log('Password comparison result:', isMatch);

if (!isMatch) {
    console.log(`Invalid credentials for user with email: ${email}`);
    return res.status(400).json({ message: 'Invalid credentials' });
}

const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
);

console.log('JWT generated successfully:', token);
res.json({ token });
} catch (error) {
console.error('Error logging in user:', error);
res.status(500).json({ message: 'Error logging in' });
}
});

module.exports = router;