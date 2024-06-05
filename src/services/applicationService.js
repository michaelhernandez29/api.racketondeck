import { Op } from 'sequelize';
import application from '../models/application.js';

const applicationService = {};

/**
 * Creates a new application.
 *
 * @param {object} data - The data for the application to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created application.
 */
const create = async (data) => {
  const newApplication = await application.create(data);
  return newApplication.get({ plain: true });
};

/**
 * Finds and counts all applications based on provided filters.
 *
 * @param {object} filters - Filters for querying applications.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of applications and
 * the paginated list of applications.
 */
const findAndCountAll = async (filters) => {
  const { accountId, page, limit, find, order } = filters;
  let orderClause = [['name', 'ASC']];
  const offset = page * limit;
  const where = {};

  if (accountId) {
    where.accountId = accountId;
  }

  if (find) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }, { description: { [Op.iLike]: `%${find}%` } }];
  }

  if (order === 'z-a') {
    orderClause = [['name', 'DESC']];
  }

  return application.findAndCountAll({
    where,
    order: orderClause,
    offset,
    limit,
    raw: true,
  });
};

/**
 * Finds an application by its ID and associated account ID.
 *
 * @param {string} accountId - The ID of the account associated with the application.
 * @param {string} applicationId - The ID of the application to find.
 * @returns {Promise<object|null>} A Promise resolving to the found application object or null if not found.
 */
const findById = async (accountId, applicationId) => {
  return application.findOne({ where: { id: applicationId, accountId }, raw: true });
};

/**
 * Updates an application by its ID and returns the updated application.
 *
 * @param {string} id - The ID of the application to update.
 * @param {object} data - The data to update the application with.
 * @returns {Promise<object|null>} A promise that resolves to the updated application object or null if not found.
 */
const updateById = async (id, data) => {
  const response = await application.update(data, { where: { id }, returning: true });
  return response[1][0].get({ plain: true });
};

/**
 * Deletes an application by its ID.
 *
 * @param {string} id - The ID of the application to delete.
 * @returns {Promise<void>} A promise that resolves when the application is deleted.
 */
const deleteById = async (id) => {
  await application.destroy({ where: { id } });
};

applicationService.create = create;
applicationService.findAndCountAll = findAndCountAll;
applicationService.findById = findById;
applicationService.updateById = updateById;
applicationService.deleteById = deleteById;

export default applicationService;
