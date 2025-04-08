const Engagement = require('../Models/engagement.model');

exports.create = async (req, res) => {
  try {
    const engagement = new Engagement(req.body);
    await engagement.save();
    res.status(201).json(engagement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const engagements = await Engagement.find();
    res.status(200).json(engagements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const engagement = await Engagement.findById(req.params.id);
    if (!engagement) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(engagement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByWhatsapp = async (req, res) => {
    try {
      const { telephone } = req.params;
      const engagement = await Engagement.findOne({ telephone });
  
      if (!engagement) {
        return res.status(404).json({ message: 'Aucun engagement pour ce numero!' });
      }
  
      res.status(200).json(engagement);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
exports.update = async (req, res) => {
  try {
    const engagement = await Engagement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(engagement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Engagement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
