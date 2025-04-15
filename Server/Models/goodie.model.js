const mongoose = require('mongoose');

const goodieSchema = new mongoose.Schema({
  image: String,
  nom: String,
  description: String,
  prix: Number,
  tailles: [String],
  couleurs: [String],
}, { timestamps: true });

module.exports = mongoose.model('Goodie', goodieSchema);
