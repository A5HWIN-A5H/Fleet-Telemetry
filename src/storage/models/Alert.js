const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertId: { type: String, required: true, unique: true },
  vehicleId: { type: String, required: true, index: true },
  type: { type: String, enum: ['speeding', 'geofence_breach', 'low_fuel'], required: true },
  triggeredAt: { type: Date, default: Date.now },
  eventId: { type: String, required: true },
  details: { type: String, required: true }
});

module.exports = mongoose.model('Alert', alertSchema);