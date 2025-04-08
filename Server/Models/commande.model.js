const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
    statut: { type: String, enum: ['en cours', 'terminée', 'échouée'] },
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);
