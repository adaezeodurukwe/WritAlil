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

userRoutes.get('/user/verification', UserController.verifyUser);

export default userRoutes;
