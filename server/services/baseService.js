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
   * @param {array} includeArray
   * @returns {object} found object
   */
  async find(whereObject, includeArray) {
    const found = this.model.findOne({
      where: whereObject,
      include: includeArray
    });
    return found;
  }

  /**
   * @method update
   * @param {*} updateObject
   * @param {*} whereObject
   * @returns {object} updated row
   */
  async updateRecord(updateObject, whereObject) {
    const updated = await this.model.update(updateObject, { returning: true, where: whereObject });
    return updated;
  }
}
