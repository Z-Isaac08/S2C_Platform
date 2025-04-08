const Soutien = require('../Models/soutien.model');

exports.create = async (req, res) => {
  try {
    const soutien = new Soutien(req.body);
    await soutien.save();
    res.status(201).json(soutien);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const soutiens = await Soutien.find();
    res.status(200).json(soutiens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const soutien = await Soutien.findById(req.params.id);
    if (!soutien) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(soutien);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByWhatsapp = async (req, res) => {
    try {
      const { telephone } = req.params;
      const soutien = await Soutien.findOne({ telephone });
  
      if (!soutien) {
        return res.status(404).json({ message: 'soutien not found' });
      }
  
      res.status(200).json(soutien);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
exports.update = async (req, res) => {
  try {
    const soutien = await Soutien.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(soutien);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Soutien.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
