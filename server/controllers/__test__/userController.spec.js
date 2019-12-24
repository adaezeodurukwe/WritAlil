import request from 'supertest';
import cryptoRandomString from 'crypto-random-string';
import app from '../../app';
import { userService } from '../../services/userService';
import Helpers from '../../utils/helpers';
import { verificationService } from '../../services/verifyService';
import sendGrid from '@sendgrid/mail';


const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vb2xlZWVmQGdtYWlsLmNvbSIsInRva2VuIjoiWUc2RUVLNnRwdktNWTYiLCJpYXQiOjE1NzY0MzAyMjh9.UQi7pR-6cIggaM_5725QU3u9f6O5O3B1VPp8pEYhkgc';

describe('userController', () => {
  const mailSpy = jest.spyOn(sendGrid, 'send');
  mailSpy.mockResolvedValue();
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
        email: 'mooleefood@gmail.com',
        password: 'moody',
        userName: 'fmoole'
      })
      .expect(409, (err, res) => {
        expect(res.body.status).toEqual(409);
        done();
      });
  });
  describe('Verify Email', () => {
    let signed;
    beforeEach(async () => {
      const user = await userService.create({
        firstName: 'boomie',
        lastName: 'moolle',
        email: 'mooleeef@gmail.com',
        password: 'mood',
        userName: 'fmoollee'
      });
      const { id, email } = user;
      const verificationToken = cryptoRandomString({ length: 15, type: 'base64' });
      const { token } = await verificationService.create({ userId: id, token: verificationToken });
      signed = Helpers.generateToken({ email, token });
    });
    it('should verify a user', (done) => {
      request(app)
        .get(`/api/v1/user/verification?token=${signed}`)
        .expect(200, (err, res) => {
          expect(res.body.status).toEqual(200);
          done();
        });
    });
    it('Should throw an error when there is a token mismatch', (done) => {
      request(app)
        .get(`/api/v1/user/verification?token=${signed}`)
        .expect(403, (err, res) => {
          expect(res.body.status).toEqual(403);
          expect(res.body.message).toEqual('forbidden');
          done();
        });
    });
    it('Should catch server errors', (done) => {
      request(app)
        .get(`/api/v1/user/verification?token=${wrongToken}`)
        .expect(500, (err, res) => {
          expect(res.body.status).toEqual(500);
          expect(res.body.message).toEqual('something went wrong');
          done();
        });
    });
  });
});

describe('User Login', () => {
  let activeUser;
  beforeAll(async() => {
    const hashedPassword = Helpers.hashPassword('moody');
    await userService.create({
      firstName: 'bumni',
      lastName: 'mooden',
      email: 'moolefjonah@gmail.com',
      password: hashedPassword,
      userName: 'jonahB',
      verified: true
    });

    await userService.create({
      firstName: 'bumni',
      lastName: 'mooden',
      email: 'moolefjonahVictor@gmail.com',
      password: hashedPassword,
      userName: 'jonahVictor',
    });
  })

  it('Should log a user in successfully', (done) => {
    request(app)
    .post('/api/v1/user/login')
    .send({
      email: 'moolefjonah@gmail.com',
      password: 'moody',
    })
    .expect(200, (err, res) => {
      expect(res.body.status).toEqual(200);
      expect(res.body.message).toEqual('login successfull')
      done();
    });
  })

  it('Should not log a user in if password is wrong', (done) => {
    request(app)
    .post('/api/v1/user/login')
    .send({
      email: 'moolefjonah@gmail.com',
      password: 'mood',
    })
    .expect(403, (err, res) => {
      expect(res.body.status).toEqual(403);
      expect(res.body.message).toEqual('forbidden')
      done();
    });
  })

  it('Should not log a user in if password is wrong', (done) => {
    request(app)
    .post('/api/v1/user/login')
    .send({
      email: 'moolefjonahVictor@gmail.com',
      password: 'mood',
    })
    .expect(401, (err, res) => {
      expect(res.body.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized')
      done();
    });
  })

  it('Should throw error if user does not exist', (done) => {
    request(app)
    .post('/api/v1/user/login')
    .send({
      email: 'moolefjonahV@gmail.com',
      password: 'mood',
    })
    .expect(400, (err, res) => {
      expect(res.body.status).toEqual(400);
      expect(res.body.message).toEqual('Bad Request')
      done();
    });
  })
});
