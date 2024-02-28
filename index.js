import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Handle form submissions
app.post("/api/contact", (req, res) => {
  // Extract form data from the request body
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sealvenki@gmail.com",
      pass: "hpuv xape ilsd bwgr",
    },
  });

  const mailOptions = {
    // from: "sealvenki@gmail.com",
    to: "sealvenki@gmail.com",
    subject: `New Contact Form Submission - ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to send email." });
    } else {
      console.log("Email sent:", info.response);
      res.json({ success: true, message: "Message received successfully!" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
