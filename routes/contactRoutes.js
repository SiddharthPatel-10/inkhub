const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", user: req.user });
});

// Contact form submission route
router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Save the contact message to the database
  const newContact = new Contact({ name, email, message });

  try {
    await newContact.save();

    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: "Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.render("success", { title: "Success", user: req.user });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.render("error", { title: "Error", user: req.user });
  }
});

module.exports = router;
