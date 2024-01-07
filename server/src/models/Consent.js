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
    expires: "2m", // Set the TTL (Time-To-Live) for 2 months
  },
});

const Consent = mongoose.model("Consent", ConsentSchema);

module.exports = Consent;
