import { Op } from 'sequelize';
import player from '../models/player.js';

const playerService = {};

/**
 * Creates a player.
 *
 * @param {object} data - The data for the player to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created player.
 */
const create = async (data) => {
  const newPlayer = await player.create(data);
  return newPlayer.get({ plain: true });
};

/**
 * Finds a player by their email address.
 *
 * @param {string} email - The email address of the player to find.
 * @returns {Promise<object|null>} A Promise resolving to the found player object, or null if no player is found.
 */
const findByEmail = async (email) => {
  return player.findOne({ where: { email }, raw: true });
};

/**
 * Finds and counts all users based on provided filters.
 *
 * @param {object} filters - Filters for querying users.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of users and
 * the paginated list of users.
 */
const findAndCountAll = async (filters) => {
  const { accountId, page, limit, find, order } = filters;
  let orderClause = [['name', 'ASC']];
  const offset = page * limit;
  const where = { accountId };

  if (find) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }, { email: { [Op.iLike]: `%${find}%` } }];
  }

  if (order === 'z-a') {
    orderClause = [['name', 'DESC']];
  }

  return player.findAndCountAll({
    where,
    order: orderClause,
    offset,
    limit,
    attributes: { exclude: ['password'] },
    raw: true,
  });
};

playerService.create = create;
playerService.findByEmail = findByEmail;
playerService.findAndCountAll = findAndCountAll;

export default playerService;
