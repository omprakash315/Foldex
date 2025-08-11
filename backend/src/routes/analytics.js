const express = require('express');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Simple analytics
router.get('/linkedin', (req, res) => {
  res.json({ message: 'LinkedIn analytics data' });
});

module.exports = router;
