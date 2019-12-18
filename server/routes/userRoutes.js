import express from 'express';
import UserController from '../controllers/userController';
import * as validator from '../middleware/validateUser';

const userRoutes = express.Router();

// Create user
userRoutes.post('/user',
  validator.createUser,
  validator.validationHandler,
  validator.validateEmail,
  validator.validateUserName,
  UserController.createUser);

// Verify user
userRoutes.get('/user/verification', UserController.verifyUser);

// Login user
userRoutes.post('/user/login', validator.validateEmailPassword, validator.confirmEmail, UserController.loginUser)

export default userRoutes;
