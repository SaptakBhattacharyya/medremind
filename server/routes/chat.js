const express = require('express');
const router = express.Router();

// POST /api/chat — placeholder for Day 2 RAG pipeline
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Placeholder response — will be replaced with RAG pipeline
    const reply = `Thank you for your query about "${message}". The RAG pipeline (Pinecone + OpenAI) will be connected here to provide medicine suggestions. For now, please consult a doctor for medical advice.`;

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
