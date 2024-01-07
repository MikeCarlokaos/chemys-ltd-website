// models/Consent.js

const mongoose = require("mongoose");

const ConsentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cookiePreferences: {
    necessary: Boolean,
    analytics: Boolean,
    marketing: Boolean,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Use the second database connection for this model
const Consent = secondDatabaseConnection.model("Consent", ConsentSchema);

module.exports = Consent;
