import dotenv from 'dotenv';
import cryptoRandomString from 'crypto-random-string';
import { userService } from '../services/userService';
import { verificationService } from '../services/verifyService';
import Helpers from '../utils/helpers';
import verifyEmailMarkup from '../utils/markups/verifyEmail';
import models from '../database/models';

const { VerificationToken } = models;

dotenv.config();

const website = process.env.WEBSITE;
const host = process.env.HOST;

/**
 * @class UserController
 */
export default class UserController {
  /**
   * @method createUser
   * @description create user
   * @param {*} req
   * @param {*} res
   * @returns {object} created user
   */
  static async createUser(req, res) {
    try {
      const { body } = req;
      const hashedPassword = Helpers.hashPassword(body.password);
      body.password = hashedPassword;
      delete body.verified;
      const user = await userService.create(body);

      delete user.dataValues.password;

      const { id, email, userName } = user;
      const verificationToken = cryptoRandomString({
        length: 15,
        type: 'base64'
      });
      const { token } = await verificationService.create({
        userId: id,
        token: verificationToken
      });
      const signed = Helpers.generateToken({ email, token });

      Helpers.sendMail(email,
        website,
        'Email Verification',
        'Verify Email',
        verifyEmailMarkup(userName, signed, host));

      return res.status(200).send({
        status: 200,
        message: 'user created sucessfully',
        user
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  /**
   * @method verifyUser
   * @param {*} req
   * @param {*} res
   * @returns {object} verification details
   */
  static async verifyUser(req, res) {
    try {
      const verificationToken = req.query.token;
      const decoded = Helpers.verifyToken(verificationToken);
      const { email, token } = decoded;
      const include = [
        {
          model: VerificationToken,
          as: 'verificationtoken'
        }
      ];
      const user = await userService.find({ email }, include);
      const userToken = user.verificationtoken.token;

      if (userToken !== token) {
        return res.status(403).send({
          status: 403,
          message: 'forbidden'
        });
      }
      await userService.update({ verified: true }, { id: user.id });
      return res.status(200).send({
        status: 200,
        message: 'user verified, log in if you wish'
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  /**
   * @method loginUser
   * @param {*} req
   * @param {*} res
   * @returns {object} login details
   */
  static async loginUser(req, res) {
    const { user } = req;
    const { id, userName } = user.dataValues;
    const { email, password } = req.body;
    const correctCredentials = Helpers.comparePassword(password, user.password);

    if (!correctCredentials) {
      return res.status(403).send({
        status: 403,
        message: 'forbidden'
      });
    }

    const token = Helpers.generateToken({ id, email, userName });
    delete user.dataValues.password;

    return res.status(200).send({
      status: 200,
      message: 'login successful',
      token,
      user
    });
  }

  /**
   * @method getProfile
   * @param {*} req
   * @param {*} res
   * @returns {object} profile
   */
  static async getProfile(req, res) {
    try {
      const { userName } = req.params.userName ? req.params : req;
      const include = [
        { all: true }
      ];
      const user = await userService.find({ userName }, include);

      if (!user) {
        return res.status(401).send({
          status: 401,
          message: 'profile not found',
          user
        });
      }

      delete user.dataValues.password;
      delete user.dataValues.verified;

      return res.status(200).send({
        status: 200,
        message: 'profile found',
        user
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  /**
   * @method updateProfile
   * @param {*} req
   * @param {*} res
   * @returns {object} updated profile
   */
  static async updateProfile(req, res) {
    try {
      const { userId, body } = req;
      const user = await userService.update(body, { id: userId });
      return res.status(200).send({
        status: 200,
        message: 'profile updated successfully',
        user: user[1]
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }
}
