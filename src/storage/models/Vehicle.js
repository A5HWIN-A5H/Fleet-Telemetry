const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  operatorId: { type: String, required: true, index: true },
  registeredGeofence: {
    center: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    radiusKm: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);