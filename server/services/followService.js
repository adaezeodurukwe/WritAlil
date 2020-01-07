import models from '../database/models';
import BaseService from './baseService';

const { Follow } = models;

/**
 * @class UserService
 */
export default class FollowService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Follow);
  }
}

export const followService = new FollowService();
