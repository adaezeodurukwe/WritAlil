import { body, validationResult } from 'express-validator';
import { userService } from '../services/userService';

const createUser = [
  body('firstName', 'Firstname is missing').exists()
    .isAlpha()
    .withMessage('Firstname must contain only alphabets')
    .isLength({ min: 2 })
    .withMessage('Firstname should be greater than two letters'),

  body('lastName', 'Lastname is missing').exists()
    .isAlpha()
    .withMessage('Lastname must contain only alphabets')
    .isLength({ min: 2 })
    .withMessage('Lastname should be greater than two letters'),

  body('userName', 'Username is missing').exists()
    .isAlphanumeric()
    .withMessage('Username must contain only alphabets')
    .isLength({ min: 3 })
    .withMessage('Username should be greater than three letters'),

  body('email', 'Email is missing').exists().isEmail().withMessage('Invalid email'),
  body('password', 'Password is missing').exists().isLength({ min: 2 }).withMessage('Password must contain more than 4 characters')
];

/**
 * @param {*} value
 * @param {*} msg
 * @param {*} param
 * @param {*} location
 * @returns {object} custom error object
 */
function customErrorObject(value, msg, param, location) {
  this.value = value;
  this.msg = msg;
  this.param = param;
  this.location = location;
}

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await userService.find({ email });
  if (existingUser) {
    const error = new customErrorObject(email, 'User already exist', 'email', 'body');
    return res.status(409).json({
      status: 409,
      message: 'Conflict',
      errors: [error] });
  }
  return next();
};

const validateUserName = async (req, res, next) => {
  const { userName } = req.body;
  const existingUser = await userService.find({ userName });
  if (existingUser) {
    const error = new customErrorObject(userName, 'Username already exist', 'userName', 'body');
    return res.status(409).json({
      status: 409,
      message: 'Conflict',
      errors: [error] });
  }
  return next();
};

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
  createUser,
  validateEmail,
  validateUserName,
  validationHandler
};