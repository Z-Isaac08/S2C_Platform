const Soutien = require('../Models/soutien.model');
const Participant = require('../Models/participants.model');
const axios = require('axios');
require('dotenv').config();


exports.create = async (req, res) => {
  try {
    const soutien = new Soutien(req.body);
    await soutien.save();
    res.status(201).json(soutien);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const soutiens = await Soutien.find();
    res.status(200).json(soutiens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const soutien = await Soutien.findById(req.params.id);
    if (!soutien) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(soutien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByWhatsapp = async (req, res) => {
    try {
      const { telephone } = req.params;
      const soutien = await Soutien.findOne({ telephone });
  
      if (!soutien) {
        return res.status(404).json({ message: 'soutien not found' });
      }
  
      res.status(200).json(soutien);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
exports.update = async (req, res) => {
  try {
    const soutien = await Soutien.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(soutien);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Soutien.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createWithParticipant_v1 = async (req, res) => {
  try {
    const { nom, prenoms, telephone, email, montant } = req.body;

    // Créer le participant
    const newParticipant = new Participant({
      nom,
      prenom: prenoms,
      telephone,
      email,
    });

    await newParticipant.save();

    // Créer le soutien lié
    const newSoutien = new Soutien({
      participant: newParticipant._id,
      montant,
      statut: 'en attente', // ou 'réussi' si déjà validé
      payment_ref: null, // à compléter plus tard si besoin
    });

    await newSoutien.save();

    // Retourner les 2
    res.status(201).json({
      message: 'Participant et soutien créés',
      participant: newParticipant,
      soutien: newSoutien,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWithParticipant = async (req, res) => {
  try {
    const { nom, prenom, telephone, email, montant } = req.body;

    // Vérifie si le participant existe déjà
    let participant = await Participant.findOne({ telephone });

    if (!participant) {
      participant = new Participant({ nom, prenom, telephone, email });
      await participant.save();
    }

    // Créer un ID unique local pour la transaction
    const transactionId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newSoutien = new Soutien({
      participant: participant._id,
      statut: 'en attente',
      payment_ref: transactionId,
    });
    await newSoutien.save();

    // 🔗 Générer un lien Djamo (exemple générique, à adapter avec ton lien réel)
    const redirectUrl = `https://pay.djamo.com/lipya`;

    res.status(201).json({
      message: 'Redirection vers le paiement Djamo.',
      redirectUrl,
    });

  } catch (err) {
    console.error('❌ Erreur createWithParticipant:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.handleCallbackDjamo = async (req, res) => {
  try {
    // Assurer que la transaction ID est présente
    const { transaction_id, status } = req.body; // Assure-toi que Djamo envoie un body similaire

    if (!transaction_id || !status) {
      return res.status(400).json({ message: 'Transaction ID ou status manquant' });
    }

    // Vérifie si le paiement est réussi
    if (status === 'SUCCESS') {
      // Met à jour le statut du soutien avec la transaction réussie
      const soutien = await Soutien.findOneAndUpdate(
        { payment_ref: transaction_id },
        { statut: 'réussi' },
        { new: true }
      );

      if (!soutien) {
        return res.status(404).json({ message: 'Soutien non trouvé avec cette référence de paiement' });
      }

      return res.status(200).json({ message: 'Paiement validé', soutien });
    } else {
      // En cas d'échec, met à jour le statut du soutien comme échoué
      await Soutien.findOneAndUpdate(
        { payment_ref: transaction_id },
        { statut: 'échoué' }
      );

      return res.status(200).json({ message: 'Paiement échoué' });
    }
  } catch (err) {
    console.error('❌ Erreur callback Djamo:', err.message);
    res.status(500).json({ error: err.message });
  }
};
