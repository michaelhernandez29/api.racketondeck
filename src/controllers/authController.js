import _ from 'lodash-es';
import cryptoHelper from '../helpers/cryptoHelper.js';
import errorMessages from '../constants/errorMessages.js';
import responseHelper from '../helpers/responseHelper.js';
import staffService from '../services/staffService.js';
import validator from 'validator';

/**
 * Handler for POST /user/login
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const login = async (req, res) => {
  const payload = req.body;

  if (!validator.isEmail(payload.email)) {
    responseHelper.badRequest(res, errorMessages.EMAIL_FORMAT_NOT_VALID);
    return;
  }

  let user = await staffService.findByEmail(payload.email);
  if (!user) {
    responseHelper.notFound(res, errorMessages.EMAIL_NOT_EXISTS);
    return;
  }

  const isPasswordCorrect = await cryptoHelper.compare(payload.password, user.password);
  if (!isPasswordCorrect) {
    responseHelper.badRequest(res, errorMessages.PASSWORD_NOT_CORRECT);
    return;
  }

  user = _.omit(user, 'password');
  const response = await cryptoHelper.sign(user);
  responseHelper.ok(res, response);
};
