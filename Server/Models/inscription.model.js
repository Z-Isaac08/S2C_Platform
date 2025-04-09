const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  qr_code_hash: String,
  qr_code_image: String,  // Nouveau champ pour stocker l'image en base64
  statut_presence: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Inscription', inscriptionSchema);
