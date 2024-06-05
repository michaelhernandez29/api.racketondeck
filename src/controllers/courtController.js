//import applicationService from '../services/applicationService.js';
import courtService from '../services/courtService.js';
import errorMessages from '../constants/errorMessages.js';
import responseHelper from '../helpers/responseHelper.js';

/**
 * Handler for POST /courts
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const create = async (req, res) => {
  const { applicationId } = req.params;
  const payload = req.body;

  // TODO: when implement user permissions, pass accountId to findById
  // const application = await applicationService.findById(applicationId);
  // if (!application) {
  //   responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
  //   return;
  // }

  const response = await courtService.create({ applicationId, ...payload });
  responseHelper.created(res, response);
};

/**
 * Handler for GET /courts
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findAndCountAll = async (req, res) => {
  const { applicationId } = req.params;
  const filters = req.query;

  // TODO: when implement user permissions, pass accountId to findById
  // const application = await applicationService.findById(applicationId);
  // if (!application) {
  //   responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
  //   return;
  // }

  const response = await courtService.findAndCountAll({ applicationId, ...filters });
  responseHelper.ok(res, response.rows, response.count);
};

/**
 * Handler for GET /courts/{id}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findById = async (req, res) => {
  const { courtId } = req.params;

  // TODO: when implement user permissions, pass accountId to findById
  // const application = await applicationService.findById(applicationId);
  // if (!application) {
  //   responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
  //   return;
  // }

  const court = await courtService.findById(courtId);
  if (!court) {
    responseHelper.notFound(res, errorMessages.COURT_NOT_FOUND);
    return;
  }

  responseHelper.ok(res, court);
};

/**
 * Handler for PUT /courts/{id}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const updateById = async (req, res) => {
  const { courtId } = req.params;
  const payload = req.body;

  // TODO: when implement user permissions, pass accountId to findById
  // const application = await applicationService.findById(applicationId);
  // if (!application) {
  //   responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
  //   return;
  // }

  const court = await courtService.findById(courtId);
  if (!court) {
    responseHelper.notFound(res, errorMessages.COURT_NOT_FOUND);
    return;
  }

  const response = await courtService.updateById(courtId, payload);
  responseHelper.ok(res, response);
};

/**
 * Handler for DELETE /courts/{id}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteById = async (req, res) => {
  const { courtId } = req.params;

  // TODO: when implement user permissions, pass accountId to findById
  // const application = await applicationService.findById(applicationId);
  // if (!application) {
  //   responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
  //   return;
  // }

  const court = await courtService.findById(courtId);
  if (!court) {
    responseHelper.notFound(res, errorMessages.COURT_NOT_FOUND);
    return;
  }

  await courtService.deleteById(courtId);
  responseHelper.ok(res);
};
