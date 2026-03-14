const express = require('express');
const HealthLog = require('../models/HealthLog');
const router = express.Router();

// GET /api/logs
router.get('/', async (req, res) => {
  try {
    const { userId, page = 1, limit = 8, startDate, endDate } = req.query;
    const query = { userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const total = await HealthLog.countDocuments(query);
    const data = await HealthLog.find(query)
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({ data, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/logs
router.post('/', async (req, res) => {
  try {
    const { userId, date } = req.body;
    if (!date) return res.status(400).json({ message: 'Date is required' });
    const log = await HealthLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/logs/:id
router.put('/:id', async (req, res) => {
  try {
    const log = await HealthLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    if (log.userId.toString() !== req.body.userId) return res.status(403).json({ message: 'Unauthorized' });
    const updated = await HealthLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/logs/:id
router.delete('/:id', async (req, res) => {
  try {
    const log = await HealthLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    await log.deleteOne();
    res.json({ message: 'Log deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
