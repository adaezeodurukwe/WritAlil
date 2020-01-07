import express from 'express';
import UserController from '../controllers/userController';
import ProfileController from '../controllers/profileController';
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
  UserController.updateProfile);

// Follow user
userRoutes.post('follow/:id', authenticate, ProfileController.follow);

// Unfollow user
userRoutes.delete('unfollow/:id', authenticate, ProfileController.unFollow);

// Get user followers
userRoutes.get('followers', authenticate, ProfileController.getFollowers);

// Get user following
userRoutes.get('following', authenticate, ProfileController.getFollowing)

export default userRoutes;
