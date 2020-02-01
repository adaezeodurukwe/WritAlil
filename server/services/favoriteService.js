import models from '../database/models';
import BaseService from './baseService';

const { Favorite } = models;

/**
 * @class FavoriteService
 */
export default class FavoriteService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Favorite);
  }
}

export const favoriteService = new FavoriteService();
