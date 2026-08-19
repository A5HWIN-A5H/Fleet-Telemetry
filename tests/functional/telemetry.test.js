const request = require('supertest');
const app = require('../../src/app');
const TelemetryEvent = require('../../src/storage/models/TelemetryEvent');

describe('POST /api/telemetry - Functional Tests', () => {
  it('should successfully ingest a valid telemetry event', async () => {
    const validPayload = {
      eventId: 'evt-100',
      vehicleId: 'veh-001',
      timestamp: new Date().toISOString(),
      location: { lat: 12.9716, lng: 77.5946 },
      speedKmh: 85,
      fuelLevelPercent: 60,
      engineStatus: 'on'
    };

    // Act: Send POST request
    const response = await request(app).post('/api/telemetry').send(validPayload);
    
    // Assert: Check API response
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('eventId', 'evt-100');

    // Assert: Verify it actually saved in the in-memory database
    const dbEvent = await TelemetryEvent.findOne({ eventId: 'evt-100' });
    expect(dbEvent).not.toBeNull();
    expect(dbEvent.speedKmh).toBe(85);
  });
});