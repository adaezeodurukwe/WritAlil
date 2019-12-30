import request from 'supertest';
import app from '../../app';

describe('Article Controller', () => {
  beforeAll(() => {});
  it('should create a new article', (done) => {
    request(app)
      .post('/api/v1/article')
      .send({
        title: 'blessed are you boo',
        description: 'I said blessed are you',
        body: "i'd use lorem ispium for this but hey, here we are",
        category: 3,
      })
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        done();
      });
  });
});
