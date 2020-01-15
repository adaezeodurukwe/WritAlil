import express from 'express';
import ArticleController from '../controllers/articleController';
import { validateArticle, validationHandler, authenticate } from '../middleware';
import CommentController from '../controllers/commentController';

const articleRoutes = express.Router();

// Create article
articleRoutes.post('/article',
  authenticate,
  validateArticle.createArticle,
  validationHandler,
  ArticleController.createArticle);

// Get article
articleRoutes.get('/article/:slug', ArticleController.getArticle);

// Update article
articleRoutes.put('/article/:id',
  authenticate,
  validateArticle.confirmArticle,
  validateArticle.UpdateArticle,
  validationHandler,
  ArticleController.updateArticle);

// Delete article
articleRoutes.delete('/article/:id',
  authenticate,
  validateArticle.confirmArticle,
  ArticleController.deleteArticle);

// Get all articles
articleRoutes.get('/articles', ArticleController.getAllArticles);

// Create comment
articleRoutes.post('/comment/:articleId',
  authenticate,
  validateArticle.confirmArticle,
  validateArticle.createComment,
  validationHandler,
  CommentController.createComment);

// Get comments
articleRoutes.get('/comment/:articleId',
  validateArticle.confirmArticle,
  CommentController.getAllArticleComments);

// Update comment
articleRoutes.put('/comment/:id',
  authenticate,
  validateArticle.confirmComment,
  validateArticle.createComment,
  validationHandler,
  CommentController.updateComment);

// Delete comment
articleRoutes.delete('/comment/:id',
  authenticate,
  validateArticle.confirmComment,
  CommentController.deleteComment);

export default articleRoutes;
