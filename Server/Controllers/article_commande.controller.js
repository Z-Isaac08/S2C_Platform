const CommandeItem = require('../Models/article_commande.model');

exports.create = async (req, res) => {
  try {
    const item = new CommandeItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const items = await CommandeItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const item = await CommandeItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await CommandeItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await CommandeItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
