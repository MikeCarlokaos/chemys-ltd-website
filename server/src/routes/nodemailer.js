// nodemailerRoutes.js
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

router.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send", (req, res) => {
  const { fname, lname, phone, email, company, organisation, enquiry } =
    req.body;

  // Define recipients based on the selected organisation
  let recipients = [process.env.RECIPIENT_EMAIL_ORDER];

  if (organisation === "Hospital") {
    recipients = [process.env.RECIPIENT_EMAIL_SALES];
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipients.join(","),
    subject: "Enquiry/Request from Website",
    html: `
    <p><strong>Dear Team,</strong></p>
    <p>We have received a new enquiry/request from the website. Please find the details below:</p>

    <table>
      <tr>
        <td><strong>First Name:</strong></td>
        <td>${fname}</td>
      </tr>
      <tr>
        <td><strong>Last Name:</strong></td>
        <td>${lname}</td>
      </tr>
      <tr>
        <td><strong>Phone Number:</strong></td>
        <td>${phone}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td><strong>Company:</strong></td>
        <td>${company}</td>
      </tr>
      <tr>
        <td><strong>Organisation:</strong></td>
        <td>${organisation}</td>
      </tr>
    </table>

    <p><strong>Enquiry:</strong></p>
    <pre>${enquiry}</pre>

    <p>Thank you for your attention. Please take the necessary actions and respond accordingly.</p>

    <p>Best regards,<br>

  `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.json({ status: "fail", error: error.message });
    } else {
      res.json({ status: "success" });
    }
  });
});

module.exports = router;
