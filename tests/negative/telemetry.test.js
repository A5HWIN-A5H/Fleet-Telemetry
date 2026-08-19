const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/telemetry - Negative & Edge Cases', () => {
  const basePayload = {
    eventId: 'evt-999',
    vehicleId: 'veh-002',
    timestamp: new Date().toISOString(),
    location: { lat: 12.9716, lng: 77.5946 },
    speedKmh: 50,
    fuelLevelPercent: 100,
    engineStatus: 'on'
  };

  it('should reject a payload with a negative speed boundary condition', async () => {
    const badPayload = { ...basePayload, speedKmh: -10 };
    const response = await request(app).post('/api/telemetry').send(badPayload);
    
    expect(response.status).toBe(400);
    expect(response.body.details).toMatch(/speedKmh/);
  });

  it('should reject an invalid engine status (not on/off/idle)', async () => {
    const badPayload = { ...basePayload, engineStatus: 'broken' };
    const response = await request(app).post('/api/telemetry').send(badPayload);
    
    expect(response.status).toBe(400);
  });

  it('should return a 409 Conflict if the exact same eventId is sent twice', async () => {
    // Send it the first time (should succeed)
    await request(app).post('/api/telemetry').send(basePayload);
    
    // Send it the second time (should fail with 409)
    const response = await request(app).post('/api/telemetry').send(basePayload);
    
    expect(response.status).toBe(409);
    expect(response.body.error).toBe('Duplicate Event');
  });
});