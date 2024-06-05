import { Octokit } from 'octokit';
import config from '../config/index.js';

const githubService = {};

const octokit = new Octokit({ auth: config.OCTOKIT_TOKEN });

/**
 * Creates a new issue in the specified GitHub repository.
 *
 * @param {object} data - Data for creating the issue.
 * @returns {Promise<object>} A promise that resolves with the created issue object.
 */
const createIssue = async (data) => {
  return octokit.request(`POST /repos/${config.GITHUB_OWNER}/${config.GITHUB_REPO}/issues`, data);
};

githubService.createIssue = createIssue;

export default githubService;
