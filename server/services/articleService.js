import models from '../database/models';
import BaseService from './baseService';

const { Article } = models;

/**
 * @class ArticleService
 */
export default class ArticleService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Article);
  }
}

export const articleService = new ArticleService();
