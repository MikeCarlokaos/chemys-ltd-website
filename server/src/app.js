const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailerRoutes = require("./routes/nodemailer");
const shortageRoutes = require("./routes/shortages");
const consentRoutes = require("./routes/consent");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.ORIGIN,
  methods: "POST",
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  socketTimeoutMS: 30000,
  connectTimeoutMS: 30000,
});

app.use("/nodemailer", nodemailerRoutes);
app.use("/api/auth/shortages", shortageRoutes);
app.use("/api/consent", consentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
