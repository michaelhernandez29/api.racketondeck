import { Op } from 'sequelize';
import tournament from '../models/tournament.js';

const tournamentService = {};

/**
 * Get order filter based on the provided order parameter.
 * @param {string} order - The order parameter.
 * @returns {Array<Array<string>>} The order clause array.
 */
const _getOrderFilter = (order) => {
  let orderClause;

  if (order === 'startDateAsc') {
    orderClause = [['startDate', 'ASC']];
  } else if (order === 'startDateDesc') {
    orderClause = [['startDate', 'DESC']];
  } else if (order === 'endDateAsc') {
    orderClause = [['endDate', 'ASC']];
  } else if (order === 'endDateDesc') {
    orderClause = [['endDate', 'DESC']];
  } else if (order === 'inscriptionFeeAsc') {
    orderClause = [['inscriptionFee', 'ASC']];
  } else if (order === 'inscriptionFeeDesc') {
    orderClause = [['inscriptionFee', 'DESC']];
  } else if (order === 'maxParticipantsAsc') {
    orderClause = [['maxParticipants', 'ASC']];
  } else if (order === 'maxParticipantsDesc') {
    orderClause = [['maxParticipants', 'DESC']];
  } else if (order === 'nameDesc') {
    orderClause = [['name', 'DESC']];
  } else {
    orderClause = [['name', 'ASC']];
  }

  return orderClause;
};

/**
 * Creates a new tournament.
 *
 * @param {object} data - The data for the tournament to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created tournament.
 */
const create = async (data) => {
  const newTournament = await tournament.create(data);
  return newTournament.get({ plain: true });
};

/**
 * Finds and counts all tournaments based on provided filters.
 *
 * @param {object} filters - Filters for querying tournaments.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of tournaments and
 * the paginated list of tournaments.
 */
const findAndCountAll = async (filters) => {
  const { applicationId, page, limit, find, order } = filters;
  const offset = page * limit;
  const where = {};
  const orderClause = _getOrderFilter(order);

  if (applicationId) {
    where.applicationId = applicationId;
  }

  if (find) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }, { description: { [Op.iLike]: `%${find}%` } }];
  }

  return tournament.findAndCountAll({
    where,
    order: orderClause,
    offset,
    limit,
    raw: true,
  });
};

/**
 * Finds a tournament by its ID.
 *
 * @param {string} id - The ID of the tournament to find.
 * @returns {Promise<object|null>} A Promise resolving to the found tournament object or null if not found.
 */
const findById = async (id) => {
  return tournament.findOne({ where: { id }, raw: true });
};

/**
 * Updates a tournament by its ID and returns the updated tournament.
 *
 * @param {string} id - The ID of the tournament to update.
 * @param {object} data - The data to update the tournament with.
 * @returns {Promise<object|null>} A promise that resolves to the updated tournament object or null if not found.
 */
const updateById = async (id, data) => {
  const response = await tournament.update(data, { where: { id }, returning: true });
  return response[1][0].get({ plain: true });
};

/**
 * Deletes a tournament by its ID.
 *
 * @param {string} id - The ID of the tournament to delete.
 * @returns {Promise<void>} A promise that resolves when the tournament is deleted.
 */
const deleteById = async (id) => {
  await tournament.destroy({ where: { id } });
};
tournamentService.create = create;
tournamentService.findAndCountAll = findAndCountAll;
tournamentService.findById = findById;
tournamentService.updateById = updateById;
tournamentService.deleteById = deleteById;

export default tournamentService;
