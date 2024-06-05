import githubService from '../services/githubService.js';
import logger from '../helpers/logger.js';
import responseHelper from '../helpers/responseHelper.js';

/**
 * Handler for POST /feedback/issues
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const createIssue = async (req, res) => {
  const payload = req.body;

  try {
    const response = await githubService.createIssue(payload);
    logger.info({ message: `[feedbackController.createBug] Created a new github issue`, response: response.data });
    responseHelper.created(res);
  } catch (error) {
    logger.error({
      message: `[feedbackController.createBug] Unexpected error when creating a new github issue`,
      error: error.message,
    });
  }
};
