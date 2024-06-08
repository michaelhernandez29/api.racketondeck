import _ from 'lodash-es';
import cryptoHelper from '../helpers/cryptoHelper.js';
import errorMessages from '../constants/errorMessages.js';
import permissionHelper from '../helpers/permissionHelper.js';
import responseHelper from '../helpers/responseHelper.js';
import staffService from '../services/staffService.js';
import validator from 'validator';

/**
 * Handler for POST /accounts/{accountId}/staff
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const create = async (req, res) => {
  const { accountId } = req.params;
  const payload = req.body;
  const requestUser = req._user;

  if (!permissionHelper.canAdminAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

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
  const response = await staffService.create({ accountId, ...payload });
  responseHelper.created(res, response);
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
 * Handler for GET /accounts/{accountId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findById = async (req, res) => {
  const { accountId, staffId } = req.params;
  const requestUser = req._user;

  if (!permissionHelper.canReadAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const staff = await staffService.findById(staffId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  responseHelper.ok(res, staff);
};

/**
 * Handler for PUT /accounts/{accountId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const updateById = async (req, res) => {
  const { accountId, staffId } = req.params;
  const payload = req.body;
  const requestUser = req._user;

  if (!permissionHelper.canReadAccount(requestUser, accountId)) {
    responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
    return;
  }

  const staff = await staffService.findById(staffId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  let response = await staffService.updateById(staffId, payload);
  response = _.omit(response, 'password');
  responseHelper.ok(res, response);
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
