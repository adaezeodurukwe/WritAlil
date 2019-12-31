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

// Get current user
userRoutes.get('/user', authenticate, UserController.getProfile);

// Get profile
userRoutes.get('/profile/:userName', authenticate, UserController.getProfile);

// Update profile
userRoutes.put('/user',
  authenticate,
  validateUser.updateUser,
  validationHandler,
  UserController.updateProfile)

export default userRoutes;
