import express from 'express';
import UserController from '../controllers/userController';
import { validateUser, validationHandler, authenticate } from '../middleware';


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

// Get profile
userRoutes.get('/user', authenticate, UserController.getProfile);

// Update profile
userRoutes.put('/user',
  authenticate,
  validateUser.updateUser,
  validationHandler,
  UserController.updateProfile)

export default userRoutes;
