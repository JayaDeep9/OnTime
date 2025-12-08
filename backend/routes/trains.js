const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const SearchHistory = require('../models/SearchHistory');

// Load mock data
const mockTrains = require('../mock/trains');

  //  SEARCH ROUTE (Same as before)
router.post('/search', auth, async (req, res) => {
  try {
    const { sourceStation, destinationStation, travelTime, trainNumber, journeyDate } = req.body;

    await SearchHistory.create({
      userId: req.userId,
      sourceStation,
      destinationStation,
      travelTime,
    });

    const options = {
      method: 'GET',
      url: 'https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status',
      params: {
        departure_date: journeyDate,
        isH5: 'true',
        client: 'web',
        deviceIdentifier: 'Mozilla Firefox',
        train_number: trainNumber
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    res.json({
      success: true,
      route: { sourceStation, destinationStation, travelTime, trainNumber, journeyDate },
      trainStatus: response.data
    });

  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Train status API failed',
      error: error.message
    });
  }
});

/* ------------------------------------------
   DETAILS ROUTE (MOCK + API FALLBACK)
------------------------------------------- */
router.get('/details/:trainNo', auth, async (req, res) => {
  try {
    const io = req.app.get("io");
    const { trainNo } = req.params;
    const { journeyDate } = req.query;

    // 1️⃣ If train exists in mock → return mock immediately
    if (mockTrains[trainNo]) {
      const trainData = mockTrains[trainNo];
      io.emit(`trainUpdate:${trainNo}`, trainData);
      return res.json({ success: true, trainNo, data: trainData });
    }

    // 2️⃣ Otherwise, try RapidAPI
    const formattedDate =
      journeyDate?.replace(/\D/g, "") ||
      new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const options = {
      method: 'GET',
      url: 'https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status',
      params: {
        departure_date: formattedDate,
        isH5: 'true',
        client: 'web',
        deviceIdentifier: 'Mozilla Firefox',
        train_number: trainNo
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com'
      }
    };

    let rawData;
    try {
      rawData = (await axios.request(options)).data;
    } catch (apiError) {
      console.log("API FAILED → USING MOCK IF AVAILABLE");

      // fallback to mock if exists
      if (mockTrains[trainNo]) {
        const trainData = mockTrains[trainNo];
        io.emit(`trainUpdate:${trainNo}`, trainData);
        return res.json({ success: true, trainNo, data: trainData });
      }

      throw apiError; // no mock → throw error
    }

    // 3️⃣ Transform API response
    const trainData = {
      train_name: rawData?.data?.train_name || `Train ${trainNo}`,
      train_number: trainNo,
      route: rawData?.data?.route || [],
      current_station: rawData?.data?.current_station,
      status: rawData?.data?.status,
      delay: rawData?.data?.delay || 0
    };

    // 4️⃣ Emit realtime update
    io.emit(`trainUpdate:${trainNo}`, trainData);

    return res.json({ success: true, trainNo, data: trainData });

  } catch (error) {
    console.error("TRAIN DETAILS ERROR:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Train details API failed",
      error: error.message
    });
  }
});

module.exports = router;
