import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendConfirmationEmail = async (email, firstName) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Bienvenue au Réveil - Confirmation S2C',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Josefin+Sans:ital,wght@0,700;1,700&display=swap');
          body { font-family: 'Montserrat', sans-serif; background-color: #1d1d1b; color: #fdfdfd; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #2a2a28; border-radius: 40px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
          .header { background: linear-gradient(135deg, #fcbe0c 0%, #00a19a 100%); padding: 60px 20px; text-align: center; }
          .logo { font-family: 'Josefin Sans', sans-serif; font-size: 42px; font-weight: bold; color: #1d1d1b; letter-spacing: -2px; text-transform: uppercase; }
          .content { padding: 40px; text-align: center; }
          h2 { font-family: 'Josefin Sans', sans-serif; color: #fcbe0c; font-size: 28px; margin-bottom: 20px; text-transform: uppercase; }
          p { line-height: 1.8; color: rgba(253, 253, 253, 0.7); font-size: 16px; }
          .badge { display: inline-block; padding: 8px 16px; background-color: rgba(0, 161, 154, 0.2); color: #00a19a; border-radius: 100px; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
          .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; color: rgba(253, 253, 253, 0.3); text-transform: uppercase; letter-spacing: 1px; }
          .accent { color: #fcbe0c; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">S2C</div>
            <div style="font-size: 12px; color: #1d1d1b; font-weight: bold; margin-top: 10px; letter-spacing: 3px; text-transform: uppercase;">Mouvement de Réveil</div>
          </div>
          <div class="content">
            <div class="badge">Confirmation d'inscription</div>
            <h2>Bonjour <span style="color: #fdfdfd;">${firstName}</span>,</h2>
            <p>
              C'est avec une immense joie que nous confirmons ton inscription au <span class="accent">Salon de Célébration & de Contemplation (S2C)</span>.
            </p>
            <p>
              Prépare-toi à vivre un moment d'exception, où l'adoration authentique et la louange prophétique ouvrent les cieux. Ton voyage avec la communauté commence ici.
            </p>
            <div style="margin-top: 40px; padding: 25px; background-color: rgba(255,255,255,0.03); border-radius: 24px; border: 1px dashed rgba(252, 190, 12, 0.3);">
              <p style="margin: 0; color: #fcbe0c; font-weight: bold;">PROCHAINE ÉDITION</p>
              <p style="margin: 5px 0 0 0; font-size: 20px; color: #fdfdfd;">ABIDJAN, CÔTE D'IVOIRE</p>
            </div>
          </div>
          <div class="footer">
            &copy; 2026 S2C Platform • Salon de Célébration & de Contemplation<br>
            Abidjan • Côte d'Ivoire
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(` Confirmation email sent to ${email}`);
  } catch (error) {
    console.error(' Error sending email:', error);
  }
};
