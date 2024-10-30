// models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
studentName: { type: String, required: true },
email: { type: String, required: true },
positionId: { type: String, required: true }, // ID of the job or topic
positionType: { type: String, required: true }, // Either "job" or "topic"
message: { type: String, required: true },
dateSubmitted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);