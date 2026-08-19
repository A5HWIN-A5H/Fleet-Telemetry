const { telemetrySchema } = require('../validation/telemetry.schema');
const TelemetryEvent = require('../storage/models/TelemetryEvent');

const { processTelemetryRules } = require('../processing/ruleEngine');

const ingestTelemetry = async (req, res) => {
  try {
    // 1. Validate payload against Joi schema
    const { error, value } = telemetrySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: 'Validation Error', details: error.details[0].message });
    }

    // 2. Persist the raw event to the database
    const newEvent = new TelemetryEvent(value);
    await newEvent.save();
    await processTelemetryRules(value);
    // 3. Return success
    return res.status(201).json({ message: 'Telemetry ingested successfully', eventId: value.eventId });
  } catch (err) {
    // Catch duplicate eventId errors (MongoDB error code 11000)
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate Event', details: 'eventId already exists' });
    }
    console.error('Ingestion Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { ingestTelemetry };