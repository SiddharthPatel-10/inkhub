const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', user: req.user });
});

router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('success', { title: 'Success', user: req.user });
  } catch (error) {
    console.error(error);
    res.render('error', { title: 'Error', user: req.user });
  }
});

module.exports = router;
