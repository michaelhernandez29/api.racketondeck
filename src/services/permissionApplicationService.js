import permissionApplication from '../models/permissionApplication.js';

const permissionApplicationService = {};

/**
 * Creates a new permission application.
 *
 * @param {object} data - The data for the permission application to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created permission.
 */
const create = async (data) => {
  const newPermissionApplication = await permissionApplication.create(data);
  return newPermissionApplication.get({ plain: true });
};

/**
 * Finds and counts all application permissions based on provided filters.
 *
 * @param {object} filters - Filters for querying application permissions.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of permissions.
 */
const findAndCountAll = async (filters) => {
  const where = {};

  if (filters.applicationId) {
    where.applicationId = filters.applicationId;
  }
  if (filters.staffId) {
    where.staffId = filters.staffId;
  }

  return permissionApplication.findAndCountAll({
    where,
    raw: true,
  });
};

permissionApplicationService.create = create;
permissionApplicationService.findAndCountAll = findAndCountAll;

export default permissionApplicationService;
