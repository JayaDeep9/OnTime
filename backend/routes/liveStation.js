const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const mockLiveStations = {
  "SC": {
    station_name: "Secunderabad Junction",
    station_code: "SC",
    trains: [
      { train_number: "12733", train_name: "Narayanadri Express", scheduled_departure: "16:35", expected_departure: "16:50", delay: 15, status: "Late" },
      { train_number: "17230", train_name: "Sabari Express", scheduled_arrival: "06:45", expected_arrival: "07:10", delay: 25, status: "Arriving Late" },
      { train_number: "12841", train_name: "Coromandel Express", scheduled_departure: "20:30", expected_departure: "20:30", delay: 0, status: "On Time" }
    ]
  },
  "BZA": {
    station_name: "Vijayawada Junction",
    station_code: "BZA",
    trains: [
      { train_number: "12841", train_name: "Coromandel Express", scheduled_arrival: "05:00", expected_arrival: "05:00", delay: 0, status: "Arriving" },
      { train_number: "12733", train_name: "Narayanadri Express", scheduled_departure: "21:05", expected_departure: "21:05", delay: 0, status: "On Time" }
    ]
  },
  "MAS": {
    station_name: "Chennai Central",
    station_code: "MAS",
    trains: [
      { train_number: "12163", train_name: "Chennai Express", scheduled_arrival: "13:30", expected_arrival: "13:38", delay: 8, status: "Arriving Late" }
    ]
  },
  "NDLS": {
    station_name: "New Delhi",
    station_code: "NDLS",
    trains: [
      { train_number: "12430", train_name: "New Delhi Lucknow Mail", scheduled_departure: "22:05", expected_departure: "22:05", delay: 0, status: "On Time" }
    ]
  },
  "SBC": {
    station_name: "KSR Bengaluru",
    station_code: "SBC",
    trains: [
      { train_number: "12627", train_name: "Karnataka Express", scheduled_departure: "19:20", expected_departure: "19:20", delay: 0, status: "On Time" },
      { train_number: "22691", train_name: "Rajdhani Express", scheduled_departure: "20:00", expected_departure: "20:05", delay: 5, status: "Late" },
      { train_number: "16526", train_name: "KSR Bengaluru - Kannur Express", scheduled_departure: "20:30", expected_departure: "20:30", delay: 0, status: "On Time" }
    ]
  }
};

router.get("/:stationCode", auth, async (req, res) => {
  try {
    const { stationCode } = req.params;
    const stationCodeUpper = stationCode.toUpperCase();

    if (mockLiveStations[stationCodeUpper]) {
      return res.json({
        success: true,
        station: stationCodeUpper,
        data: mockLiveStations[stationCodeUpper]
      });
    }

    res.status(404).json({
      success: false,
      message: `No live data available for station ${stationCodeUpper}`,
      availableStations: Object.keys(mockLiveStations)
    });

  } catch (error) {
    console.error("Live Station Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch live station data",
      error: error.message,
    });
  }
});

module.exports = router;
