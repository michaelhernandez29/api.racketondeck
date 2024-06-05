import config from './config/index.js';
import logger from './helpers/logger.js';
import server from './server.js';

const { PORT } = config;
server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
