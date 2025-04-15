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

        // 3. Générer un ID d’inscription unique (si besoin)
        const hash = crypto.createHash('sha512')
            .update(`${nom}-${prenoms}-${email}-${whatsapp}-${Date.now()}`)
            .digest('hex');

        // 4. Créer l’inscription (on laisse le hash dans la DB pour compatibilité)
        const inscription = new Inscription({
            participant: participant._id,
            qr_code_hash: hash,
        });

        // 5. Générer un contenu JSON pour le QR Code
        const qrCodePayload = {
            id: inscription._id,
            nom,
            prenoms,
            email,
            whatsapp,
        };

        const qrContent = JSON.stringify(qrCodePayload);

        // 5. Générer le QR code à partir du hash
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

        // Enregistrer l’URL Cloudinary
        inscription.qr_code_image = qrCodeUrl;
        await inscription.save();

        let htmlTemplate = fs.readFileSync(path.join(__dirname, 'mail', 'email-template.html'), 'utf-8');
        const logoUrl = "https://res.cloudinary.com/dehvdkzcw/image/upload/v1744709429/logo_bwmo1d.svg";
        htmlTemplate = htmlTemplate.replace('{{logoUrl}}', logoUrl);


        const attachments = [
            {
                filename: 'qr-code.png',
                content: qrBuffer, // Le buffer de l'image QR Code
                cid: 'qr-code', // L'ID de l'image pour l'intégrer dans l'email
            },
        ];

        // Envoyer un email avec le QR code en pièce jointe
        await sendMail(email, 'Confirmation d’inscription au S2C#3 🎉', htmlTemplate, attachments);
        await envoyerQRparWhatsApp(participant.telephone, qrCodeUrl);

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
