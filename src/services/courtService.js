import { Op } from 'sequelize';
import court from '../models/court.js';

const courtService = {};

/**
 * Creates a new court.
 *
 * @param {object} data - The data for the court to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created court.
 */
const create = async (data) => {
  const response = await court.create(data);
  return response.get({ plain: true });
};

/**
 * Finds and counts all courts based on provided filters.
 *
 * @param {object} filters - Filters for querying courts.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of courts and
 * the paginated list of courts.
 */
const findAndCountAll = async (filters) => {
  const { applicationId, page, limit, find, order } = filters;
  let orderClause = [['name', 'ASC']];
  const offset = page * limit;
  const where = {};

  if (applicationId) {
    where.applicationId = applicationId;
  }

  if (find) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }, { description: { [Op.iLike]: `%${find}%` } }];
  }

  if (order === 'z-a') {
    orderClause = [['name', 'DESC']];
  }

  return court.findAndCountAll({
    where,
    order: orderClause,
    offset,
    limit,
    raw: true,
  });
};

/**
 * Finds a court by its ID.
 *
 * @param {string} id - The ID of the court to find.
 * @returns {Promise<object|null>} A Promise resolving to the found court object or null if not found.
 */
const findById = async (id) => {
  return court.findOne({ where: { id }, raw: true });
};

/**
 * Updates a court by its ID and returns the updated court.
 *
 * @param {string} id - The ID of the court to update.
 * @param {object} data - The data to update the court with.
 * @returns {Promise<object|null>} A promise that resolves to the updated court object or null if not found.
 */
const updateById = async (id, data) => {
  const response = await court.update(data, { where: { id }, returning: true });
  return response[1][0].get({ plain: true });
};

/**
 * Deletes a court by its ID.
 *
 * @param {string} id - The ID of the court to delete.
 * @returns {Promise<void>} A promise that resolves when the court is deleted.
 */
const deleteById = async (id) => {
  await court.destroy({ where: { id } });
};

courtService.create = create;
courtService.findAndCountAll = findAndCountAll;
courtService.findById = findById;
courtService.updateById = updateById;
courtService.deleteById = deleteById;

export default courtService;
