import _ from 'lodash-es';
import account from '../models/account.js';
import dbPostgres from '../lib/dbPostgres.js';
import logger from '../helpers/logger.js';
import permissionAccount from '../models/permissionAccount.js';
import permissions from '../constants/permissions.js';
import staff from '../models/staff.js';

const accountService = {};

/**
 * Creates a new account along with an associated owner.
 *
 * @param {object} data - Data for the owner being created along with the account.
 * @returns {Promise<object>} An object containing the details of the created account and associated owner.
 * @throws {Error} Throws an error if there is an unexpected error during the creation process.
 */
const createWithAssociatedOwner = async (data) => {
  const transaction = await dbPostgres.transaction();

  try {
    const newAccount = await account.create({}, { transaction });
    const newOwner = await staff.create({ accountId: newAccount.id, ...data }, { transaction });
    const bulkData = [
      { staffId: newOwner.id, accountId: newAccount.id, permission: permissions.READ },
      { staffId: newOwner.id, accountId: newAccount.id, permission: permissions.WRITE },
      { staffId: newOwner.id, accountId: newAccount.id, permission: permissions.ADMIN },
    ];
    await permissionAccount.bulkCreate(bulkData, { transaction });

    await transaction.commit();

    const accountData = await newAccount.get({ plain: true });
    let ownerData = await newOwner.get({ plain: true });
    ownerData = _.omit(ownerData, ['password', 'accountId']);

    return { ...accountData, owner: ownerData };
  } catch (error) {
    await transaction.rollback();
    logger.error({
      message: '[accountService.createWithAssociatedOwner] Unexpected error when creating new account and owner',
      error,
    });
    throw error;
  }
};

/**
 * Finds an account by its ID.
 *
 * @param {string} id - The ID of the account to find.
 * @returns {Promise<object|null>} A Promise resolving to the found account object or null if not found.
 */
const findById = (id) => {
  return account.findOne({ where: { id }, raw: true });
};

/**
 * Deletes an account by its ID.
 *
 * @param {string} id - The ID of the account to delete.
 * @returns {Promise<void>} A Promise that resolves when the account is deleted.
 */
const deleteById = async (id) => {
  await account.destroy({ where: { id } });
};

accountService.createWithAssociatedOwner = createWithAssociatedOwner;
accountService.findById = findById;
accountService.deleteById = deleteById;

export default accountService;
