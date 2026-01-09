const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SearchHistory = require('../models/SearchHistory');

const mockTrains = require('../mock/trains');
router.get('/history', auth, async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error("History Fetch Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch search history",
      error: error.message
    });
  }
});

router.post('/search', auth, async (req, res) => {
  try {
    const { sourceStation, destinationStation, travelTime, trainNumber, journeyDate } = req.body;

    await SearchHistory.create({
      userId: req.userId,
      sourceStation,
      destinationStation,
      travelTime,
    });

    // Filter mock trains that match the route
    const matchingTrains = Object.values(mockTrains).filter(train => {
      const hasSource = train.route.some(station =>
        station.station_name.toLowerCase().includes(sourceStation?.toLowerCase() || '')
      );
      const hasDest = train.route.some(station =>
        station.station_name.toLowerCase().includes(destinationStation?.toLowerCase() || '')
      );
      return hasSource && hasDest;
    });

    res.json({
      success: true,
      route: { sourceStation, destinationStation, travelTime, trainNumber, journeyDate },
      trains: matchingTrains
    });

  } catch (error) {
    console.error("Search Error:", error.message);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

router.get('/details/:trainNo', auth, async (req, res) => {
  try {
    const { trainNo } = req.params;

    if (mockTrains[trainNo]) {
      return res.json({
        success: true,
        trainNo,
        data: mockTrains[trainNo]
      });
    }

    res.status(404).json({
      success: false,
      message: `Train ${trainNo} not found in database`,
      availableTrains: Object.keys(mockTrains)
    });

  } catch (error) {
    console.error("Train Details Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch train details",
      error: error.message
    });
  }
});


module.exports = router;
