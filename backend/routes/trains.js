// backend/routes/trains.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const SearchHistory = require('../models/SearchHistory');

router.post('/search', auth, async (req, res) => {
  try {
    const { sourceStation, destinationStation, travelTime, trainNumber, journeyDate } = req.body;

    // Save search history
    await SearchHistory.create({
      userId: req.userId,
      sourceStation,
      destinationStation,
      travelTime,
    });

    // RapidAPI integration
    const options = {
      method: 'GET',
      url: 'https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status',
      params: {
        departure_date: journeyDate,    // e.g., "20250717"
        isH5: 'true',
        client: 'web',
        deviceIdentifier: 'Mozilla Firefox',
        train_number: trainNumber
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
        'x-rapid-api': 'rapid-api-database'
      }
    };

    const response = await axios.request(options);

    res.json({
      success: true,
      route: {
        sourceStation,
        destinationStation,
        travelTime,
        trainNumber,
        journeyDate
      },
      trainStatus: response.data
    });

  } catch (error) {
    console.error("API ERROR:", error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Train status API failed', 
      error: error.message 
    });
  }
});

// TRAIN DETAILS (Dynamic Route with Realtime Update)
router.get('/details/:trainNo', auth, async (req, res) => {
  try {
    const io = req.app.get("io");    // <<< SOCKET.IO INSTANCE ADDED
    const { trainNo } = req.params;  // e.g., 12733
    const { journeyDate } = req.query; // optional date

    const options = {
      method: 'GET',
      url: 'https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status',
      params: {
        departure_date: journeyDate || new Date().toISOString().slice(0,10).replace(/-/g, ""), 
        isH5: 'true',
        client: 'web',
        deviceIdentifier: 'Mozilla Firefox',
        train_number: trainNo
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
        'x-rapid-api': 'rapid-api-database'
      }
    };

    const response = await axios.request(options);

    const trainData = response.data;

    // 🔥 REALTIME UPDATE EMIT (NEW)
    io.emit(`trainUpdate:${trainNo}`, trainData);

    // Normal API response
    res.json({
      success: true,
      trainNo,
      data: trainData
    });

  } catch (error) {
    console.error("TRAIN DETAILS ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Train details API failed",
      error: error.message
    });
  }
});




module.exports = router;
