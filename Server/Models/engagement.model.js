const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
    montant_total: Number,
    periodicite: { type: String, enum: ['mensuel', 'hebdomadaire'] },
    solde: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Engagement', engagementSchema);
