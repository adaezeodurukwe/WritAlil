import { articleService } from '../services/articleService';
import models from '../database/models';

const { User } = models;

/**
 * @class ArticleController
 */
export default class ArticleController {
  /**
   * @method createArticle
   * @param {object} req
   * @param {object} res
   * @returns {object} created article
   */
  static async createArticle(req, res) {
    try {
      const { userId, body } = req;
      const slug = await ArticleController.createArticleSlug(body.title);
      body.slug = slug;
      body.userId = userId;
      const article = await articleService.create(body);
      const newSlug = article.slug.concat(`-${article.id}`);
      await articleService.update({ slug: newSlug }, { id: article.id });

      article.dataValues.slug = newSlug;

      return res.status(201).send({
        status: 201,
        message: 'article created successfully',
        article
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
   * @method createArticleSlug
   * @param {string} title
   * @returns {string} slug
   */
  static async createArticleSlug(title) {
    const titleToLowerCase = title.toLowerCase();
    const slug = titleToLowerCase.split(' ').join('-');
    return slug;
  }

  /**
   * @method getArticle
   * @param {object} req
   * @param {object} res
   * @returns {object} article
   */
  static async getArticle(req, res) {
    try {
      const { slug } = req.params;
      const article = await articleService.find({ slug });

      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'article not found'
        });
      }

      return res.status(200).send({
        status: 200,
        message: 'article found',
        article
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
   * @method getAllArticles
   * @param {object} req
   * @param {object} res
   * @returns {object} articles
   */
  static async getAllArticles(req, res) {
    try {
      const { page, limit } = req.query;
      let additionalData = {};
      const include = [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'userName']
        }
      ];
      let articles;

      if (!(page && limit)) {
        articles = await articleService.findAll(include);
      } else {
        const offset = limit * (page - 1);
        articles = await articleService.findAll(include, limit, offset);
        additionalData = { page, limit };
      }

      return res.status(200).send({
        status: 200,
        message: 'here are your articles',
        articles,
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
   * @method updateArticle
   * @param {object} req
   * @param {object} res
   * @returns {object} updated article
   */
  static async updateArticle(req, res) {
    try {
      const { userId, body } = req;
      const { id } = req.params;
      const article = await articleService.update(body, { id, userId });
      return res.status(200).send({
        status: 200,
        message: 'article updated successfully',
        article: article[1]
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
   * @method deleteArticle
   * @param {object} req
   * @param {object} res
   * @returns {object} deleted article
   */
  static async deleteArticle(req, res) {
    try {
      const { userId } = req;
      const { id } = req.params;

      articleService.delete({ id, userId });

      return res.status(200).send({
        status: 200,
        message: 'article deleted successfully'
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
