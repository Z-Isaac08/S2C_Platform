const Participant = require('../Models/participants.model');
const Inscription = require('../Models/inscription.model');
const QRCode = require('qrcode');
const crypto = require('crypto');
const {sendMail} = require('../Utils/sendMail'); // à créer
const {sendWhatsApp} = require('../Utils/sendWhatsapp'); // à créer
const { verifyCaptcha } = require('../Utils/verifyCaptcha'); // done




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
    await inscription.save();

    // 5. Générer le QR code à partir du hash
    const qrBuffer = await QRCode.toBuffer(hash);
const htmlContent = `
  <h2>Salut ${nom} 👋</h2>
  <p>Merci pour ton inscription à l'événement !</p>
  <p>Ton QR code est en pièce jointe 📎</p>
`;

const attachments = [
  {
    filename: 'qr-code.png',
    content: qrBuffer,
    contentType: 'image/png',
  },
];

await sendMail(email, 'Confirmation d’inscription au S2C#3 🎉', htmlContent, attachments);

    // await sendMail(email, qrCodeDataURL);
    // await sendWhatsApp(whatsapp, qrCodeDataURL);

    // 7. Répondre au front avec succès
    res.status(201).json({
      message: "Inscription réussie",
      qrCode: hash,
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
