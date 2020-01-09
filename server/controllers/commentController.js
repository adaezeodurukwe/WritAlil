import models from '../database/models';
import { commentService } from '../services/commentService';

const { User } = models;

/**
 * @class CommentController
 */
export default class CommentController {
  /**
   * @method createComment
   * @param {object} req
   * @param {object} res
   * @returns {object} created comment
   */
  static async createComment(req, res) {
    try {
      const { userId, body, params } = req;
      const { articleId } = params;
      body.userId = userId;
      body.articleId = articleId;
      const comment = await commentService.create(body);

      return res.status(201).send({
        status: 201,
        message: 'comment created successfully',
        comment
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
   * @method getAllArticleComments
   * @param {object} req
   * @param {object} res
   * @returns {object} comments
   */
  static async getAllArticleComments(req, res) {
    try {
      const { page, limit } = req.query;
      let additionalData = {};
      const include = [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'userName']
        }
      ];
      let comments;

      if (!(page && limit)) {
        comments = await commentService.findAll(include);
      } else {
        const offset = limit * (page - 1);
        comments = await commentService.findAll(include, limit, offset);
        additionalData = { page, limit };
      }

      return res.status(200).send({
        status: 200,
        message: 'article comments',
        comments,
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
   * @method updateComment
   * @param {object} req
   * @param {object} res
   * @returns {object} updated comment
   */
  static async updateComment(req, res) {
    try {
      const { userId, body, params } = req;
      const { id } = params;
      const comment = await commentService.update(body, { id, userId });

      return res.status(200).send({
        status: 200,
        message: 'comment updated successfully',
        comment: comment[1]
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
   * @method deleteComment
   * @param {object} req
   * @param {object} res
   * @returns {object} delete success
   */
  static async deleteComment(req, res) {
    try {
      const { userId, params } = req;
      const { id } = params;

      commentService.delete({ id, userId });

      return res.status(200).send({
        status: 200,
        message: 'comment deleted successfully'
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
