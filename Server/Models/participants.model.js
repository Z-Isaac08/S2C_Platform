const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  whatsapp: { type: String, unique: true },
  email: String,
}, { timestamps: true });

module.exports = mongoose.model('Participant', participantSchema);
