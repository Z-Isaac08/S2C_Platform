const mongoose = require('mongoose');

const commandeItemSchema = new mongoose.Schema({
  commande: { type: mongoose.Schema.Types.ObjectId, ref: 'Commande' },
  goodie: { type: mongoose.Schema.Types.ObjectId, ref: 'Goodie' },
  taille: String,
  couleur: String,
  quantite: Number,
  prix_total: Number,
}, { timestamps: true });

module.exports = mongoose.model('CommandeItem', commandeItemSchema);
