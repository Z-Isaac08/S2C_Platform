const Participant = require('../Models/participants.model');
const Inscription = require('../Models/inscription.model');
const QRCode = require('qrcode');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { sendMail } = require('../Utils/sendMail'); // à créer
const { verifyCaptcha } = require('../Utils/verifyCaptcha'); // done
const envoyerQRparWhatsApp = require('../Utils/sendWhatsapp');

exports.create = async (req, res) => {
  try {
    const { nom, prenoms, email, whatsapp, captcha } = req.body;

    const captchaValid = await verifyCaptcha(captcha);

    if (!captchaValid) {
      return res.status(400).json({ error: 'Échec de la vérification reCAPTCHA' });
    }

    // 1. Vérifier si le participant existe
    let participant = await Participant.findOne({ telephone: whatsapp });

    // 2. Sinon le créer
    if (!participant) {
      participant = new Participant({
        nom,
        prenom: prenoms,
        email,
        telephone: whatsapp,
      });
      await participant.save();
    }

    // 3. Générer un hash unique
    const hash = crypto.createHash('sha512')
      .update(`${nom}-${prenoms}-${email}-${whatsapp}-${Date.now()}`)
      .digest('hex');

    // 4. Créer l’inscription
    const inscription = new Inscription({
      participant: participant._id,
      qr_code_hash: hash,
    });

    // 5. Générer le QR code à partir du hash
    const qrBuffer = await QRCode.toBuffer(hash);
    const qrCodeBase64 = qrBuffer.toString('base64'); // Convertir le buffer en base64

    // Sauvegarder le QR code dans la base de données
    inscription.qr_code_image = `data:image/png;base64,${qrCodeBase64}`;
    await inscription.save();

    // Chemin du logo de l'entreprise et du code QR
    const logoPath = path.join(__dirname, 'mail', 'logo.svg');
    const htmlTemplate = fs.readFileSync(path.join(__dirname, 'mail', 'email-template.html'), 'utf-8');

    const attachments = [
      {
        filename: 'qr-code.png',
        content: qrBuffer,
        contentType: 'image/png',
      },
      {
        filename: 'logo.svg',
        path: logoPath,
        cid: 'logo-image',
      },
    ];

    // Envoyer un email avec le QR code en pièce jointe
    await sendMail(email, 'Confirmation d’inscription au S2C#3 🎉', htmlTemplate, attachments);
    await envoyerQRparWhatsApp(participant.telephone, inscription.qr_code_image);

    // Répondre au front avec succès
    res.status(201).json({
      message: "Inscription réussie",
      qrCode: inscription.qr_code_image, 
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.findAll = async (req, res) => {
  try {
    const inscriptions = await Inscription.find();
    res.status(200).json(inscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(inscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByWhatsapp = async (req, res) => {
  try {
    const { telephone } = req.params;
    const inscription = await Inscription.findOne({ telephone });

    if (!inscription) {
      return res.status(404).json({ message: 'Pas inscrit!' });
    }

    res.status(200).json(inscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    const inscription = await Inscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(inscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Inscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
