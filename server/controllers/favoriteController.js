import models from '../database/models';
import { favoriteService } from '../services/favoriteService';

const { Article, User } = models;

/**
 * @class CommentController
 */
export default class FavoriteController {
  /**
   * @method createFavorite
   * @param {object} req
   * @param {object} res
   * @returns {object} created Favorite
   */
  static async createFavorite(req, res) {
    try {
      const { userId, params } = req;
      const { articleId } = params;

      await favoriteService.create({ userId, articleId });

      return res.status(201).send({
        status: 201,
        message: 'article added to favorites',
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
   * @method getAllUserFavorites
   * @param {object} req
   * @param {object} res
   * @returns {object} favorite articles
   */
  static async getAllUserFavorites(req, res) {
    try {
      const { page, limit } = req.query;
      const { userId } = req;
      let additionalData = {};
      const include = [
        {
          model: Article,
          include: [{ model: User, attributes: ['firstName', 'lastName', 'userName'] }]
        }
      ];
      let favorites;

      if (!(page && limit)) {
        favorites = await favoriteService.findAll({ userId }, include);
      } else {
        const offset = limit * (page - 1);
        favorites = await favoriteService.findAll({ userId }, include, limit, offset);
        additionalData = { page, limit };
      }

      return res.status(200).send({
        status: 200,
        message: 'favorite articles',
        favorites,
        ...additionalData
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
   * @method deleteFavorite
   * @param {object} req
   * @param {object} res
   * @returns {object} delete success
   */
  static async deleteFavorite(req, res) {
    try {
      const { userId, params } = req;
      const { id } = params;

      favoriteService.delete({ id, userId });

      return res.status(200).send({
        status: 200,
        message: 'favorite deleted successfully'
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
