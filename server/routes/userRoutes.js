import express from 'express';
import UserController from '../controllers/userController';
import FollowController from '../controllers/followController';
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
userRoutes.post('/follow/:id', authenticate, validateUser.validateFollow, FollowController.follow);

// Unfollow user
userRoutes.delete('/unfollow/:id', authenticate, validateUser.validateFollow, FollowController.unFollow);

// Get user followers
userRoutes.get('/followers', authenticate, FollowController.getFollowers);

// Get user following
userRoutes.get('/following', authenticate, FollowController.getFollowing);

export default userRoutes;
