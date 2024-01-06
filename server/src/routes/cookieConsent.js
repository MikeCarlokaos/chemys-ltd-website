// routes/cookieConsent.js

const express = require("express");
const CookieConsent = require("../models/CookieConsent");

const router = express.Router();

// Endpoint for handling cookie consent data
router.post("/", async (req, res) => {
  console.log("Received POST request at /");
  try {
    const { userIdentifier, action, enabledCookies } = req.body;

    // Set timestamp based on user's consent action
    const timestamp = action === "accept" ? new Date() : null;

    // Try to find an existing record for the user
    const existingRecord = await CookieConsent.findOne({ userIdentifier });

    if (existingRecord) {
      // Update the existing record
      await CookieConsent.findOneAndUpdate(
        { userIdentifier },
        { action, enabledCookies, timestamp },
        { new: true } // Return the updated record
      );
    } else {
      // Create a new record if no existing record found
      const cookieConsent = new CookieConsent({
        userIdentifier,
        action,
        enabledCookies,
        timestamp,
      });
      await cookieConsent.save();
    }

    // Respond with a success message or any other relevant information
    res
      .status(200)
      .json({ message: "Cookie consent data received successfully." });
  } catch (error) {
    console.error("Error handling cookie consent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
