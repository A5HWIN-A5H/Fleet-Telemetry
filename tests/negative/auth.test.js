const request = require('supertest');
const app = require('../../src/app');

describe('Authentication & Middleware Security', () => {
  it('should reject access to /alerts if no token is provided', async () => {
    const response = await request(app).get('/api/alerts/veh-sim-01');
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Access denied. No token provided.');
  });

  it('should reject access to /alerts if an invalid token is provided', async () => {
    const response = await request(app)
      .get('/api/alerts/veh-sim-01')
      .set('Authorization', 'Bearer someFakeGarbageToken123');
      
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid or expired token.');
  });

  it('should issue a valid token on successful login', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'fleet_admin', password: 'securepassword123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});