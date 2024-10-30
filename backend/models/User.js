// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, unique: true, required: true },
password: { type: String, required: true },
role: { type: String, required: true, default: 'student' } // Ensure 'role' field is set as required and has a default
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});
// Method to validate password
UserSchema.methods.isValidPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT
UserSchema.methods.generateAuthToken = function () {
return jwt.sign(
{ id: this._id, name: this.name, email: this.email, role: this.role },
process.env.JWT_SECRET,
{ expiresIn: '1h' }
);
};

module.exports = mongoose.model('User', UserSchema);