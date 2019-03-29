const request = require('supertest');
const app = require('../server/app.js');

describe('Test the root path', () => {
  test('It should respond with status of 200', () => {
    request(app).get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
