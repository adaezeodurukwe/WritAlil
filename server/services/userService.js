import models from '../database/models';
import BaseService from './baseService';

const { User } = models;

/**
 * @class UserService
 */
export default class UserService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(User);
  }
}

export const userService = new UserService();
