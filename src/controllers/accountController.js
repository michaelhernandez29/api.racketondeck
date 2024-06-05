import accountService from '../services/accountService.js';
import cryptoHelper from '../helpers/cryptoHelper.js';
import errorMessages from '../constants/errorMessages.js';
import permissionHelper from '../helpers/permissionHelper.js';
import responseHelper from '../helpers/responseHelper.js';
import staffService from '../services/staffService.js';
import staffTypes from '../constants/staffTypes.js';
import validator from 'validator';

/**
 * Handler for POST /accounts
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const create = async (req, res) => {
  const payload = req.body;

  if (!validator.isEmail(payload.email)) {
    responseHelper.badRequest(res, errorMessages.EMAIL_FORMAT_NOT_VALID);
    return;
  }

  const staff = await staffService.findByEmail(payload.email);
  if (staff) {
    responseHelper.conflict(res, errorMessages.EMAIL_ALREADY_EXISTS);
    return;
  }

  payload.password = await cryptoHelper.hash(payload.password);
  payload.type = staffTypes.ACCOUNT_OWNER;

  const response = await accountService.createWithAssociatedOwner(payload);
  responseHelper.created(res, response);
};

/**
 * Handler for GET /accounts/{accountId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findById = async (req, res) => {
  const { accountId } = req.params;
  const requestUser = req._user;

  if (!permissionHelper.canReadAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const account = await accountService.findById(accountId);
  if (!account) {
    responseHelper.notFound(res, errorMessages.ACCOUNT_NOT_FOUND);
    return;
  }

  responseHelper.ok(res, account);
};

/**
 * Handler for DELETE /accounts/{accountId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteById = async (req, res) => {
  const { accountId } = req.params;
  const requestUser = req._user;

  if (!permissionHelper.canAdminAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const account = await accountService.findById(accountId);
  if (!account) {
    responseHelper.notFound(res, errorMessages.ACCOUNT_NOT_FOUND);
    return;
  }

  await accountService.deleteById(accountId);
  responseHelper.ok(res);
};
