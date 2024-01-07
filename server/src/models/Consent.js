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

const Consent = mongoose.model("Consent", ConsentSchema);

module.exports = Consent;
