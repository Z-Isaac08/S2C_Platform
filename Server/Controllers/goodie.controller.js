const Goodie = require('../Models/goodie.model');

exports.create = async (req, res) => {
  try {
    const goodie = new Goodie(req.body);
    await goodie.save();
    res.status(201).json(goodie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const goodies = await Goodie.find();
    res.status(200).json(goodies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const goodie = await Goodie.findById(req.params.id);
    if (!goodie) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(goodie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const goodie = await Goodie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(goodie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Goodie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
