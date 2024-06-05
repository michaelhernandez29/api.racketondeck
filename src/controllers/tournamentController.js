import applicationService from '../services/applicationService.js';
import errorMessages from '../constants/errorMessages.js';
import responseHelper from '../helpers/responseHelper.js';
import tournamentService from '../services/tournamentService.js';

/**
 * Handler for POST /tournaments
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const create = async (req, res) => {
  const { applicationId } = req.params;
  const payload = req.body;

  const application = await applicationService.findById(applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  const response = await tournamentService.create({ applicationId, ...payload });
  responseHelper.created(res, response);
};

/**
 * Handler for GET /tournaments
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findAndCountAll = async (req, res) => {
  const { applicationId } = req.params;
  const filters = req.query;

  const application = await applicationService.findById(applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  const response = await tournamentService.findAndCountAll({ applicationId, ...filters });
  responseHelper.ok(res, response.rows, response.count);
};

/**
 * Handler for GET /tournaments/{id}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findById = async (req, res) => {
  const { tournamentId } = req.params;

  const tournament = await tournamentService.findById(tournamentId);
  if (!tournament) {
    responseHelper.notFound(res, errorMessages.TOURNAMENT_NOT_FOUND);
    return;
  }

  responseHelper.ok(res, tournament);
};

/**
 * Handler for PUT /tournaments/{id}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const updateById = async (req, res) => {
  const { tournamentId } = req.params;
  const payload = req.body;

  const tournament = await tournamentService.findById(tournamentId);
  if (!tournament) {
    responseHelper.notFound(res, errorMessages.TOURNAMENT_NOT_FOUND);
    return;
  }

  const response = await tournamentService.updateById(tournamentId, payload);
  responseHelper.ok(res, response);
};

/**
 * Handler for DELETE /tournaments/{id}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteById = async (req, res) => {
  const { tournamentId } = req.params;

  const tournament = await tournamentService.findById(tournamentId);
  if (!tournament) {
    responseHelper.notFound(res, errorMessages.TOURNAMENT_NOT_FOUND);
    return;
  }

  await tournamentService.deleteById(tournamentId);
  responseHelper.ok(res);
};
