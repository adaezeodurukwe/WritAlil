import request from 'supertest';
import app from '../../app';
import Helpers from '../../utils/helpers';
import { userService } from '../../services/userService';
import { followService } from '../../services/followService';

describe('Profile controller', () => {
  let token;
  let token2;
  let userId;
  let userId2;
  beforeAll(async () => {
    const hashedPassword = Helpers.hashPassword('moody');
    const user1 = userService.create({
      firstName: 'adaeze',
      lastName: 'mooden',
      email: 'adaezemooden3@gmail.com',
      password: hashedPassword,
      userName: 'deedee3',
      verified: true
    });
    const user2 = userService.create({
      firstName: 'adaeze',
      lastName: 'mooden',
      email: 'adaezemooden2@gmail.com',
      password: hashedPassword,
      userName: 'deedee2',
      verified: true
    });

    await Promise.all([user1, user2]);
  });

  beforeEach((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'adaezemooden2@gmail.com',
        password: 'moody',
      })
      .expect(200, (err, res) => {
        token = res.body.token;
        userId = res.body.user.id;
        done();
      });
  });

  beforeEach((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'adaezemooden3@gmail.com',
        password: 'moody',
      })
      .expect(200, (err, res) => {
        token2 = res.body.token;
        userId2 = res.body.user.id;
        done();
      });
  });

  it('should follow a user', (done) => {
    request(app)
      .post(`/api/v1/follow/${userId2}`)
      .set('authorization', `Bearer ${token}`)
      .send({})
      .expect(201, (err, res) => {
        expect(res.body.status).toEqual(201);
        expect(res.body.message).toEqual('follow successful');
        done();
      });
  });

  it('should prevent user from following himself', (done) => {
    request(app)
      .post(`/api/v1/follow/${userId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400, (err, res) => {
        expect(res.body.status).toEqual(400);
        expect(res.body.message).toEqual('can\'t follow or unfollow yourself');
        done();
      });
  });

  it('should get all user followers', (done) => {
    request(app)
      .get('/api/v1/followers')
      .set('authorization', `Bearer ${token2}`)
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('followers found');
        done();
      });
  });

  it('should get all user following', (done) => {
    request(app)
      .get('/api/v1/following')
      .set('authorization', `Bearer ${token}`)
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('following found');
        done();
      });
  });

  describe('more tests', () => {
    beforeEach(async () => {
      await followService.create({ userId, followerId: userId2 });
    });

    it('should not follow user that has been previously followed', (done) => {
      request(app)
        .post(`/api/v1/follow/${userId}`)
        .set('authorization', `Bearer ${token2}`)
        .send({})
        .expect(400, (err, res) => {
          expect(res.body.status).toEqual(400);
          expect(res.body.message).toEqual('you already follow this user');
          done();
        });
    });

    it('should unfollow a user', (done) => {
      request(app)
        .delete(`/api/v1/unfollow/${userId}`)
        .set('authorization', `Bearer ${token2}`)
        .expect(200, (err, res) => {
          expect(res.body.status).toEqual(200);
          expect(res.body.message).toEqual('un-follow successful');
          done();
        });
    });
  });
});
