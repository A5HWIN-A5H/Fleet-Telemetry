const request = require('supertest');
const app = require('../../src/app');
const Alert = require('../../src/storage/models/Alert');

describe('Pipeline - Rule Engine Integration', () => {
  it('should trigger a speeding alert for exactly 121 km/h, but not 120 km/h', async () => {
    // 1. Send an event exactly on the boundary limit (120 km/h)
    await request(app).post('/api/telemetry').send({
      eventId: 'rule-evt-1', vehicleId: 'veh-rule-01', timestamp: new Date().toISOString(),
      location: { lat: 12.9, lng: 77.5 }, speedKmh: 120, fuelLevelPercent: 50, engineStatus: 'on'
    });

    let alerts = await Alert.find({ vehicleId: 'veh-rule-01' });
    expect(alerts.length).toBe(0); // Should NOT trigger

    // 2. Send an event just over the boundary limit (121 km/h)
    await request(app).post('/api/telemetry').send({
      eventId: 'rule-evt-2', vehicleId: 'veh-rule-01', timestamp: new Date().toISOString(),
      location: { lat: 12.9, lng: 77.5 }, speedKmh: 121, fuelLevelPercent: 50, engineStatus: 'on'
    });

    alerts = await Alert.find({ vehicleId: 'veh-rule-01' });
    expect(alerts.length).toBe(1); // Should trigger exactly once
    expect(alerts[0].type).toBe('speeding');
  });
});