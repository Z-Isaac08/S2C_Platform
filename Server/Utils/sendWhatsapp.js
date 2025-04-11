const twilio = require('twilio');

// Tes identifiants Twilio
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN_TWILIO; // Remplace par ton vrai token
const client = twilio(accountSid, authToken);

// Envoie le QR code au participant via WhatsApp.
const envoyerQRparWhatsApp = async (telephone, qrCodeUrl) => {
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${telephone}`,
            body: `Bienvenue au S2C #3 ! Voici ton QR Code. Merci pour ton inscription`,
            mediaUrl: [qrCodeUrl]
        });

        console.log('Message envoyé ! SID :', message.sid);
        console.log({telephone, qrCodeUrl});
        return message.sid;
    } catch (err) {
        console.error('Erreur lors de l’envoi du message WhatsApp :', err.message);
        throw err;
    }
};

module.exports = envoyerQRparWhatsApp;
