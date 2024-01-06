const mongoose = require("mongoose");

const cookieConsentSchema = new mongoose.Schema({
  userIdentifier: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: ["accept", "reject"],
    required: true,
  },
  enabledCookies: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const CookieConsent = mongoose.model("CookieConsent", cookieConsentSchema);

module.exports = CookieConsent;
