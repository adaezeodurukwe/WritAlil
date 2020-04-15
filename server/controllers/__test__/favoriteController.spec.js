import request from 'supertest';
import app from '../../app';
import { articleService } from '../../services/articleService';
import { favoriteService } from '../../services/favoriteService';

describe('Favorites test', () => {
  let token = '';
  let articleId;
  let article1Id;
  let userId;
  beforeAll((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'deedee@gmail.com',
        password: 'mood'
      })
      .expect(200, (err, res) => {
        token = res.body.token;
        userId = res.body.user.id;
        done();
      });
  });

  beforeEach(async () => {
    const article = await articleService.create({
      userId,
      title: 'blessed are you boo',
      slug: 'blessed-are-you-boo-1000',
      description: 'I said blessed are you',
      body: "i'd use lorem ispium for this but hey, here we are",
      category: 3
    });
    articleId = article.id;
    const article1 = await articleService.create({
      userId,
      title: 'blessed are you boo',
      slug: 'blessed-are-you-boo-10000',
      description: 'I said blessed are you',
      body: "i'd use lorem ispium for this but hey, here we are",
      category: 3
    });
    article1Id = article1.id;
    await favoriteService.create({
      userId,
      articleId
    });
  });

  it('should create a favorite', (done) => {
    request(app)
      .post(`/api/v1/favorite/${article1Id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(201, (err, res) => {
        expect(res.body.status).toEqual(201);
        expect(res.body.message).toEqual('article added to favorites');
        done();
      });
  });

  it('should not create a favorite when it has been created by the same user', (done) => {
    request(app)
      .post(`/api/v1/favorite/${articleId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(201, (err, res) => {
        expect(res.body.status).toEqual(400);
        expect(res.body.message).toEqual('article already added to favorites');
        done();
      });
  });

  it('should list all favorite articles given page and limit', (done) => {
    request(app)
      .get('/api/v1/favorite?limit=1&page=1')
      .set('authorization', `Bearer ${token}`)
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('favorite articles');
        done();
      });
  });

  it('should delete a favorite', (done) => {
    request(app)
      .delete(`/api/v1/favorite/${articleId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('favorite deleted successfully');
        done();
      });
  });
});
