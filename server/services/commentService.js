import models from '../database/models';
import BaseService from './baseService';

const { Comment } = models;

/**
 * @class CommentService
 */
export default class CommentService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Comment);
  }
}

export const commentService = new CommentService();
