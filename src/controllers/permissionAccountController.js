import _ from 'lodash-es';
import errorMessages from '../constants/errorMessages.js';
import permissionAccountService from '../services/permissionAccountService.js';
import permissionHelper from '../helpers/permissionHelper.js';
import responseHelper from '../helpers/responseHelper.js';
import staffService from '../services/staffService.js';

/**
 * Handler for POST /permissions/accounts/{accountId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const create = async (req, res) => {
  const { accountId, staffId } = req.params;
  const requestUser = req._user;
  const payload = req.body;

  if (!permissionHelper.canAdminAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const staff = await staffService.findById(staffId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  const staffPermissions = await permissionAccountService.findAndCountAll({ accountId, staffId });
  if (_.some(staffPermissions.rows, { permission: payload.permission })) {
    responseHelper.conflict(res, errorMessages.PERMISSION_ACCOUNT_ALREADY_EXISTS);
    return;
  }

  const response = await permissionAccountService.create({ accountId, staffId, permission: payload.permission });
  responseHelper.created(res, response);
};

/**
 * Handler for GET /permissions/accounts/{accountId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findByStaffId = async (req, res) => {
  const { accountId, staffId } = req.params;
  const requestUser = req._user;

  if (!permissionHelper.canAdminAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const staff = await staffService.findById(staffId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  const response = await permissionAccountService.findAndCountAll({ accountId, staffId });
  responseHelper.ok(res, response.rows, response.count);
};

/**
 * Handler for DELETE /permissions/accounts/{accountId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteByStaffId = async (req, res) => {
  const { accountId, staffId, permissionId } = req.params;
  const requestUser = req._user;

  if (!permissionHelper.canAdminAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const staff = await staffService.findById(staffId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  await permissionAccountService.deleteByIdAndStaffId(permissionId, staffId);
  responseHelper.ok(res);
};
