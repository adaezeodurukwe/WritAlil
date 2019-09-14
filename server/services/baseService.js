/**
 * @class BaseService
 */
export default class BaseService {
  /**
   * @method constructor
   * @param {object} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @method create
   * @description
   * @param {object} dataObject
   * @returns {object} created object
   */
  async create(dataObject) {
    const result = this.model.create(dataObject);
    return result;
  }

  /**
   * @method find
   * @param {object} whereObject
   * @returns {object} found object
   */
  async find(whereObject) {
    const found = this.model.findOne({ where: whereObject });
    return found;
  }
}
