const Joi = require('joi');

const telemetrySchema = Joi.object({
  eventId: Joi.string().required(),
  vehicleId: Joi.string().required(),
  timestamp: Joi.date().iso().required(),
  location: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
  }).required(),
  speedKmh: Joi.number().min(0).max(300).required(),
  fuelLevelPercent: Joi.number().min(0).max(100).required(),
  engineStatus: Joi.string().valid('on', 'off', 'idle').required()
});

module.exports = { telemetrySchema };