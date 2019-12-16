import models from '../database/models';
import BaseService from './baseService';

const { VerificationToken } = models;

/**
 * @class UserService
 */
export default class VerificationService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(VerificationToken);
  }
}

export const verificationService = new VerificationService();
