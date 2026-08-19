const Alert = require('../storage/models/Alert');
const TelemetryEvent = require('../storage/models/TelemetryEvent');

const getVehicleAlerts = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    // Fetch alerts for the vehicle, sorted by newest first
    const alerts = await Alert.find({ vehicleId }).sort({ triggeredAt: -1 });
    
    return res.status(200).json({ count: alerts.length, data: alerts });
  } catch (err) {
    console.error('Error fetching alerts:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getVehicleTelemetry = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    // Limit to the last 50 events to prevent massive payload sizes
    const events = await TelemetryEvent.find({ vehicleId })
      .sort({ timestamp: -1 })
      .limit(50);
      
    return res.status(200).json({ count: events.length, data: events });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getVehicleAlerts, getVehicleTelemetry };