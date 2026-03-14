const express = require('express');
const Medicine = require('../models/Medicine');
const router = express.Router();

// GET /api/medicines
router.get('/', async (req, res) => {
  try {
    const { userId, page = 1, limit = 6, search, category, sort } = req.query;
    const query = { userId };

    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    let sortObj = { createdAt: -1 };
    if (sort) {
      const [field, order] = sort.split(':');
      sortObj = { [field]: parseInt(order) };
    }

    const total = await Medicine.countDocuments(query);
    const data = await Medicine.find(query)
      .sort(sortObj)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({ data, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/medicines
router.post('/', async (req, res) => {
  try {
    const { userId, name } = req.body;
    if (!name) return res.status(400).json({ message: 'Medicine name is required' });
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/medicines/:id
router.put('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    if (medicine.userId.toString() !== req.body.userId) return res.status(403).json({ message: 'Unauthorized' });
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/medicines/:id
router.delete('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    await medicine.deleteOne();
    res.json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
