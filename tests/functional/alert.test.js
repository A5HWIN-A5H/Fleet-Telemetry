const request = require('supertest');
const app = require('../../src/app');
const Alert = require('../../src/storage/models/Alert');
const jwt = require('jsonwebtoken');

describe('GET Query Endpoints - Functional Tests', () => {
  let token;

  // Generate a valid token before running these tests
  beforeAll(() => {
    token = jwt.sign({ role: 'operator' }, process.env.JWT_SECRET);
  });

  it('should retrieve alerts for a specific vehicle', async () => {
    const mockAlert = new Alert({
      alertId: 'alert-123',
      vehicleId: 'veh-query-01',
      type: 'low_fuel',
      eventId: 'evt-001',
      details: 'Fuel at 10%'
    });
    await mockAlert.save();

    // Attach the Authorization header to bypass the security middleware
    const response = await request(app)
      .get('/api/alerts/veh-query-01')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.data[0].alertId).toBe('alert-123');
  });

  it('should return an empty array and count 0 for a vehicle with no alerts', async () => {
    // Attach the token here as well
    const response = await request(app)
      .get('/api/alerts/veh-clean-01')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(0);
  });
});