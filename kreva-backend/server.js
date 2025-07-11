const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: ['https://www.wearekreva.com/', 'http://127.0.0.1:5500'] }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/send-email', async (req, res) => {
  const { firstName, lastName, company, phone, email, message } = req.body;

  if (!firstName || !lastName || !company || !phone || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'praisearibisala3@gmail.com',
    subject: `Project Inquiry from ${firstName} ${lastName}`,
    text: `
      Hello Kreva,

      You’ve received a new project inquiry. Below are the details:

      ──────────────────────────────
      👤 Name: ${firstName} ${lastName}
      🏢 Company: ${company || 'N/A'}
      📞 Phone: ${phone}
      📧 Email: ${email}
      💬 Message:
      ${message}
      ──────────────────────────────

      Please follow up as soon as possible.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', res: mailOptions });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
