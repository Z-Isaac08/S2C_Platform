const Inscription = require('../Models/inscription.model');

exports.create = async (req, res) => {
  try {
    const inscription = new Inscription(req.body);
    await inscription.save();
    res.status(201).json(inscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const inscriptions = await Inscription.find();
    res.status(200).json(inscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(inscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByWhatsapp = async (req, res) => {
    try {
      const { telephone } = req.params;
      const inscription = await Inscription.findOne({ telephone });
  
      if (!inscription) {
        return res.status(404).json({ message: 'Pas inscrit!' });
      }
  
      res.status(200).json(inscription);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.update = async (req, res) => {
  try {
    const inscription = await Inscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(inscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Inscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
