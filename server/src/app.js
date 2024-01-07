const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailerRoutes = require("./routes/nodemailer");
const shortageRoutes = require("./routes/shortages");
const consentRoutes = require("./routes/consent"); // Import the new file

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "POST",
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://kaosvioge:formentera1@chemys-admin-database.fz7jxky.mongodb.net/chemys-ltd?retryWrites=true&w=majority",
  {
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  }
);

app.use("/nodemailer", nodemailerRoutes);
app.use("/api/auth/shortages", shortageRoutes);
app.use("/api/consent", consentRoutes); // Use the new consent routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
