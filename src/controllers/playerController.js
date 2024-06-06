import _ from 'lodash-es';
import errorMessages from '../constants/errorMessages.js';
import permissionHelper from '../helpers/permissionHelper.js';
import playerService from '../services/playerService.js';
import responseHelper from '../helpers/responseHelper.js';
import validator from 'validator';

/**
 * Handler for POST /accounts/{accountId}/players
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

  const player = await playerService.findByEmail(payload.email);
  if (player) {
    responseHelper.conflict(res, errorMessages.EMAIL_ALREADY_EXISTS);
    return;
  }

  let response = await playerService.create({ accountId, ...payload });
  response = _.omit(response, 'password');
  responseHelper.created(res, response);
};

/**
 * Handler for GET /accounts/{accountId}/players
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

  const response = await playerService.findAndCountAll({ accountId, ...filters });
  responseHelper.ok(res, response.rows, response.count);
};
