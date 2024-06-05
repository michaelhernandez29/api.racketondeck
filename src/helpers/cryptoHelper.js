import bcrypt from 'bcrypt';
import config from '../config/index.js';
import jwt from 'jsonwebtoken';

const cryptoHelper = {};
const privateKey = config.CRYPTO_PRIVATE_KEY;
const expiresIn = config.CRYPTO_EXPIRES_IN;

/**
 * Hashes the given text using bcrypt.
 *
 * @param {string} text - The text to be hashed.
 * @returns {Promise<string>} A Promise resolving to the hashed text.
 */
const hash = async (text) => {
  return bcrypt.hash(text, Number.parseInt(config.CRYPTO_SALT_OR_ROUNDS, 10));
};

/**
 * Compares a plain text with a hashed text to see if they match.
 *
 * @param {string} plainText - The plain text to compare.
 * @param {string} hash - The hashed text to compare against.
 * @returns {Promise<boolean>} A Promise resolving to a boolean indicating whether the texts match.
 */
const compare = async (plainText, hash) => {
  return bcrypt.compare(plainText, hash);
};

/**
 * Signs the given data into a JWT.
 *
 * @param {object} data - The data to be included in the JWT payload.
 * @returns {Promise<string>} A Promise resolving to the signed JWT.
 */
const sign = async (data) => {
  return jwt.sign(data, privateKey, { expiresIn });
};

/**
 * Verifies the given JWT.
 *
 * @param {string} token - The JWT to verify.
 * @returns {Promise<object>} A Promise resolving to the decoded token if verification is successful.
 * @throws {Error} If the token is invalid or verification fails.
 */
const verify = async (token) => {
  return jwt.verify(token, privateKey);
};

cryptoHelper.hash = hash;
cryptoHelper.compare = compare;
cryptoHelper.sign = sign;
cryptoHelper.verify = verify;

export default cryptoHelper;
