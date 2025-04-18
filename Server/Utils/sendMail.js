// utils/mailer.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou un autre provider (Outlook, Mailgun, etc)
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: "L@Team#S2C.com",
  },
});

const sendMail = async (to, subject, htmlContent,attachments) => {
  const mailOptions = {
    from: `"S2C" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Mail envoyé à ${to}`);
  } catch (error) {
    console.error(`Erreur envoi mail :`, error.message);
    throw error;
  }
};

module.exports = { sendMail };
