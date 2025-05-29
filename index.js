require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    await sendEmail(name, email, message);
    res.json({ message: 'Message received, thank you!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email. Try again later.' });
  }
});

// Sends the email using Gmail and App Password
async function sendEmail(name, email, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // e.g., yourgmail@gmail.com
      pass: process.env.EMAIL_PASS, // App Password from Google
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Contact Form from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  await transporter.sendMail(mailOptions);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
