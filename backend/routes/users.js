const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SavedRoute = require('../models/SavedRoute');
const User = require('../models/User');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

router.post('/routes', auth, async (req, res) => {
  try {
    const { sourceStation, destinationStation, preferredTime, routeName } = req.body;

    const savedRoute = new SavedRoute({
      userId: req.userId,
      sourceStation,
      destinationStation,
      preferredTime,
      routeName,
    });

    await savedRoute.save();
    res.status(201).json({ success: true, message: 'Route saved', route: savedRoute });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save route', error: error.message });
  }
});

router.get('/routes', auth, async (req, res) => {
  try {
    const routes = await SavedRoute.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, routes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch routes', error: error.message });
  }
});

router.delete('/routes/:id', auth, async (req, res) => {
  try {
    await SavedRoute.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ success: true, message: 'Route deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete route', error: error.message });
  }
});

module.exports = router;