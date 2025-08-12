const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'https://foldex.vercel.app/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('https://foldex.vercel.app/dashboard');
  }
);

// LinkedIn OAuth routes
router.get('/linkedin', passport.authenticate('linkedin-openidconnect'));

router.get('/linkedin/callback',
  passport.authenticate('linkedin-openidconnect', { failureRedirect: 'https://foldex.vercel.app/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('https://foldex.vercel.app/dashboard');
  }
);

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
        linkedinAccessToken: req.user.linkedinAccessToken
      }
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Check auth status
router.get('/status', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

module.exports = router;
