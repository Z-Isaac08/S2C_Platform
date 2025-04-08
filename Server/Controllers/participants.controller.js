const Participant = require('../Models/participants.model.js');
const { findByWhatsapp } = require('./engagement.controller.js');

 const findAll = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des participants' });
  }
};

 const findOne = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du participant' });
  }
};
exports.findByWhatsapp = async (req, res) => {
  try {
    const { telephone } = req.params;
    const participant = await Participant.findOne({ telephone });

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    res.status(200).json(participant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 const create = async (req, res) => {
  const { nom, prenom, telephone, email } = req.body;
  try {
    const newParticipant = new Participant({ nom, prenom, telephone, email });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du participant' });
  }
};

 const update = async (req, res) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParticipant) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }
    res.status(200).json(updatedParticipant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du participant' });
  }
};

 const remove = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé' });
    }
    res.status(200).json({ message: 'Participant supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du participant' });
  }
};

module.exports = {
  findAll,
  findOne,
  findByWhatsapp,
  create,
  update,
  remove,
};