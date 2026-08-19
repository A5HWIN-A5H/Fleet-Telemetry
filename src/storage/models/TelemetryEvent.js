const mongoose = require('mongoose');

const telemetryEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  vehicleId: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true, index: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  speedKmh: { type: Number, required: true },
  fuelLevelPercent: { type: Number, required: true },
  engineStatus: { type: String, enum: ['on', 'off', 'idle'], required: true }
});

module.exports = mongoose.model('TelemetryEvent', telemetryEventSchema);