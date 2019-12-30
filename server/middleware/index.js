import { validationResult } from 'express-validator';
import * as validateArticle from './validateArticle';
import * as validateUser from './validateUser';
import authenticate from './authenticate';

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: 'Bad request',
      errors: errors.array()
    });
  }
  return next();
};

export {
  validationHandler,
  validateArticle,
  validateUser,
  authenticate
};
