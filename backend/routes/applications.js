// routes/applications.js
const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Application = require('../models/Application');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// POST /api/applications - Submit an application
router.post('/', auth, upload.fields([{ name: 'video' }, { name: 'cv' }]), async (req, res) => {
try {
const { studentName, email, message, disability } = req.body;

// Create a new Application instance
const application = new Application({
    studentName,
    email,
    message,
    disability: disability === 'true', // Convert string to boolean
    video: req.files.video ? req.files.video[0].buffer : null,
    cv: req.files.cv[0].buffer,
    dateSubmitted: new Date(),
});

// Save application to the database
const newApplication = await application.save();
res.status(201).json(newApplication);
} catch (error) {
console.error('Error saving application:', error);
res.status(500).json({ message: 'Error submitting application. Please try again.' });
}
});

module.exports = router;