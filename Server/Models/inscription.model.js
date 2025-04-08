const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  qr_code_path: String,
  statut_presence: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Inscription', inscriptionSchema);
