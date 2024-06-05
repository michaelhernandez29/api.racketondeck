import { Op } from 'sequelize';
import staff from '../models/staff.js';

const staffService = {};

/**
 * Finds a staff by their id.
 *
 * @param {string} id - The id of the staff to find.
 * @returns {Promise<object|null>} A Promise resolving to the found staff object, or null if no staff is found.
 */
const findById = async (id) => {
  return staff.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
    raw: true,
  });
};

/**
 * Finds a staff by their email address.
 *
 * @param {string} email - The email address of the staff to find.
 * @returns {Promise<object|null>} A Promise resolving to the found staff object, or null if no staff is found.
 */
const findByEmail = async (email) => {
  return staff.findOne({ where: { email }, raw: true });
};

/**
 * Finds and counts all users based on provided filters.
 *
 * @param {object} filters - Filters for querying users.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of users and
 * the paginated list of users.
 */
const findAndCountAll = async (filters) => {
  const { accountId, page, limit, find, order } = filters;
  let orderClause = [['name', 'ASC']];
  const offset = page * limit;
  const where = { accountId };

  if (find) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }, { email: { [Op.iLike]: `%${find}%` } }];
  }

  if (order === 'z-a') {
    orderClause = [['name', 'DESC']];
  }

  return staff.findAndCountAll({
    where,
    order: orderClause,
    offset,
    limit,
    attributes: { exclude: ['password'] },
    raw: true,
  });
};

/**
 * Deletes a staff by its ID.
 *
 * @param {string} id - The ID of the staff to delete.
 * @returns {Promise<void>} A promise that resolves when the staff is deleted.
 */
const deleteById = async (id) => {
  await staff.destroy({ where: { id } });
};

staffService.findById = findById;
staffService.findByEmail = findByEmail;
staffService.findAndCountAll = findAndCountAll;
staffService.deleteById = deleteById;

export default staffService;
