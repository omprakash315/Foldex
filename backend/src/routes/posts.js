const express = require('express');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Simple post creation
router.post('/', (req, res) => {
  res.json({ message: 'Post created' });
});

module.exports = router;
