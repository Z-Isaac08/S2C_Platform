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
      statut: 'en attente', 
      payment_ref: null, 
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
    const { nom, prenom, whatsapp, email, montant } = req.body;

    if (!whatsapp) {
      return res.status(400).json({ error: "Le numéro de téléphone est requis." });
    }

    // Vérifie si le participant existe déjà
    let participant = await Participant.findOne({ whatsapp });

    if (!participant) {
      participant = new Participant({ nom, prenom, whatsapp, email });
      await participant.save();
    } 
    // Créer un ID unique local pour la transaction
    const transactionId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newSoutien = new Soutien({
      participant: participant._id,
      statut: 'en attente',
      payment_ref: transactionId,
      montant, // utile si tu veux suivre le montant à payer
    });

    await newSoutien.save();

    // 🔗 Lien vers Djamo (à personnaliser)
    const redirectUrl = `https://pay.djamo.com/lipya`;

    return res.status(201).json({
      message: 'Redirection vers le paiement Djamo.',
      redirectUrl,
    });

  } catch (err) {
    console.error('❌ Erreur createWithParticipant:', err.message);
    return res.status(500).json({ error: "Une erreur est survenue, veuillez réessayer." });
  }
};

exports.handleCallbackDjamo = async (req, res) => {
  try {
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

exports.initierPaiementPaystack = async (req, res) => {
  try {
    const { email, montant, nom, prenoms, whatsapp } = req.body;

    let participant = await Participant.findOne({ whatsapp });
    if (!participant) {
      participant = new Participant({ nom, prenom: prenoms, whatsapp, email });
      await participant.save();
    }
    trueMontant=montant*100
    const soutien = new Soutien({
      participant: participant._id,
      montant:trueMontant,
      statut: 'en attente',
    });
    await soutien.save();


    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: trueMontant,
        callback_url: `${process.env.PAYSTACK_CALLBACK_URL}?soutienId=${soutien._id}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    soutien.payment_ref = response.data.data.reference;
    await soutien.save();

    res.status(200).json({
      url: response.data.data.authorization_url,
      message: 'Rediriger vers Paystack',
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors de l’initiation du paiement' });
  }
};
