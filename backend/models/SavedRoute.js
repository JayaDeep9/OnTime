const mongoose = require('mongoose');

const savedRouteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceStation: { type: String, required: true },     
  destinationStation: { type: String, required: true },
  preferredTime: { type: String, required: true },
  routeName: {
    type: String,
    default: function() {
      return `${this.sourceStation} → ${this.destinationStation}`;
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SavedRoute', savedRouteSchema);
