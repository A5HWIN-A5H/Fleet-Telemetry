const request = require('supertest');
const app = require('../../src/app');

describe('Application Health Check', () => {
  it('should return a 200 OK status on the /health endpoint', async () => {
    // Act: Send a GET request to the /health route
    const response = await request(app).get('/health');
    
    // Assert: Verify the status code and response body
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message', 'API is running');
  });
});