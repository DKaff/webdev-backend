const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // optional, for sending emails

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  console.log('Received contact form:', { name, email, message });

  // Optionally send an email here using nodemailer
  // await sendEmail(name, email, message);

  res.json({ message: 'Message received, thank you!' });
});

/*
// Optional: Setup nodemailer (e.g., with Gmail SMTP)
async function sendEmail(name, email, message) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',
      pass: 'your_gmail_app_password', // use app password, NOT your Gmail password
    },
  });

  let mailOptions = {
    from: email,
    to: 'yourgmail@gmail.com',
    subject: `New Contact from ${name}`,
    text: message,
  };

  await transporter.sendMail(mailOptions);
}
*/

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
