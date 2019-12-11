import dotenv from 'dotenv';
import cryptoRandomString from 'crypto-random-string';
import { userService } from '../services/userService';
import { verificationService } from '../services/verifyService';
import Helpers from '../utils/helpers';
import verifyEmailMarkup from '../utils/markups/verifyEmail';

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

      const user = await userService.create(body);
      const { id, email, userName } = user;
      const verificationToken = cryptoRandomString({ length: 15, type: 'base64' });
      const { token } = await verificationService.create({ userId: id, token: verificationToken });
      const signed = Helpers.generateToken({ email, token });

      Helpers.sendMail(email,
        website,
        'Email Verification',
        'Verify Email',
        verifyEmailMarkup(userName, signed, host));

      delete user.password;

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

  // Create verification function

  // User Login function
}
