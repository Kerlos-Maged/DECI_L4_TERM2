import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import FileHandler from '../fileHandler';

const request = supertest(app);

describe('API Endpoint Tests', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/images', () => {
    const basePath = '/api/images';

    it('should return 200 for valid filename', async () => {
      const response = await request.get(`${basePath}?filename=fjord`);
      expect(response.status).toBe(200);
    });

    it('should return 200 for valid filename with width and height', async () => {
      const response = await request.get(
        `${basePath}?filename=fjord&width=195&height=350`
      );
      expect(response.status).toBe(200);
    });

    it('should return 200 for invalid width', async () => {
      const response = await request.get(
        `${basePath}?filename=fjord&width=-200&height=6`
      );
      expect(response.status).toBe(200);
    });

    it('should return 200 for request without arguments', async () => {
      const response = await request.get(basePath);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /doesntexist', () => {
    it('should return 404 for non-existing endpoint', async () => {
      const response = await request.get('/doesntexist');
      expect(response.status).toBe(404);
    });
  });
});

afterAll(async () => {
  const resizedImagePath = path.resolve(
    FileHandler.imagesThumbPath,
    'fjord-195x350.jpg'
  );

  try {
    await fs.unlink(resizedImagePath);
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
});
