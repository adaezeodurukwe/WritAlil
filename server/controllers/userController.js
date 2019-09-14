import { userService } from '../services/userService';

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
    const { body } = req;
    const user = await userService.create(body);
    return res.status(200).send({
      status: 200,
      message: 'user created sucessfully',
      user
    });
  }
}
