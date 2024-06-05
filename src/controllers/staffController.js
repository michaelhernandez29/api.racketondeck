import errorMessages from '../constants/errorMessages.js';
import permissionHelper from '../helpers/permissionHelper.js';
import responseHelper from '../helpers/responseHelper.js';
import staffService from '../services/staffService.js';

/**
 * Handler for GET /accounts/{accountId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findById = async (req, res) => {
  const { accountId, userId } = req.params;
  const requestUser = req._user;

  if (!permissionHelper.canReadAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const staff = await staffService.findById(userId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  responseHelper.ok(res, staff);
};

/**
 * Handler for GET /accounts/{accountId}/staff
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findAndCountAll = async (req, res) => {
  const { accountId } = req.params;
  const filters = req.query;
  const requestUser = req._user;

  if (!permissionHelper.canReadAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const response = await staffService.findAndCountAll({ accountId, ...filters });
  responseHelper.ok(res, response.rows, response.count);
};

/**
 * Handler for DELETE /accounts/{accountId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteById = async (req, res) => {
  const { accountId, userId } = req.params;
  const requestUser = req._user;

  if (!permissionHelper.canAdminAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const staff = await staffService.findById(userId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  await staffService.deleteById(userId);
  responseHelper.ok(res);
};
