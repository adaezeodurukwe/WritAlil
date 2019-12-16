import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import sendGrid from '@sendgrid/mail';

dotenv.config();

const secretKey = process.env.SECRET;

/**
 * @class Helpers
 * @description defines helpers
 */
export default class Helpers {
  /**
   * @method generateToken
   * @description Generate a token from a given payload
   * @param {object} payload The user payload to tokenize
   * @returns {string} JSON Web Token
   */
  static generateToken(payload) {
    return jwt.sign(payload, secretKey);
  }

  /**
   * @method verifyToken
   * @description Verify a token from a given payload
   * @param {object} payload The user payload to tokenize
   * @returns {string} JSON Web Token
   */
  static verifyToken(payload) {
    return jwt.verify(payload, secretKey);
  }


  /**
   * @method hashPassword
   * @description Hashes a users password
   * @param {string} password The users password
   * @returns {string} The resulting hashed password
   */
  static hashPassword(password) {
    const hash = bcrypt.hashSync(password, 8);
    return hash;
  }

  /**
   * @method comparePassword
   * @description Hashes a users password
   * @param {string} password The users password/email
   * @param {string} hash The users hashed password/email
   * @returns {string} The resulting hashed password
   */
  static comparePassword(password, hash) {
    const isPassword = bcrypt.compareSync(password, hash);
    return isPassword;
  }

  /**
   * @description Method that sends emails
   * @param {string} email
   * @param {string} from
   * @param {string} subject
   * @param {string} text
   * @param {string} htmlMarkup
   * @return {undefined}
   */
  static async sendMail(email, from, subject, text, htmlMarkup) {
    try {
      sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
      const message = {
        to: email,
        from,
        subject,
        text,
        html: htmlMarkup
      };
      return sendGrid.send(message);
    } catch (error) {
      return error.response.body;
    }
  }
}
