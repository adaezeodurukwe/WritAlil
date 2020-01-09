import express from 'express';
import ArticleController from '../controllers/articleController';
import { validateArticle, validationHandler, authenticate } from '../middleware';

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

// Get comments

// Update comment

// Delete comment

export default articleRoutes;
