// models/Shortage.js

const mongoose = require("mongoose");

const shortageSchema = new mongoose.Schema({
  name: String,
  alternatives: String,
  form: String,
  packSize: String,
});

// Use the first database connection for this model
const Shortage = firstDatabaseConnection.model("Shortage", shortageSchema);

module.exports = Shortage;
