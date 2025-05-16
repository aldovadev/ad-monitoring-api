import request from 'supertest';
import app from '../app';

describe('Healthcheck API', () => {
  it('should return 200 OK on root path', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Welcome to Ad Performance Monitoring System API',
      version: '1.0.0',
      documentation: '/docs',
    });
  });
});