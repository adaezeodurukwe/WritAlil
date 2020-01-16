import { body } from 'express-validator';
import { articleService } from '../services/articleService';
import { commentService } from '../services/commentService';
import { favoriteService } from '../services/favoriteService';

const commonOptional = [
  body('description').optional()
    .isLength({ min: 10 })
    .withMessage('Description should be more than ten letters'),
  body('tags').optional()
    .isArray()
    .withMessage('Tags should be an array')
];


const createArticle = [
  body('title', 'Title is missing').exists()
    .isLength({ min: 5 })
    .withMessage('Title should be more than five letters'),

  body('body', 'Body is missing').exists()
    .isLength({ min: 20 })
    .withMessage('Body should be greater than twenty letters'),

  body('category', 'Category is missing').exists()
    .isInt({ min: 1, max: 3 })
    .withMessage('Category must be between 1 and 3'),

  ...commonOptional
];

const UpdateArticle = [
  body('title', 'Title is missing').optional()
    .isLength({ min: 5 })
    .withMessage('Title should be more than five letters'),

  body('body', 'Body is missing').optional()
    .isLength({ min: 20 })
    .withMessage('Body should be greater than twenty letters'),

  body('category', 'Category is missing').optional()
    .isInt({ min: 1, max: 3 })
    .withMessage('Category must be between 1 and 3'),

  ...commonOptional
];

const createComment = [
  body('comment', 'comment is missing').exists()
    .isLength({ min: 5 })
    .withMessage('Comment should be more than five letters'),
];

const confirmArticle = async (req, res, next) => {
  const id = req.params.id || req.params.articleId;
  const article = await articleService.find({ id });
  if (!article) {
    return res.status(400).json({
      status: 400,
      message: 'Article does not exist',
    });
  }
  next();
};

const confirmComment = async (req, res, next) => {
  const { userId, params } = req;
  const { id } = params;
  const comment = await commentService.find({ id });

  if (!comment || (comment.userId !== userId)) {
    return res.status(400).json({
      status: 400,
      message: 'comment does not exist',
    });
  }
  next();
};

const confirmFavorite = async (req, res, next) => {
  const { userId, params } = req;
  const { articleId } = params;
  const favorite = await favoriteService.find({ articleId });

  if (!favorite || (favorite.userId !== userId)) {
    return res.status(400).json({
      status: 400,
      message: 'favorite does not exist',
    });
  }
  next();
};

export {
  confirmArticle,
  confirmComment,
  confirmFavorite,
  createArticle,
  createComment,
  UpdateArticle
};
