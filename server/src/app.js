// chemys-limited/server/src/app.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailerRoutes = require("./routes/nodemailer");
const shortageRoutes = require("./routes/shortages");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "https://chemyslimiteddemo.onrender.com",
  // origin: "http://localhost:5173",
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

//  routes
app.use("/nodemailer", nodemailerRoutes);
app.use("/api/auth/shortages", shortageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
