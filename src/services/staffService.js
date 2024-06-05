import { Op } from 'sequelize';
import staff from '../models/staff.js';

const staffService = {};

/**
 * Creates a new application.
 *
 * @param {object} data - The data for the application to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created application.
 */
const create = async (data) => {
  const newStaff = await staff.create(data);
  return newStaff.get({ plain: true });
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
 * Updates a staff member by its ID and returns the updated data.
 *
 * @param {string} id - The ID of the staff member to update.
 * @param {object} data - The data to update the staff member with.
 * @returns {Promise<object|null>} A promise that resolves to the updated staff object or null if not found.
 */
const updateById = async (id, data) => {
  const response = await staff.update(data, { where: { id }, returning: true });
  return response[1][0].get({ plain: true });
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

staffService.create = create;
staffService.findAndCountAll = findAndCountAll;
staffService.findById = findById;
staffService.findByEmail = findByEmail;
staffService.updateById = updateById;
staffService.deleteById = deleteById;

export default staffService;
