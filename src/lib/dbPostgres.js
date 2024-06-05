import { Sequelize } from 'sequelize';
import config from '../config/index.js';

const dbPostgres = new Sequelize(config.POSTGRES_NAME, config.POSTGRES_USERNAME, config.POSTGRES_PASSWORD, {
  dialect: 'postgres',
  host: config.POSTGRES_HOST,
});

export default dbPostgres;
