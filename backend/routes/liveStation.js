const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");

router.get("/:stationCode", auth, async (req, res) => {
  try {
    const { stationCode } = req.params;

    const response = await axios.get(
      "https://indian-railway-irctc.p.rapidapi.com/api/v1/liveStation",
      {
        params: {
          station_code: stationCode,
          hours: "4"
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "indian-railway-irctc.p.rapidapi.com"
        }
      }
    );

    res.json({
      success: true,
      station: stationCode,
      trains: response.data.data.trains
    });
  } catch (error) {
    console.error("LIVE STATION ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Live station API failed",
      error: error.message,
    });
  }
});

module.exports = router;
