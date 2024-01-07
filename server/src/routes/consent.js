const express = require("express");
const router = express.Router();
const Consent = require("../models/Consent");

// Create a new endpoint to handle storing user consent data
router.post("/", async (req, res) => {
  try {
    const { userId, cookiePreferences } = req.body;

    const existingConsent = await Consent.findOne({ userId });

    if (existingConsent) {
      existingConsent.cookiePreferences = cookiePreferences;
      existingConsent.timestamp = Date.now();
      await existingConsent.save();
    } else {
      await Consent.create({
        userId,
        cookiePreferences,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Create an endpoint to retrieve the most recent consent data for a user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const recentConsent = await Consent.findOne({ userId }).sort({
      timestamp: -1,
    });

    if (recentConsent) {
      res.status(200).json({ success: true, consent: recentConsent });
    } else {
      res.status(404).json({ success: false, error: "Consent data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
