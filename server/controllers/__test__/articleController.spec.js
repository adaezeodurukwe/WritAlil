import request from 'supertest';
import app from '../../app';
import Helpers from '../../utils/helpers';
import { userService } from '../../services/userService';
import { articleService } from '../../services/articleService';


describe('Article Controller', () => {
  let token = '';
  let articleId;
  beforeAll(async () => {
    const hashedPassword = Helpers.hashPassword('moody');
    await userService.create({
      firstName: 'adaeze',
      lastName: 'mooden',
      email: 'adaezemooden@gmail.com',
      password: hashedPassword,
      userName: 'deedee',
      verified: true
    });
  });

  beforeEach((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'adaezemooden@gmail.com',
        password: 'moody',
      })
      .expect(200, (err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('Create article', () => {
    it('should create a new article', (done) => {
      request(app)
        .post('/api/v1/article')
        .set('authorization', `Bearer ${token}`)
        .send({
          title: 'blessed are you boo',
          description: 'I said blessed are you',
          body: "i'd use lorem ispium for this but hey, here we are",
          category: 3,
        })
        .expect(201, (err, res) => {
          expect(res.body.status).toEqual(201);
          expect(res.body.message).toEqual('article created successfully');
          done();
        });
    });
  })

  describe('Read, update article', () => {
    beforeEach(async () => {
      const { id } = await articleService.create({
        title: 'blessed are thouzy',
        description: 'I said blessed you are',
        slug: 'blessed-are-thouzy',
        body: "i'd use lorem ispium for this but hey, here we are",
        category: 3,
      });
      articleId = id;
    });
    it('should get an article by id', (done) => {
      request(app)
        .get(`/api/v1/article/${articleId}`)
        .expect(200, (err, res) => {
          expect(res.body.status).toEqual(200);
          expect(res.body.message).toEqual('article found')
          done();
        });
    });

    it('should update an article by id', (done) => {
      request(app)
        .put(`/api/v1/article/${articleId}`)
        .set('authorization', `Bearer ${token}`)
        .send({
          title: 'blessed are you boo eehh',
          description: 'I said blessed are you',
          body: "i'd use lorem ispium for this but hey, here we are",
        })
        .expect(200, (err, res) => {
          expect(res.body.status).toEqual(200);
          expect(res.body.message).toEqual('article updated successfully')
          done();
        });
    })
  });

  describe('delete article', () => {
    beforeEach(async () => {
      const { id } = await articleService.create({
        title: 'blessed girl',
        description: 'I said blessed you are',
        slug: 'blessed-girl',
        body: "i'd use lorem ispium for this but hey, here we are",
        category: 3,
      });
      articleId = id;
    });
    it('should get an article by id', (done) => {
      request(app)
        .delete(`/api/v1/article/${articleId}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200, (err, res) => {
          expect(res.body.status).toEqual(200);
          expect(res.body.message).toEqual('article deleted successfully')
          done();
        });
    });
    it('should return not found error with non-existent id', (done) => {
      request(app)
        .delete('/api/v1/article/9000')
        .set('authorization', `Bearer ${token}`)
        .expect(400, (err, res) => {
          expect(res.body.status).toEqual(400);
          done();
        });
    });
  });
});
