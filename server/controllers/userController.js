import dotenv from "dotenv";
import cryptoRandomString from "crypto-random-string";
import { userService } from "../services/userService";
import { verificationService } from "../services/verifyService";
import Helpers from "../utils/helpers";
import verifyEmailMarkup from "../utils/markups/verifyEmail";
import models from "../database/models";

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

      const user = await userService.create(body);
      delete user.dataValues.password;

      const { id, email, userName } = user;
      const verificationToken = cryptoRandomString({
        length: 15,
        type: "base64"
      });
      const { token } = await verificationService.create({
        userId: id,
        token: verificationToken
      });
      const signed = Helpers.generateToken({ email, token });

      Helpers.sendMail(
        email,
        website,
        "Email Verification",
        "Verify Email",
        verifyEmailMarkup(userName, signed, host)
      );

      return res.status(200).send({
        status: 200,
        message: "user created sucessfully",
        user
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "something went wrong",
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
          as: "verificationtoken"
        }
      ];
      const user = await userService.find({ email }, include);
      const userToken = user.verificationtoken.token;

      if (userToken !== token) {
        return res.status(403).send({
          status: 403,
          message: "forbidden"
        });
      }
      await userService.updateRecord({ verified: true }, { id: user.id });
      return res.status(200).send({
        status: 200,
        message: "user verified, log in if you wish"
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "something went wrong",
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
    const { id } = user.dataValues;
    const { email, password } = req.body;
    const correctCredentials = Helpers.comparePassword(password, user.password);

    if (!correctCredentials) {
      return res.status(403).send({
        status: 403,
        message: "forbidden"
      });
    }

    const token = Helpers.generateToken({ id, email });
    delete user.dataValues.password;

    return res.status(200).send({
      status: 200,
      message: "login successfull",
      token,
      user
    });
  }
}
