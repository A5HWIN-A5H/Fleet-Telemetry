const crypto = require('crypto');
const Alert = require('../storage/models/Alert');

const checkSpeeding = (event) => {
  if (event.speedKmh > 120) {
    return {
      alertId: crypto.randomUUID(),
      vehicleId: event.vehicleId,
      type: 'speeding',
      eventId: event.eventId,
      details: `Vehicle speeding at ${event.speedKmh} km/h.`
    };
  }
  return null;
};

const checkLowFuel = (event) => {
  if (event.fuelLevelPercent < 15) {
    return {
      alertId: crypto.randomUUID(),
      vehicleId: event.vehicleId,
      type: 'low_fuel',
      eventId: event.eventId,
      details: `Fuel critically low at ${event.fuelLevelPercent}%.`
    };
  }
  return null;
};

const processTelemetryRules = async (event) => {
  const rules = [checkSpeeding, checkLowFuel];
  
  for (const rule of rules) {
    const alertData = rule(event);
    if (alertData) {
      await new Alert(alertData).save();
    }
  }
};

module.exports = { processTelemetryRules };