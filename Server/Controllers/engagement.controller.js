const Engagement = require('../Models/engagement.model');
const fs = require('fs');
const path = require('path');
const Participant = require('../Models/participants.model');
const { sendMail } = require('../Utils/sendMail');

exports.create = async (req, res) => {
    try {
        const { nom, prenom, whatsapp, email, montant_total, periodicite, duree } = req.body;

        if (!nom || !prenom || !whatsapp || !email || !montant_total || !periodicite || !duree) {
            return res.status(400).json({ error: "Tous les champs requis n'ont pas été fournis." });
        }

        // Vérifie si le participant existe
        let participant = await Participant.findOne({ whatsapp });

        if (participant) {
            // Vérifie s'il a déjà un engagement
            const existingEngagement = await Engagement.findOne({ participant: participant._id });

            if (existingEngagement) {
                return res.status(409).json({
                    error: "Vous participant a déjà pris un engagement. Impossible d'en prendre un nouveau avant écoulement de la durée d'engagement."
                });
            }
        } else {
            // Création du participant
            participant = new Participant({ nom, prenom, whatsapp, email });
            await participant.save();
        }

        // Création de l'engagement
        const engagement = new Engagement({
            participant: participant._id,
            montant_total,
            periodicite,
            duree,
        });

        // Préparation de l'email
        let htmlTemplate;
        try {
            htmlTemplate = fs.readFileSync(path.join(__dirname, 'mail', 'email_template.html'), 'utf-8');
        } catch (fileError) {
            return res.status(500).json({ error: "Erreur de lecture du template email." });
        }

        const logoUrl = "https://res.cloudinary.com/dehvdkzcw/image/upload/v1744808837/colorFichier3withBack_hljhvf.png";
        const prenom_html = participant.prenom || "participant";

        htmlTemplate = htmlTemplate
            .replace('{{logoUrl}}', logoUrl)
            .replace('{{prenom}}', prenom_html);

        // Envoi de l'e-mail
        try {
            await sendMail(email, "Prise d'engagement pour S2C", htmlTemplate, []);
        } catch (mailError) {
            return res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
        }

        // Sauvegarde de l'engagement
        await engagement.save();

        res.status(201).json({
            message: "Engagement enregistré avec succès.",
            engagement
        });

    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ error: "Une erreur interne est survenue. Veuillez réessayer plus tard." });
    }
};

exports.findAll = async (req, res) => {
    try {
        const engagements = await Engagement.find();
        res.status(200).json(engagements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const engagement = await Engagement.findById(req.params.id);
        if (!engagement) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(engagement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.findByWhatsapp = async (req, res) => {
    try {
        const { whatsapp } = req.params;
        const engagement = await Engagement.findOne({ whatsapp });

        if (!engagement) {
            return res.status(404).json({ message: 'Aucun engagement pour ce numero!' });
        }

        res.status(200).json(engagement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const engagement = await Engagement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(engagement);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await Engagement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
