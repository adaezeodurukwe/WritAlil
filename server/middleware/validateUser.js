import { body, param } from 'express-validator';
import { userService } from '../services/userService';

const validateEmailPassword = [
  body('email', 'Email is missing').exists().isEmail().withMessage('Invalid email'),
  body('password', 'Password is missing').exists().isLength({ min: 2 }).withMessage('Password must contain more than 4 characters')
];

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
  
  body('bioImage').optional()
    .isURL()
    .withMessage('bioImage must be a URL'),

  ...validateEmailPassword
];

const updateUser = [
  body('firstName').optional()
    .isAlpha()
    .withMessage('Firstname must contain only alphabets')
    .isLength({ min: 2 })
    .withMessage('Firstname should be greater than two letters'),

  body('lastName').optional()
    .isAlpha()
    .withMessage('Lastname must contain only alphabets')
    .isLength({ min: 2 })
    .withMessage('Lastname should be greater than two letters'),

  body('userName').optional()
    .isAlphanumeric()
    .withMessage('Username must contain only alphabets')
    .isLength({ min: 3 })
    .withMessage('Username should be greater than three letters'),

  body('bioImage').optional()
    .isURL()
    .withMessage('bioImage must be a URL')
]

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

const confirmEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.find({ email });
  if (!user) {
    const error = new customErrorObject(email, 'User doesn\'t exist', 'email', 'body');
    return res.status(400).json({
      status: 400,
      message: 'Bad Request',
      errors: [error] });
  }
  if (!user.verified) {
    const error = new customErrorObject(email, 'Please verify your email, it\'s really easy', 'email', 'body');
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
      errors: [error] });
  }

  req.user = user;
  return next();
};

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

export {
  createUser,
  confirmEmail,
  validateEmail,
  validateUserName,
  updateUser,
  validateEmailPassword
};
