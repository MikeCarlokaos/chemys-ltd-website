// app.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailerRoutes = require("./routes/nodemailer");
const shortageRoutes = require("./routes/shortages");
const consentRoutes = require("./routes/consent");
const Shortage = require("./models/Shortage");
const Consent = require("./models/Consent");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Database Connections
const firstDatabaseConnection = mongoose.createConnection(
  "mongodb+srv://websitechemys:shortage@inventory.ien5ju3.mongodb.net/chemys-inventory?retryWrites=true&w=majority",
  {
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  }
);

const secondDatabaseConnection = mongoose.createConnection(
  "mongodb+srv://cookiewebsitechemys:shortage@cluster0.bbqkdaw.mongodb.net/cookieconsent?retryWrites=true&w=majority",
  {
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  }
);

// CORS Configuration
const corsOptions = {
  origin: "https://chemyslimiteddemo.onrender.com",
  methods: "POST",
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/nodemailer", nodemailerRoutes);
app.use(
  "/api/auth/shortages",
  shortageRoutes(firstDatabaseConnection, Shortage)
);
app.use("/api/consent", consentRoutes(secondDatabaseConnection, Consent));

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
