import { StatusCodes } from 'http-status-codes';
import _ from 'lodash-es';
import cryptoHelper from '../helpers/cryptoHelper.js';
import errorMessages from '../constants/errorMessages.js';

/**
 * Middleware function to handle authorization.
 *
 * This function checks for the presence and validity of the Authorization header in the request.
 * If the header is missing, malformed, or if the token is invalid, it throws an error with a 401 Unauthorized status.
 * If the token is valid, it attaches the decoded payload to the request object.
 *
 * @param {object} req - The request object.
 * @throws {Error} Throws an error if the authorization header is missing or invalid.
 * @returns {Promise<boolean>} Returns true if the token is valid and the payload is attached to the request object.
 */
export default async (req) => {
  const authorization = req.headers.authorization ?? null;
  const authType = authorization ? authorization.split(' ')[0] : undefined;
  const authValue = authorization ? authorization.split(' ')[1] : undefined;

  const error = new Error(errorMessages.AUTHORIZATION_NOT_PRESENT);
  error.statusCode = StatusCodes.UNAUTHORIZED;

  if (_.isNil(authType) ?? _.isNil(authValue)) {
    throw error;
  }

  const payload = await cryptoHelper.verify(authValue);
  if (!payload) {
    throw error;
  }

  req._user = payload;
  return true;
};
