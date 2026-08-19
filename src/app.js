const express = require('express');
const app = express();
const routes = require('./routes');


// Middleware to parse incoming JSON payloads (crucial for telemetry data)
app.use(express.json());


// A simple health check route to verify the API is up
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

app.use('/api', routes);


// We will mount the telemetry and auth routes here later

module.exports = app;