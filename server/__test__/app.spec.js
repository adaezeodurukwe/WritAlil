import request from 'supertest';
import app from '../app';

describe('Entry point', () => {
  it('Should return welcome message', (done) => {
    request(app)
      .get('/')
      .expect(200, (err, res) => {
        const { body } = res;
        expect(body).toHaveProperty('message');
        done();
      });
  });
});
