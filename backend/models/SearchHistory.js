const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sourceStation: {
    type: String,
    required: true,
  },
  destinationStation: {
    type: String,
    required: true,
  },
  travelTime: {
    type: String,
    required: true,
  },
  searchDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);