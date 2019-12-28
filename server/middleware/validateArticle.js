import { body } from 'express-validator';
import { articleService } from '../services/articleService';

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

const confirmArticle = (req, res, next) => {
  const { id } = req.params;
  const article = articleService.find({ id });
  if (!article) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request',
    });
  }

  next();
};

export {
  confirmArticle,
  createArticle,
  UpdateArticle
};
