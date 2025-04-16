const Participant = require('../Models/participants.model');
const Inscription = require('../Models/inscription.model');
const QRCode = require('qrcode');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { sendMail } = require('../Utils/sendMail'); // à créer
const { verifyCaptcha } = require('../Utils/verifyCaptcha'); // done
const envoyerQRparWhatsApp = require('../Utils/sendWhatsapp');
const { cloudinary } = require('../Utils/cloudinary');
const streamifier = require('streamifier');

exports.create = async (req, res) => {
    try {
        const { nom, prenoms, email, whatsapp, captcha } = req.body;

        const captchaValid = await verifyCaptcha(captcha);

        if (!captchaValid) {
            return res.status(400).json({ error: 'Échec de la vérification reCAPTCHA' });
        }

        // 1. Vérifier si le participant existe
        let participant = await Participant.findOne({ whatsapp: whatsapp });

        // 2. Sinon le créer
        if (!participant) {
            participant = new Participant({
                nom,
                prenom: prenoms,
                email,
                whatsapp: whatsapp,
            });
            await participant.save();
        }

        // 3. Vérifier si ce participant a déjà une inscription
        const inscriptionExistante = await Inscription.findOne({ participant: participant._id });

        if (inscriptionExistante) {
            return res.status(400).json({
                error: "Ce numéro ou cette adresse email a déjà été utilisé pour une inscription.",
            });
        }

        // 4. Générer un ID d’inscription unique
        const hash = crypto.createHash('sha512')
            .update(`${nom}-${prenoms}-${email}-${whatsapp}-${Date.now()}`)
            .digest('hex');

        // 5. Créer l’inscription
        const inscription = new Inscription({
            participant: participant._id,
            qr_code_hash: hash,
        });

        // 6. Générer le QR code
        const qrCodePayload = {
            id: inscription._id,
            nom,
            prenoms,
            email,
            whatsapp,
        };

        const qrContent = JSON.stringify(qrCodePayload);
        const qrBuffer = await QRCode.toBuffer(qrContent);

        const cloudinaryUpload = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 's2c/qrcodes',
                        public_id: inscription._id.toString(),
                        resource_type: 'image',
                        overwrite: true,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );

                streamifier.createReadStream(qrBuffer).pipe(uploadStream);
            });
        };

        const qrCodeUrl = await cloudinaryUpload();

        inscription.qr_code_image = qrCodeUrl;
        await inscription.save();

        let htmlTemplate = fs.readFileSync(path.join(__dirname, 'mail', 'email-template.html'), 'utf-8');
        const logoUrl = "https://res.cloudinary.com/dehvdkzcw/image/upload/v1744808837/colorFichier3withBack_hljhvf.png";
        htmlTemplate = htmlTemplate.replace('{{logoUrl}}', logoUrl);

        const attachments = [
            {
                filename: 'qr-code.png',
                content: qrBuffer,
                cid: 'qr-code',
            },
        ];

        await sendMail(email, 'Confirmation d’inscription au S2C#3 🎉', htmlTemplate, attachments);
        // await envoyerQRparWhatsApp(participant.telephone, qrCodeUrl);

        res.status(201).json({
            message: "Inscription réussie",
            qrCode: inscription.qr_code_image,
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.scanCode = async (req, res) => {
    const { qrCodeData } = req.body;

    try {
        const payload = JSON.parse(qrCodeData); // Le contenu du QR Code est un JSON stringifié
        const inscriptionId = payload.id;

        // 1. Rechercher l’inscription via l’ID
        const inscription = await Inscription.findById(inscriptionId).populate('participant');

        if (!inscription) {
            return res.status(404).json({ error: 'Inscription non trouvée' });
        }

        // 2. Vérifier si la présence a déjà été validée
        if (inscription.statut_presence === true) {
            return res.status(400).json({ error: 'Présence déjà enregistrée' });
        }

        // 3. Marquer comme présent
        inscription.statut_presence = true;
        await inscription.save();

        res.status(200).json({ message: 'Présence confirmée 🎉', participant: inscription.participant });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la validation du QR Code' });
    }
}

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
