import express from 'express';
import UserController from '../controllers/userController';
import { validateUser, validationHandler } from '../middleware';


const userRoutes = express.Router();

// Create user
userRoutes.post('/user',
  validateUser.createUser,
  validationHandler,
  validateUser.validateEmail,
  validateUser.validateUserName,
  UserController.createUser);

// Verify user
userRoutes.get('/user/verification', UserController.verifyUser);

// Login user
userRoutes.post('/user/login',
  validateUser.validateEmailPassword,
  validateUser.confirmEmail,
  UserController.loginUser);

export default userRoutes;
