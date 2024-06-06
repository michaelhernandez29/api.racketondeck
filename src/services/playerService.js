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

playerService.create = create;
playerService.findByEmail = findByEmail;

export default playerService;
