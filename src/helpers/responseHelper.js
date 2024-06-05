import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import errorCodes from '../constants/errorCodes.js';

const responseHelper = {};

/**
 * Sends a successful response (HTTP status code 200 - OK).
 *
 * @param {object} res - The response object.
 * @param {object} [data=null] - Data to be sent in the response.
 * @param {number?} [count=null] - Count of the data.
 */
const ok = (res, data = null, count = null) => {
  const response = {
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK,
  };

  if (count) {
    response.count = count;
  }

  if (data) {
    response.data = data;
  }

  res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating resource creation (HTTP status code 201 - Created).
 *
 * @param {object} res - The response object.
 * @param {object} [data=null] - Data representing the created resource.
 */
const created = (res, data = null) => {
  const response = {
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
  };

  if (data) {
    response.data = data;
  }

  res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating a bad request (HTTP status code 400 - Bad Request).
 *
 * @param {object} res - The response object.
 * @param {string?} [message='Bad Request'] - Error message.
 */
const badRequest = (res, message = ReasonPhrases.BAD_REQUEST) => {
  const response = {
    statusCode: StatusCodes.BAD_REQUEST,
    message: message,
    errorCode: errorCodes.BAD_REQUEST,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating unauthorized access (HTTP status code 401 - Unauthorized).
 *
 * @param {object} res - The response object.
 * @param {string?} [message='Unauthorized'] - Error message.
 */
const unAuthorized = (res, message = ReasonPhrases.UNAUTHORIZED) => {
  const response = {
    statusCode: StatusCodes.UNAUTHORIZED,
    message: message,
    errorCode: errorCodes.UNAUTHORIZED,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating forbidden access (HTTP status code 403 - Forbidden).
 *
 * @param {object} res - The response object.
 * @param {string?} [message='Forbidden'] - Error message.
 */
const forbidden = (res, message = ReasonPhrases.FORBIDDEN) => {
  const response = {
    statusCode: StatusCodes.FORBIDDEN,
    message,
    errorCode: errorCodes.FORBIDDEN,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating resource not found (HTTP status code 404 - Not Found).
 *
 * @param {object} res - The response object.
 * @param {string?} [message='Not Found'] - Error message.
 */
const notFound = (res, message = ReasonPhrases.NOT_FOUND) => {
  const response = {
    statusCode: StatusCodes.NOT_FOUND,
    message,
    errorCode: errorCodes.NOT_FOUND,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating a conflict (HTTP status code 409 - Conflict).
 *
 * @param {object} res - The response object.
 * @param {string?} [message='Conflict'] - Error message.
 */
const conflict = (res, message = ReasonPhrases.CONFLICT) => {
  const response = {
    statusCode: StatusCodes.CONFLICT,
    message,
    errorCode: errorCodes.CONFLICT,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating an internal server error (HTTP status code 500 - Internal Server Error).
 *
 * @param {object} res - The response object.
 * @param {string?} [message='Internal Server Error'] - Error message.
 */
const error = (res, message = ReasonPhrases.INTERNAL_SERVER_ERROR) => {
  const response = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message,
    errorCode: errorCodes.INTERNAL_SERVER_ERROR,
  };

  res.status(response.statusCode).json(response);
};

responseHelper.ok = ok;
responseHelper.created = created;
responseHelper.badRequest = badRequest;
responseHelper.unAuthorized = unAuthorized;
responseHelper.forbidden = forbidden;
responseHelper.notFound = notFound;
responseHelper.conflict = conflict;
responseHelper.error = error;

export default responseHelper;
