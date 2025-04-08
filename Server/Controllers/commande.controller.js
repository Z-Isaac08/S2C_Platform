const Commande = require('../Models/commande.model');

exports.create = async (req, res) => {
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Pas trouvé' });
    res.status(200).json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByWhatsapp = async (req, res) => {
    try {
      const { telephone } = req.params;
      const participant = await Commande.findOne({ telephone });
  
      if (!participant) {
        return res.status(404).json({ message: 'Ce numéro ne possede pas de commande' });
      }
  
      res.status(200).json(participant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.update = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Commande.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'suppression effectué' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
