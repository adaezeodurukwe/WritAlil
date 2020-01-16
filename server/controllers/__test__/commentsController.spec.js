import request from 'supertest';
import app from '../../app';
import { articleService } from '../../services/articleService';
import { commentService } from '../../services/commentService';

describe('Comments test', () => {
  let token = '';
  let articleId;
  let commentId;
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
      slug: 'blessed-are-you-boo-10',
      description: 'I said blessed are you',
      body: "i'd use lorem ispium for this but hey, here we are",
      category: 3
    });
    articleId = article.id;

    const comment = await commentService.create({
      articleId,
      userId,
      comment: 'suckers'
    });
    commentId = comment.id;
  });

  it('should create a comment', (done) => {
    request(app)
      .post(`/api/v1/comment/${articleId}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: 'jiji.ng'
      })
      .expect(201, (err, res) => {
        expect(res.body.status).toEqual(201);
        expect(res.body.message).toEqual('comment created successfully');
        done();
      });
  });

  it('should not create a comment when comment is invalid', (done) => {
    request(app)
      .post(`/api/v1/comment/${articleId}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: ''
      })
      .expect(400, (err, res) => {
        expect(res.body.status).toEqual(400);
        done();
      });
  });

  it('should modify a comment', (done) => {
    request(app)
      .put(`/api/v1/comment/${commentId}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: 'jiji2.ng'
      })
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('comment updated successfully');
        done();
      });
  });

  it('should list all article comments', (done) => {
    request(app)
      .get(`/api/v1/comment/${articleId}`)
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('article comments');
        done();
      });
  });

  it('should list all article comments given page and limit', (done) => {
    request(app)
      .get(`/api/v1/comment/${articleId}?limit=1&page=1`)
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('article comments');
        done();
      });
  });

  it('should delete a comment', (done) => {
    request(app)
      .delete(`/api/v1/comment/${commentId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200, (err, res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('comment deleted successfully');
        done();
      });
  });
});
