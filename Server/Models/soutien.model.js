const mongoose = require('mongoose');

const soutienSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  statut: { type: String, enum: ['réussi', 'échoué', 'en attente'] },
  payment_ref: String,
}, { timestamps: true });

module.exports = mongoose.model('Soutien', soutienSchema);
