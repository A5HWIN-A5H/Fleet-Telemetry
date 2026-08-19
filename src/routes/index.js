const express = require('express');
const router = express.Router();
const { ingestTelemetry } = require('../ingestion/telemetry.controller');
const { getVehicleAlerts, getVehicleTelemetry } = require('../alerts/alerts.controller');
const { login } = require('../auth/auth.controller');
const { verifyToken } = require('../auth/auth.middleware');

// Auth Endpoints
router.post('/login', login);

// Ingestion Endpoints (Open for vehicle streaming)
router.post('/telemetry', ingestTelemetry);

// Query Endpoints (Protected for fleet operators only)
router.get('/alerts/:vehicleId', verifyToken, getVehicleAlerts);
router.get('/telemetry/:vehicleId', verifyToken, getVehicleTelemetry);

module.exports = router;