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
articleRoutes.get('/article/:id', ArticleController.getArticle);

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

export default articleRoutes;
