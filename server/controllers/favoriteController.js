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

      const [, isNewEntry] = await favoriteService.findOrCreate({ userId, articleId });
      if (!isNewEntry) {
        return res.status(400).send({
          status: 400,
          message: 'article already added to favorites'
        });
      }
      return res.status(201).send({
        status: 201,
        message: 'article added to favorites'
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
      let { page, limit } = req.query;
      if (!(page && limit)) {
        page = 1;
        limit = 10;
      }
      const { userId } = req;
      const include = [
        {
          model: Article,
          include: [
            { model: User, attributes: ['firstName', 'lastName', 'userName'] }
          ]
        }
      ];
      const offset = limit * (page - 1);
      const favorites = await favoriteService.findAll({ userId }, include, limit, offset);

      return res.status(200).send({
        status: 200,
        message: 'favorite articles',
        favorites,
        page,
        limit
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
