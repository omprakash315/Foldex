const express = require('express');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Get user profile
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile' });
});

module.exports = router;
