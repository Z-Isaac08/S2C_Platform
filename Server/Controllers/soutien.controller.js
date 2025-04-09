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

    // participant dans la bd?
    let participant = await Participant.findOne({ telephone });

    if (!participant) {
      // sinon bah on le cree
      participant = new Participant({
        nom,
        prenom: prenom,
        telephone,
        email,
      });
      await participant.save();
    }

    // créa du soutien lié
    const newSoutien = new Soutien({
      participant: participant._id,
      montant,
      statut: 'en attente',
      payment_ref: null,
    });
    await newSoutien.save();

    console.log("Soutien créé avec succès :", newSoutien);
    // Generation paiement link de CinetPay
    const transactionId = `${Date.now()}-${newSoutien._id}`;

    const cinetpayPayload = {
      apikey: process.env.CINETPAY_API_KEY,
      site_id: process.env.CINETPAY_SITE_ID,
      transaction_id: transactionId,
      amount: montant,
      currency: 'XOF',
      description: `Soutien de ${nom} ${prenom}`,
      customer_name: nom,
      customer_surname: prenom,
      // customer_email: email,
      // customer_phone_number: telephone, 
      // // l'ajout de ces lignes provoquera une erreur 500 si les données ne sont pas bien formatées
      notify_url: process.env.CINETPAY_NOTIFY_URL,
      return_url: process.env.CINETPAY_RETURN_URL,
      channels: '',
    };

    const paymentResponse = await axios.post(
      'https://api-checkout.cinetpay.com/v2/payment',
      cinetpayPayload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (paymentResponse.data.code !== '201') {
      throw new Error('Erreur lors de la création du paiement CinetPay');
    }

    // Enregistrer le payment_ref dans le soutien
    newSoutien.payment_ref = transactionId;
    await newSoutien.save();

    // Retourner le lien de redirection CinetPay
    res.status(201).json({
      message: 'Redirection vers le paiement.',
      redirectUrl: paymentResponse.data.data.payment_url,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    const { cpm_trans_id } = req.body; // ou req.body si POST selon config CinetPay

    if (!cpm_trans_id) {
      return res.status(400).json({ message: 'Transaction ID manquant' });
    }

    // Appel à l'API CinetPay pour vérifier le paiement
    const axios = require('axios');
    const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment/check', {
      apikey: process.env.CINETPAY_API_KEY,
      site_id: process.env.CINETPAY_SITE_ID,
      transaction_id: cpm_trans_id
    });

    const data = response.data;

    if (data.code === '00' && data.data.status === 'ACCEPTED') {
      // Paiement réussi → on met à jour le soutien
      const soutien = await Soutien.findOneAndUpdate(
        { payment_ref: cpm_trans_id },
        { statut: 'réussi' },
        { new: true }
      );

      return res.status(200).json({ message: 'Paiement validé', soutien });
    } else {
      // Paiement échoué ou refusé
      await Soutien.findOneAndUpdate(
        { payment_ref: cpm_trans_id },
        { statut: 'échoué' }
      );

      return res.status(200).json({ message: 'Paiement échoué ou refusé' });
    }

  } catch (err) {
    console.error("❌ Erreur callback :", err.message);
    res.status(500).json({ error: err.message });
  }
};

