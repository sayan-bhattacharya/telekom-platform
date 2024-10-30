// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const topicRoutes = require('./routes/topics');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

// MongoDB connection
const connectDB = async () => {
try {
const connection = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false,
});
console.log('Connected to MongoDB Atlas on database:', connection.connection.name);
} catch (err) {
console.error('MongoDB connection error:', err);
process.exit(1);
}
};

// Insert Sample Data for Testing
const insertSampleData = async () => {
const User = require('./models/User');

try {
// Clear existing data in User collection (only for controlled testing)
await User.deleteMany({});

// Sample data
const students = [
    { name: 'Alice', email: 'alice@student.com', password: await bcrypt.hash('password', 10), role: 'student' },
    { name: 'Bob', email: 'bob@student.com', password: await bcrypt.hash('password', 10), role: 'student' },
];

const recruiters = [
    { name: 'Charlie', email: 'charlie@recruiter.com', password: await bcrypt.hash('password', 10), role: 'recruiter' },
];

// Insert sample students and recruiters
await User.insertMany([...students, ...recruiters]);
console.log('Sample users added successfully');
} catch (error) {
console.error('Error inserting sample data:', error);
}
};

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes); // Ensure middleware (like auth) is in applicationRoutes

// Start Server and Initialize Sample Data
const startServer = async () => {
try {
await connectDB();
await insertSampleData(); // Insert sample data for testing

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
console.error('Server startup error:', error);
process.exit(1);
}
};

startServer();