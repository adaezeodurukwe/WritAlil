import request from 'supertest';
import app from '../../app';

describe('userController', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/api/v1/user')
      .send({
        firstName: 'boom',
        lastName: 'moole',
        email: 'moolef@gmail.com',
        password: 'mood',
        userName: 'fmoole'
      })
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        done();
      });
  });
  it('should not create user with incorrect credentials', (done) => {
    request(app)
      .post('/api/v1/user')
      .send({
        firstName: 'b',
        lastName: 'm',
        email: 'moolef@gmail.com',
        password: 'ood',
        userName: 'fmoole'
      })
      .expect(400, (err, res) => {
        expect(res.body.status).toEqual(400);
        done();
      });
  });
  it('should not create user with already existing email', (done) => {
    request(app)
      .post('/api/v1/user')
      .send({
        firstName: 'boombie',
        lastName: 'mooleed',
        email: 'moolef@gmail.com',
        password: 'moody',
        userName: 'fmooled'
      })
      .expect(409, (err, res) => {
        expect(res.body.status).toEqual(409);
        done();
      });
  });
  it('should not create user with already existing usenName', (done) => {
    request(app)
      .post('/api/v1/user')
      .send({
        firstName: 'boombie',
        lastName: 'mooleed',
        email: 'moolefood@gmail.com',
        password: 'moody',
        userName: 'fmoole'
      })
      .expect(409, (err, res) => {
        expect(res.body.status).toEqual(409);
        done();
      });
  });
});
