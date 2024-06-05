import staffTypes from '../constants/staffTypes.js';

const permissionHelper = {};

/**
 * Checks if the user is an account owner.
 *
 * @param {object} user - The user object.
 * @param {string} accountId - The ID of the account.
 * @returns {boolean} Returns true if the user is an account owner, otherwise false.
 */
const _isAccountOwnerUser = (user, accountId) => {
  return user.type === staffTypes.ACCOUNT_OWNER && user.accountId === accountId;
};

/**
 * Determines if the user has permission to read the account.
 *
 * @param {object} user - The user object.
 * @param {string} accountId - The ID of the account.
 * @returns {boolean} Returns true if the user can read the account, otherwise false.
 */
const canReadAccount = (user, accountId) => {
  return _isAccountOwnerUser(user, accountId);
};

/**
 * Determines if the user has permission to administer the account.
 *
 * @param {object} user - The user object.
 * @param {string} accountId - The ID of the account to check.
 * @returns {boolean} Returns true if the user can administer the account, otherwise false.
 */
const canAdminAccount = (user, accountId) => {
  return _isAccountOwnerUser(user, accountId);
};

permissionHelper.canReadAccount = canReadAccount;
permissionHelper.canAdminAccount = canAdminAccount;

export default permissionHelper;
