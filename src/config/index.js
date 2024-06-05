import dotenv from 'dotenv';
import logger from '../helpers/logger.js';
import { readFile } from 'fs/promises';

/**
 * Loads environment variables from the .env file using the dotenv module.
 * @async
 * @function loadEnv
 * @returns {Promise<void>} A promise that resolves once the environment variables are loaded.
 */
async function loadEnv() {
  try {
    const envFile = await readFile('.env', 'utf8');
    dotenv.parse(envFile);
  } catch (error) {
    logger.error({ message: 'Error loading .env file', error });
  }
}

await loadEnv();

export default {
  PORT: process.env.PORT ?? 3610,
  POSTGRES_NAME: process.env.POSTGRES_NAME,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  CRYPTO_SALT_OR_ROUNDS: process.env.CRYPTO_SALT_OR_ROUNDS,
  CRYPTO_PRIVATE_KEY: process.env.CRYPTO_PRIVATE_KEY,
  CRYPTO_EXPIRES_IN: process.env.CRYPTO_EXPIRES_IN,
  GITHUB_OWNER: process.env.GITHUB_OWNER,
  GITHUB_REPO: process.env.GITHUB_REPO,
  OCTOKIT_TOKEN: process.env.OCTOKIT_TOKEN,
};
