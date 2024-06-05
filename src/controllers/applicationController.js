import accountService from '../services/accountService.js';
import applicationService from '../services/applicationService.js';
import errorMessages from '../constants/errorMessages.js';
import responseHelper from '../helpers/responseHelper.js';

/**
 * Handler for POST /accounts/{accountId}/applications
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const create = async (req, res) => {
  const { accountId } = req.params;
  const payload = req.body;

  const account = await accountService.findById(accountId);
  if (!account) {
    responseHelper.notFound(res, errorMessages.ACCOUNT_NOT_FOUND);
    return;
  }

  const response = await applicationService.create({ accountId, ...payload });
  responseHelper.created(res, response);
};

/**
 * Handler for GET /accounts/{accountId}/applications
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findAndCountAll = async (req, res) => {
  const { accountId } = req.params;
  const filters = req.query;

  const account = await accountService.findById(accountId);
  if (!account) {
    responseHelper.notFound(res, errorMessages.ACCOUNT_NOT_FOUND);
    return;
  }

  const response = await applicationService.findAndCountAll({ accountId, ...filters });
  responseHelper.ok(res, response.rows, response.count);
};

/**
 * Handler for GET /accounts/{accountId}/applications/{applicationId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findById = async (req, res) => {
  const { accountId, applicationId } = req.params;

  const application = await applicationService.findById(accountId, applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  responseHelper.ok(res, application);
};

/**
 * Handler for PUT /accounts/{accountId}/applications/{applicationId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const updateById = async (req, res) => {
  const { accountId, applicationId } = req.params;
  const payload = req.body;

  const application = await applicationService.findById(accountId, applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  const response = await applicationService.updateById(applicationId, payload);
  responseHelper.ok(res, response);
};

/**
 * Handler for DELETE /accounts/{accountId}/applications/{applicationId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteById = async (req, res) => {
  const { accountId, applicationId } = req.params;

  const application = await applicationService.findById(accountId, applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  await applicationService.deleteById(applicationId);
  responseHelper.ok(res);
};
