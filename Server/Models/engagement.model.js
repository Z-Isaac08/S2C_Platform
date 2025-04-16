const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
    montant_total: Number,
    periodicite: String,
    duree: String,
    solde: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Engagement', engagementSchema);
