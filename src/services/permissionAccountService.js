import permissionAccount from '../models/permissionAccount.js';

const permissionAccountService = {};

/**
 * Creates a new permission account.
 *
 * @param {object} data - The data for the permission account to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created permission.
 */
const create = async (data) => {
  const newPermissionAccount = await permissionAccount.create(data);
  return newPermissionAccount.get({ plain: true });
};

/**
 * Finds and counts all account permissions based on provided filters.
 *
 * @param {object} filters - Filters for querying account permissions.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of permissions.
 */
const findAndCountAll = async (filters) => {
  const where = {};

  if (filters.accountId) {
    where.accountId = filters.accountId;
  }
  if (filters.staffId) {
    where.staffId = filters.staffId;
  }

  return permissionAccount.findAndCountAll({
    where,
    raw: true,
  });
};

/**
 * Deletes an account permission by its ID.
 *
 * @param {string} id - The ID of the account permission to delete.
 * @param {string} staffId - The ID of the staff member.
 * @returns {Promise<void>} A promise that resolves when the account permission is deleted.
 */
const deleteByIdAndStaffId = async (id, staffId) => {
  await permissionAccount.destroy({ where: { id, staffId } });
};

permissionAccountService.create = create;
permissionAccountService.findAndCountAll = findAndCountAll;
permissionAccountService.deleteByIdAndStaffId = deleteByIdAndStaffId;

export default permissionAccountService;
