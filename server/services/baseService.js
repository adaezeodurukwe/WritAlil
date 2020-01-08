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
   * @method findAll
   * @param {array} includeArray models to include
   * @param {number} limit result limit
   * @param {number} offset skip over
   * @param {object} whereObject
   * @returns {object} found object
   */
  async findAll(includeArray, limit, offset, whereObject) {
    return this.model.findAll({
      where: whereObject,
      offset,
      limit,
      include: includeArray
    });
  }

  /**
   * @description finds or creates an entry
   * @param {object} whereObject
   * @param {obgect} defaultsObject needed tor a create case
   * @returns {array} containing entry and boolean that indicates if a new entry was created
   */
  async findOrCreate(whereObject, defaultsObject) {
    return this.model.findOrCreate({
      where: whereObject,
      defaults: defaultsObject
    });
  }

  /**
   * @method update
   * @param {*} updateObject
   * @param {*} whereObject
   * @returns {object} updated row
   */
  async update(updateObject, whereObject) {
    const updated = await this.model.update(updateObject, { returning: true, where: whereObject });
    return updated;
  }

  /**
   * @method delete
   * @param {object} whereObject
   * @returns {null} null
   */
  async delete(whereObject) {
    await this.model.destroy({ where: whereObject });
  }
}
